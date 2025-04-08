import { useState, useEffect, useRef, useCallback } from 'react';
import { toast } from 'sonner';

interface UseAudioRecorderProps {
  onComplete?: (blob: Blob) => void;
  debug?: boolean;
  silenceDetectionEnabled?: boolean;
  silenceThreshold?: number; // 0-100, default 15
  silenceTimeout?: number; // in ms, default 2500
}

export const useAudioRecorder = ({ 
  onComplete, 
  debug = false,
  silenceDetectionEnabled = true,
  silenceThreshold = 15,
  silenceTimeout = 2500
}: UseAudioRecorderProps = {}) => {
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [microphoneAccess, setMicrophoneAccess] = useState<boolean>(false);
  
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const streamRef = useRef<MediaStream | null>(null);
  const timerRef = useRef<number | null>(null);
  const silenceTimerRef = useRef<number | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const dataArrayRef = useRef<Uint8Array | null>(null);
  const silenceStartTimeRef = useRef<number | null>(null);
  const processorRef = useRef<AudioWorkletNode | null>(null);

  const checkMicrophoneStatus = useCallback(async (): Promise<boolean> => {
    try {
      if (debug) console.log('Checking microphone status...');
      
      const stream = await navigator.mediaDevices.getUserMedia({ 
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
        } 
      });
      
      if (debug) {
        const audioTrack = stream.getAudioTracks()[0];
        const settings = audioTrack.getSettings();
        console.log('Microphone settings:', settings);
      }
      
      // Test if we can get any audio data
      let audioDetected = false;
      
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const analyser = audioContext.createAnalyser();
      const microphone = audioContext.createMediaStreamSource(stream);
      microphone.connect(analyser);
      analyser.fftSize = 256;
      const bufferLength = analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);
      
      // Check for audio levels
      let tries = 0;
      const maxTries = 10;
      
      while (tries < maxTries && !audioDetected) {
        analyser.getByteFrequencyData(dataArray);
        const average = dataArray.reduce((sum, value) => sum + value, 0) / bufferLength;
        
        if (average > 5) {
          audioDetected = true;
          if (debug) console.log(`Detected audio! Average level: ${average}`);
          break;
        }
        
        tries++;
        await new Promise(resolve => setTimeout(resolve, 100));
      }
      
      // Clean up
      stream.getTracks().forEach(track => track.stop());
      await audioContext.close();
      
      setMicrophoneAccess(true);
      return true;
    } catch (err) {
      console.error('Error checking microphone:', err);
      setMicrophoneAccess(false);
      setError(err instanceof Error ? err : new Error('Unknown error checking microphone'));
      return false;
    }
  }, [debug]);

  useEffect(() => {
    checkMicrophoneStatus();
    
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
      
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      
      if (silenceTimerRef.current) {
        clearInterval(silenceTimerRef.current);
      }
      
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, [checkMicrophoneStatus]);

  const getSupportedMimeType = (): string => {
    // First check if WebM is supported, which is the most reliable format for Chrome and Whisper
    if (MediaRecorder.isTypeSupported('audio/webm')) {
      if (debug) console.log('Using audio/webm for recording');
      return 'audio/webm';
    }
    
    // Then check WAV which is also well supported by Whisper
    if (MediaRecorder.isTypeSupported('audio/wav')) {
      if (debug) console.log('Using audio/wav for recording');
      return 'audio/wav';
    }
    
    // Check other formats as fallbacks
    const types = [
      'audio/ogg;codecs=opus',  // Common in Firefox
      'audio/mpeg',              // MP3
      'audio/mp4',               // For Apple devices
    ];
    
    for (const type of types) {
      if (MediaRecorder.isTypeSupported(type)) {
        if (debug) console.log('Using fallback MIME type:', type);
        return type;
      }
    }
    
    // If nothing specific is supported, use the browser default
    console.warn('No preferred MIME types supported, using default browser format');
    return '';  // Let the browser decide
  };

  const setupVoiceActivityDetection = (stream: MediaStream) => {
    if (!silenceDetectionEnabled) return;
    
    try {
      const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
      audioContextRef.current = new AudioContext();
      analyserRef.current = audioContextRef.current.createAnalyser();
      
      const source = audioContextRef.current.createMediaStreamSource(stream);
      source.connect(analyserRef.current);
      
      analyserRef.current.fftSize = 256;
      const bufferLength = analyserRef.current.frequencyBinCount;
      dataArrayRef.current = new Uint8Array(bufferLength);
      
      silenceTimerRef.current = window.setInterval(() => {
        if (!isRecording || !analyserRef.current || !dataArrayRef.current) return;
        
        analyserRef.current.getByteFrequencyData(dataArrayRef.current);
        
        const average = dataArrayRef.current.reduce((sum, value) => sum + value, 0) / 
                        dataArrayRef.current.length;
        
        const volumePercent = (average / 255) * 100;
        
        if (debug && recordingTime % 2 === 0) {
          console.log(`Current volume: ${Math.round(volumePercent)}%`);
        }
        
        if (volumePercent < silenceThreshold) {
          if (silenceStartTimeRef.current === null) {
            silenceStartTimeRef.current = Date.now();
            if (debug) console.log('Silence detected, starting silence timer');
          } else {
            const silenceDuration = Date.now() - silenceStartTimeRef.current;
            
            if (silenceDuration >= silenceTimeout && recordingTime > 1) {
              if (debug) console.log(`Silence detected for ${silenceDuration}ms, auto-stopping recording`);
              stopRecording();
            }
          }
        } else {
          if (silenceStartTimeRef.current !== null) {
            if (debug) console.log('Voice activity detected, resetting silence timer');
            silenceStartTimeRef.current = null;
          }
        }
      }, 200);
    } catch (err) {
      console.error('Error setting up voice activity detection:', err);
    }
  };

  const startRecording = useCallback(async () => {
    try {
      audioChunksRef.current = [];
      setAudioBlob(null);
      setError(null);
      silenceStartTimeRef.current = null;
      
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error('Media Devices API not supported in this browser');
      }
      
      // Log supported MIME types
      if (debug) {
        console.log("Supported MIME types for recording:", 
          ["audio/webm", "audio/mp3", "audio/wav", "audio/ogg", "audio/mp4"].filter(type => 
            MediaRecorder.isTypeSupported(type)
          )
        );
      }
      
      // Configure audio with settings optimized for speech recognition
      const stream = await navigator.mediaDevices.getUserMedia({ 
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
          sampleRate: { ideal: 16000 },  // Whisper prefers 16kHz
          channelCount: { ideal: 1 },    // Mono is better for speech recognition
        } 
      });
      
      // Get actual audio track settings
      const audioTrack = stream.getAudioTracks()[0];
      const settings = audioTrack.getSettings();
      if (debug) console.log("Actual microphone settings:", settings);
      
      streamRef.current = stream;
      setMicrophoneAccess(true);
      
      if (silenceDetectionEnabled) {
        setupVoiceActivityDetection(stream);
      }
      
      const mimeType = getSupportedMimeType();
      
      // Create MediaRecorder with appropriate options
      const options: MediaRecorderOptions = {};
      if (mimeType) {
        options.mimeType = mimeType;
      }
      
      const mediaRecorder = new MediaRecorder(stream, options);
      console.log(`Created MediaRecorder with MIME type: ${mediaRecorder.mimeType}`);
      
      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          audioChunksRef.current.push(e.data);
          if (debug) console.log(`Recording chunk received: ${e.data.size} bytes`);
        }
      };
      
      mediaRecorder.onstop = () => {
        if (debug) console.log('Recording stopped, processing audio...');
        const totalChunks = audioChunksRef.current.length;
        
        if (totalChunks === 0) {
          console.error('No audio chunks collected during recording');
          setError(new Error('No audio was captured. Please check your microphone.'));
          toast.error('No audio was captured. Please check your microphone.');
          setIsRecording(false);
          return;
        }
        
        // Create a blob with explicit MIME type from the MediaRecorder
        const audioBlob = new Blob(audioChunksRef.current, { type: mediaRecorder.mimeType });
        
        if (debug) {
          console.log(`Recording complete: ${audioBlob.size} bytes, ${totalChunks} chunks`);
          console.log(`Audio MIME type: ${audioBlob.type}`);
        }
        
        if (audioBlob.size < 100) {
          console.warn('Audio blob is suspiciously small:', audioBlob.size, 'bytes');
          toast.error('Recording produced no usable audio. Please check your microphone and speak louder.');
          setIsRecording(false);
          return;
        }
        
        setAudioBlob(audioBlob);
        setIsRecording(false);
        
        if (silenceTimerRef.current) {
          clearInterval(silenceTimerRef.current);
          silenceTimerRef.current = null;
        }
        
        if (onComplete) {
          onComplete(audioBlob);
        }
      };
      
      mediaRecorder.onerror = (event) => {
        console.error('MediaRecorder error:', event);
        setError(new Error('Recording error occurred'));
      };
      
      mediaRecorderRef.current = mediaRecorder;
      
      // Request smaller chunks more frequently for better voice detection
      mediaRecorder.start(100);
      setIsRecording(true);
      setRecordingTime(0);
      
      timerRef.current = window.setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
      
      if (debug) console.log('Recording started successfully');
      
    } catch (err) {
      console.error('Error starting recording:', err);
      setError(err instanceof Error ? err : new Error('Unknown error starting recording'));
      setMicrophoneAccess(false);
      setIsRecording(false);
      toast.error('Failed to access microphone. Please check your browser permissions.');
    }
  }, [debug, onComplete, silenceDetectionEnabled, setupVoiceActivityDetection]);

  const stopRecording = useCallback(() => {
    if (debug) console.log('Stopping recording...');
    
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    
    if (silenceTimerRef.current) {
      clearInterval(silenceTimerRef.current);
      silenceTimerRef.current = null;
    }
    
    if (mediaRecorderRef.current && isRecording) {
      try {
        mediaRecorderRef.current.stop();
      } catch (err) {
        console.error('Error stopping recording:', err);
        setError(err instanceof Error ? err : new Error('Error stopping recording'));
      }
    } else {
      if (debug) console.log('No active recorder to stop');
    }
    
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    
    if (audioContextRef.current) {
      audioContextRef.current.close();
      audioContextRef.current = null;
      analyserRef.current = null;
      dataArrayRef.current = null;
    }
    
    if (processorRef.current) {
      processorRef.current.disconnect();
      processorRef.current = null;
    }
    
    silenceStartTimeRef.current = null;
  }, [isRecording, debug]);

  return {
    isRecording,
    recordingTime,
    audioBlob,
    error,
    startRecording,
    stopRecording,
    checkMicrophoneStatus,
    microphoneAccess
  };
};

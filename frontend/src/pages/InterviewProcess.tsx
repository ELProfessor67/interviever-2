import React, { useState, useEffect, useRef, useCallback } from "react";
import Header from "@/components/layout/Header";
import { VolumeX, Volume2, X, RefreshCw, Headphones, Mic, MicOff, PhoneOff, MoreVertical } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import Reveal from "@/components/ui-custom/Reveal";
import { audioContext, base64ToArrayBuffer } from '@/lib/utils';
import { AudioStreamer } from '@/services/audioStreamer';
import VolMeterWorket from '@/services/workers/volMeter';
import { VideoSDKNoiseSuppressor } from "@videosdk.live/videosdk-media-processor-web";
import { useStateContext } from '@/contexts/StateContact';
import { NEXT_PUBLIC_MEDIA_SERVER_URL } from "@/constant/URL"

const InterviewProcess = () => {

  const navigate = useNavigate();
  const [isMuted, setIsMuted] = useState(false);
  const mediaRecorderRef = useRef(null);
  const websocketRef = useRef<WebSocket>();
  const streamRef = useRef(null);
  const [volume, setVolume] = useState(0);
  const audioStreamerRef = useRef(null);
  const noiseProcessor = useRef(new VideoSDKNoiseSuppressor());
  const { sections, finalPrompt } = useStateContext();
  const [currectTransciption, setCurrentTranscription] = useState<string | null>(null)


  useEffect(() => {
    if (!audioStreamerRef.current) {
      audioContext({ id: "audio-out", sampleRate: 16000 }).then((audioCtx) => {
        audioStreamerRef.current = new AudioStreamer(audioCtx);
        audioStreamerRef.current
          .addWorklet("vumeter-out", VolMeterWorket, (ev) => {
            setVolume(ev.data.volume);
          })
          .then(() => {
            console.log('successfully initialize');
          });
      });
    }
  }, [audioStreamerRef]);

  const toggleMute = useCallback(() => {
    if (streamRef.current) {
      const audioTrack = streamRef.current.getAudioTracks()[0];
      if (audioTrack) {
        if (isMuted) {
          audioTrack.enabled = true;
          setIsMuted(false);
        } else {
          audioTrack.enabled = false;
          setIsMuted(true);
        }
      }
    }
  }, [isMuted])

  const endCall = useCallback(() => {
    websocketRef.current?.close();
    audioStreamerRef.current.stop();
    streamRef.current.getAudioTracks().forEach((track) => track.stop());
    navigate("/");
  }, []);


  const onConnect = useCallback(() => {
    console.log('connected')
    const data = {
      event: 'start',
      start: {
        user: {
          name: "Manan Rajpout",
        },
        sections: sections,
        system_prompt: finalPrompt
      }
    }
    websocketRef.current.send(JSON.stringify(data));
    setTimeout(() => sendStream(), 4000);
  }, [])



  useEffect(() => {
    if (websocketRef.current) return;
    const ws = new WebSocket(NEXT_PUBLIC_MEDIA_SERVER_URL);
    websocketRef.current = ws;
    ws.onopen = onConnect;
    ws.onmessage = async (event) => {
      const data = JSON.parse(event.data);
      switch (data.event) {
        case 'media':
          const base64Audio = data.media.payload;

          const buffer = base64ToArrayBuffer(base64Audio);
          console.log(buffer.byteLength)
          audioStreamerRef.current?.addPCM16(new Uint8Array(buffer));
          break;
        case 'clear':
          audioStreamerRef.current.stop();
          break;
        case 'transcription':
          console.log("transcriptiondata", data.transcription);
          setCurrentTranscription(data.transcription);
          break;
      }
    };

    ws.onclose = () => {
      console.log('close');
    }
  }, []);








  const sendStream = async () => {
    console.log("start voice called");

    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      alert("Your browser does not support audio recording.");
      return;
    }

    // Get user audio stream
    streamRef.current = await navigator.mediaDevices.getUserMedia({
      audio: {
        sampleRate: 8000
      }
    });

    const processedStream = await noiseProcessor.current.getNoiseSuppressedAudioStream(
      streamRef.current
    );


    mediaRecorderRef.current = new MediaRecorder(processedStream);
    mediaRecorderRef.current.ondataavailable = async (event) => {

      if (websocketRef.current && websocketRef.current.readyState === WebSocket.OPEN) {
        const blob = event.data;
        const reader = new FileReader();
        reader.onload = () => {
          if (reader.readyState == 2) {
            const data = {
              event: 'media',
              media: {
                payload: (reader?.result as string)?.split('base64,')[1]
              }
            }
            websocketRef.current.send(JSON.stringify(data));
          }
        }
        reader.readAsDataURL(blob);
      }
    };

    mediaRecorderRef.current.start(100);
  };



  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow bg-[#1a1a1a] flex flex-col">
        <div className="container max-w-4xl mx-auto px-4 py-12 pt-24 flex-grow flex flex-col items-center justify-center">
          <>
            <div className="flex flex-col items-center max-w-xl w-full mb-12 mt-8">
              <div className="relative mb-10">
                <Avatar className={`w-64 h-64 rounded-full animate-pulse`}>
                  <AvatarImage
                    src="/lovable-uploads/0082cb4d-cc17-46da-8c05-508924cdc668.png"
                    alt="AI Avatar"
                    className="object-cover"
                  />
                  <AvatarFallback className="bg-primary/10 text-primary text-4xl">AI</AvatarFallback>
                </Avatar>

                <div className="absolute bottom-4 right-4 bg-black/60 p-2 rounded-full">
                  <Volume2 className="h-5 w-5 text-white" />
                </div>

              </div>

              <Reveal animation="fade-in-up">
                <div className="bg-black/30 p-6 rounded-xl backdrop-blur-sm border border-white/10 max-w-2xl">
                  <h2 className="text-md text-center text-white font-medium mb-2 max-w-[600px] mx-auto">
                    {
                      currectTransciption &&
                      <>{currectTransciption}</>
                    }
                  </h2>
                </div>
              </Reveal>


            </div>

            <div className="w-full fixed bottom-0 left-0 bg-black/60 backdrop-blur-md p-4 border-t border-white/10">
              <div className="container mx-auto max-w-4xl flex items-center justify-center gap-8">


                <button
                  onClick={toggleMute}
                  className={`p-4 rounded-full ${isMuted ? 'bg-red-500 text-white' : 'bg-gray-200 text-gray-700'
                    } hover:opacity-80 transition-opacity`}
                >
                  {isMuted ? <MicOff size={24} /> : <Mic size={24} />}
                </button>
                <button
                  onClick={endCall}
                  className="p-4 rounded-full bg-red-500 text-white hover:bg-red-600 transition-colors"
                >
                  <PhoneOff size={24} />
                </button>

              </div>
            </div>
          </>
        </div>
      </main>

    </div>
  );
};

export default InterviewProcess;

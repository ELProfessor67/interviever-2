import { useState, useEffect, useCallback } from 'react';
import { useAudioRecorder } from './useAudioRecorder';
import { transcribeAudio, generateResponse } from '../services/ai/openaiService';
import { 
  generateSpeech, 
  playAudioBuffer, 
  stopAnyPlayingAudio 
} from '../services/ai/textToSpeechService';
import { 
  saveTranscript, 
  saveAudio, 
  updateParticipantInterview 
} from '../services/supabase/supabaseService';
import { useToast } from './use-toast';

export enum InterviewState {
  IDLE,
  SPEAKING,
  LISTENING,
  PROCESSING,
  COMPLETE
}

export interface Message {
  id: string;
  role: "user" | "ai";
  content: string;
}

export interface UseInterviewSessionProps {
  participantId?: string;
  initialQuestions: string[];
  onComplete?: (transcript: Message[]) => void;
  useVoice?: boolean;
  silenceDetectionEnabled?: boolean;
  silenceThreshold?: number;
  silenceTimeout?: number;
  recordingDelay?: number; // Added parameter for recording delay
}

export const useInterviewSession = ({
  participantId,
  initialQuestions,
  onComplete,
  useVoice = true,
  silenceDetectionEnabled = true,
  silenceThreshold = 15,
  silenceTimeout = 2500,
  recordingDelay = 800 // Default to 800ms delay
}: UseInterviewSessionProps) => {
  const [interviewState, setInterviewState] = useState<InterviewState>(InterviewState.IDLE);
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [elapsedTime, setElapsedTime] = useState<number>(0);
  const [canSkip, setCanSkip] = useState<boolean>(false);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [audioBuffer, setAudioBuffer] = useState<ArrayBuffer | null>(null);
  const { toast } = useToast();

  const skipQuestion = useCallback(() => {
    if (interviewState !== InterviewState.LISTENING && interviewState !== InterviewState.PROCESSING) {
      console.log(`Cannot skip in current state: ${InterviewState[interviewState]}`);
      return;
    }
    
    console.log('Skipping current question');
    
    if (isRecording) {
      stopRecording();
    }
    
    const skippedMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: "[Question skipped]"
    };
    
    setMessages(prev => [...prev, skippedMessage]);
    
    if (currentQuestion < initialQuestions.length - 1) {
      const nextQuestion = initialQuestions[currentQuestion + 1];
      setCurrentQuestion(currentQuestion + 1);
      
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "ai",
        content: nextQuestion
      };
      
      setMessages(prev => [...prev, aiMessage]);
      setInterviewState(InterviewState.SPEAKING);
      
      if (useVoice) {
        stopAnyPlayingAudio();
        generateSpeech(nextQuestion)
          .then(speechBuffer => {
            if (speechBuffer) {
              setAudioBuffer(speechBuffer);
              return playAudioBuffer(speechBuffer);
            }
            return Promise.resolve();
          })
          .then(() => {
            setTimeout(() => {
              setInterviewState(InterviewState.LISTENING);
              startRecording();
            }, 500);
          })
          .catch(error => {
            console.error('Error playing voice:', error);
            setInterviewState(InterviewState.LISTENING);
            startRecording();
          });
      } else {
        setTimeout(() => {
          setInterviewState(InterviewState.LISTENING);
          startRecording();
        }, 2000);
      }
    } else {
      const finalMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "ai",
        content: "Thank you for participating in this interview. Your responses have been recorded."
      };
      
      setMessages(prev => [...prev, finalMessage]);
      
      if (useVoice) {
        generateSpeech(finalMessage.content)
          .then(speechBuffer => {
            if (speechBuffer) {
              setAudioBuffer(speechBuffer);
              return playAudioBuffer(speechBuffer);
            }
            return Promise.resolve();
          })
          .then(() => {
            completeInterview([...messages, skippedMessage, finalMessage]);
          })
          .catch(error => {
            console.error('Error playing voice:', error);
            completeInterview([...messages, skippedMessage, finalMessage]);
          });
      } else {
        completeInterview([...messages, skippedMessage, finalMessage]);
      }
    }
  }, [interviewState, currentQuestion, initialQuestions, messages, useVoice, recordingDelay]);

  const { 
    isRecording, 
    recordingTime, 
    audioBlob, 
    error: recorderError,
    startRecording, 
    stopRecording,
    microphoneAccess 
  } = useAudioRecorder({
    onComplete: handleRecordingComplete,
    debug: true,
    silenceDetectionEnabled,
    silenceThreshold,
    silenceTimeout
  });

  useEffect(() => {
    const timer = setInterval(() => {
      if (interviewState !== InterviewState.IDLE && interviewState !== InterviewState.COMPLETE) {
        setElapsedTime(prev => prev + 1);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [interviewState]);

  useEffect(() => {
    if (interviewState === InterviewState.SPEAKING) {
      setCanSkip(false);
      
      const skipTimer = setTimeout(() => {
        setCanSkip(true);
      }, 10000);
      
      return () => clearTimeout(skipTimer);
    }
    
    if (interviewState === InterviewState.LISTENING) {
      if (!canSkip) {
        const listeningSkipTimer = setTimeout(() => {
          setCanSkip(true);
        }, 5000);
        
        return () => clearTimeout(listeningSkipTimer);
      }
    }
  }, [interviewState, currentQuestion, canSkip]);

  useEffect(() => {
    console.log(`Interview state changed to: ${InterviewState[interviewState]}`);
    if (interviewState === InterviewState.IDLE) {
      console.log('Interview is idle - waiting to start');
    } else if (interviewState === InterviewState.SPEAKING) {
      console.log(`Speaking question ${currentQuestion + 1} of ${initialQuestions.length}`);
    } else if (interviewState === InterviewState.LISTENING) {
      console.log(`Listening for response to question ${currentQuestion + 1}`);
    } else if (interviewState === InterviewState.PROCESSING) {
      console.log('Processing response...');
    } else if (interviewState === InterviewState.COMPLETE) {
      console.log('Interview completed');
    }
  }, [interviewState, currentQuestion, initialQuestions.length]);

  useEffect(() => {
    if (messages.length > 0) {
      const lastMessage = messages[messages.length - 1];
      console.log(`Message ${messages.length} (${lastMessage.role}): "${lastMessage.content.slice(0, 40)}..."`);
    }
  }, [messages]);

  useEffect(() => {
    if (recorderError) {
      console.error('Recorder error:', recorderError);
      toast({
        title: "Recording Error",
        description: recorderError.message,
        variant: "destructive"
      });
      
      if (interviewState === InterviewState.LISTENING) {
        console.log('Attempting to recover from recording error by skipping');
        skipQuestion();
      }
    }
  }, [recorderError, skipQuestion, interviewState, toast]);

  useEffect(() => {
    console.log(`Silence detection settings: ${silenceDetectionEnabled ? 'enabled' : 'disabled'}, threshold: ${silenceThreshold}%, timeout: ${silenceTimeout}ms`);
  }, [silenceDetectionEnabled, silenceThreshold, silenceTimeout]);

  useEffect(() => {
    if (isRecording && recordingTime > 45) {
      console.log('Recording has exceeded maximum allowed time (45s), auto-stopping');
      stopRecording();
    }
  }, [isRecording, recordingTime, stopRecording]);

  const startInterview = useCallback(async () => {
    if (interviewState === InterviewState.IDLE) {
      console.log('Starting interview with first question:', initialQuestions[0]);
      
      const firstQuestion = initialQuestions[0];
      const newMessage: Message = {
        id: Date.now().toString(),
        role: "ai",
        content: firstQuestion
      };
      
      setMessages([newMessage]);
      setInterviewState(InterviewState.SPEAKING);
      setElapsedTime(0);
      
      if (useVoice) {
        try {
          console.log('Generating speech for first question');
          stopAnyPlayingAudio();
          const speechBuffer = await generateSpeech(firstQuestion);
          if (speechBuffer) {
            setAudioBuffer(speechBuffer);
            console.log('Playing first question audio');
            await playAudioBuffer(speechBuffer);
            console.log('Finished playing first question audio');
          }
        } catch (error) {
          console.error('Error playing voice:', error);
          toast({
            title: "Voice Error",
            description: "Could not play audio. Check your speakers.",
            variant: "destructive"
          });
        }
      }
      
      console.log('Scheduling transition to LISTENING state');
      setTimeout(() => {
        console.log('Transitioning to LISTENING state after first question');
        setInterviewState(InterviewState.LISTENING);
        
        setTimeout(() => {
          console.log('Starting recording for first response');
          startRecording();
        }, recordingDelay);
      }, useVoice ? 2000 : 2000);
    }
  }, [interviewState, initialQuestions, startRecording, useVoice, toast, recordingDelay]);

  async function handleRecordingComplete(recording: Blob) {
    console.log(`Recording completed: ${recording.size} bytes`);
    
    if (!recording || recording.size < 100) {
      console.error('No valid recording blob received', recording);
      toast({
        title: "Recording Error",
        description: "No audio was captured. Please check your microphone.",
        variant: "destructive"
      });
      
      setTimeout(() => {
        console.log('Skipping to next question due to recording error');
        skipQuestion();
      }, 1000);
      return;
    }
    
    setInterviewState(InterviewState.PROCESSING);
    
    try {
      console.log('Transcribing audio...');
      const transcription = await transcribeAudio(recording);
      console.log(`Transcription result: "${transcription.text}"`);
      
      const userMessage: Message = {
        id: Date.now().toString(),
        role: "user",
        content: transcription.text
      };
      
      const updatedMessages = [...messages, userMessage];
      setMessages(updatedMessages);
      
      if (currentQuestion >= initialQuestions.length - 1) {
        console.log('Reached the last question, completing interview');
        const finalMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: "ai",
          content: "Thank you for participating in this interview. Your responses have been recorded."
        };
        
        const finalMessages = [...updatedMessages, finalMessage];
        setMessages(finalMessages);
        
        if (useVoice) {
          try {
            console.log('Generating speech for final message');
            const speechBuffer = await generateSpeech(finalMessage.content);
            if (speechBuffer) {
              setAudioBuffer(speechBuffer);
              await playAudioBuffer(speechBuffer);
            }
          } catch (error) {
            console.error('Error playing voice:', error);
          }
        }
        
        completeInterview(finalMessages, recording);
      } else {
        console.log(`Moving to question ${currentQuestion + 2} of ${initialQuestions.length}`);
        await processNextQuestion(updatedMessages, recording);
      }
    } catch (error) {
      console.error('Error processing recording:', error);
      toast({
        title: "Error",
        description: "Failed to process your response. Skipping to next question.",
        variant: "destructive"
      });
      
      setTimeout(() => {
        console.log('Skipping to next question due to transcription error');
        skipQuestion();
      }, 1000);
    }
  }

  const processNextQuestion = async (currentMessages: Message[], audioRecording: Blob) => {
    try {
      console.log('Processing next question');
      
      if (participantId) {
        await saveAudio(participantId, audioRecording);
      }
      
      let nextQuestion: string;
      
      if (currentQuestion < initialQuestions.length - 1) {
        const nextQuestionIndex = currentQuestion + 1;
        nextQuestion = initialQuestions[nextQuestionIndex];
        console.log(`Using predefined question ${nextQuestionIndex + 1}: "${nextQuestion}"`);
        setCurrentQuestion(nextQuestionIndex);
      } else {
        const messageHistory = currentMessages.map(msg => ({
          role: msg.role,
          content: msg.content
        }));
        
        console.log('Generating follow-up question based on conversation');
        nextQuestion = await generateResponse(messageHistory);
      }
      
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "ai",
        content: nextQuestion
      };
      
      setMessages(prev => [...prev, aiMessage]);
      setInterviewState(InterviewState.SPEAKING);
      
      console.log('Starting speech for next question:', nextQuestion);
      
      if (useVoice) {
        stopAnyPlayingAudio();
        generateSpeech(nextQuestion)
          .then(speechBuffer => {
            if (speechBuffer) {
              setAudioBuffer(speechBuffer);
              return playAudioBuffer(speechBuffer);
            }
            return Promise.resolve();
          })
          .then(() => {
            setTimeout(() => {
              setInterviewState(InterviewState.LISTENING);
              startRecording();
            }, 1500);
          })
          .catch(error => {
            console.error('Error playing voice:', error);
            setInterviewState(InterviewState.LISTENING);
            startRecording();
          });
      } else {
        setTimeout(() => {
          setInterviewState(InterviewState.LISTENING);
          startRecording();
        }, 2000);
      }
    } catch (error) {
      console.error('Error processing next question:', error);
      toast({
        title: "Error",
        description: "Failed to generate the next question. Using a fallback question.",
        variant: "destructive"
      });
      
      const fallbackQuestion = "Could you tell me more about that?";
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "ai",
        content: fallbackQuestion
      };
      
      setMessages(prev => [...prev, aiMessage]);
      setInterviewState(InterviewState.SPEAKING);
      
      if (useVoice) {
        stopAnyPlayingAudio();
        generateSpeech(fallbackQuestion)
          .then(speechBuffer => {
            if (speechBuffer) {
              setAudioBuffer(speechBuffer);
              return playAudioBuffer(speechBuffer);
            }
            return Promise.resolve();
          })
          .then(() => {
            setTimeout(() => {
              setInterviewState(InterviewState.LISTENING);
              startRecording();
            }, 1500);
          })
          .catch(error => {
            console.error('Error playing voice:', error);
            setInterviewState(InterviewState.LISTENING);
            startRecording();
          });
      } else {
        setTimeout(() => {
          setInterviewState(InterviewState.LISTENING);
          startRecording();
        }, 2000);
      }
    }
  };

  const replayQuestion = useCallback(() => {
    if (interviewState === InterviewState.LISTENING) {
      stopRecording();
      setInterviewState(InterviewState.SPEAKING);
      
      const currentQuestionText = messages[messages.length - 1]?.content || "";
      
      if (useVoice && audioBuffer) {
        stopAnyPlayingAudio();
        playAudioBuffer(audioBuffer)
          .then(() => {
            console.log('Audio replay complete, moving to listening state');
            setInterviewState(InterviewState.LISTENING);
            setTimeout(() => {
              startRecording();
            }, recordingDelay);
          })
          .catch(error => {
            console.error('Error replaying voice:', error);
            setInterviewState(InterviewState.LISTENING);
            startRecording();
          });
      } else if (useVoice) {
        stopAnyPlayingAudio();
        generateSpeech(currentQuestionText)
          .then(speechBuffer => {
            if (speechBuffer) {
              setAudioBuffer(speechBuffer);
              return playAudioBuffer(speechBuffer);
            }
            return Promise.resolve();
          })
          .then(() => {
            setInterviewState(InterviewState.LISTENING);
            setTimeout(() => {
              startRecording();
            }, recordingDelay);
          })
          .catch(error => {
            console.error('Error playing voice:', error);
            setInterviewState(InterviewState.LISTENING);
            startRecording();
          });
      } else {
        setTimeout(() => {
          setInterviewState(InterviewState.LISTENING);
          startRecording();
        }, 2000);
      }
    }
  }, [interviewState, messages, stopRecording, startRecording, useVoice, audioBuffer, recordingDelay]);

  const completeInterview = async (finalMessages: Message[], finalAudio?: Blob) => {
    stopAnyPlayingAudio();
    console.log('Completing interview with', finalMessages.length, 'total messages');
    setInterviewState(InterviewState.COMPLETE);
    setIsCompleted(true);
    
    if (participantId) {
      try {
        if (finalAudio) {
          await saveAudio(participantId, finalAudio);
        }
        
        const transcriptUrl = await saveTranscript(participantId, JSON.stringify(finalMessages));
        
        await updateParticipantInterview(participantId, {
          interview_completed: true,
          transcript_url: transcriptUrl || undefined
        });
      } catch (error) {
        console.error('Error saving interview data:', error);
        toast({
          title: "Warning",
          description: "Interview completed, but there was an issue saving all data.",
          variant: "destructive"
        });
      }
    }
    
    onComplete?.(finalMessages);
  };

  return {
    interviewState,
    messages,
    currentQuestion,
    elapsedTime,
    isRecording,
    canSkip,
    isCompleted,
    startInterview,
    skipQuestion,
    replayQuestion,
    stopInterview: stopRecording
  };
};

import { AudioVisualizer, BarVisualizer, useConnectionState, useLocalParticipant, useRoomContext, useVoiceAssistant } from '@livekit/components-react';
import { ConnectionState } from 'livekit-client';
import { LoaderIcon } from 'lucide-react';
import React, { useEffect, useMemo, useRef, useCallback, useState } from 'react'
import { PlaygroundTile } from './AudioTile';
import { TranscriptionTile } from './Transcription';
import Header from "@/components/layout/Header";
import { Volume2, Mic, MicOff, PhoneOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import Reveal from "@/components/ui-custom/Reveal";
import { useKrispNoiseFilter } from "@livekit/components-react/krisp";

const Playground = () => {
  const { localParticipant } = useLocalParticipant();
  const [isMuted, setIsMuted] = useState(false);
  const roomState = useConnectionState();
  const room = useRoomContext()
  const voiceAssistant = useVoiceAssistant();
  const navigate = useNavigate();
  const krisp = useKrispNoiseFilter();

  const toggleMute = () => {
    setIsMuted(prev => !prev);
  }


  const endCall = () => {
    room.disconnect();
    navigate("/");
  }

  useEffect(() => {

    if (roomState === ConnectionState.Connected) {
      localParticipant.setMicrophoneEnabled(!isMuted);
    }
  }, [localParticipant, roomState, isMuted]);

  useEffect(() => {
    krisp.setNoiseFilterEnabled(true);
  },[])

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
                      voiceAssistant.audioTrack && <TranscriptionTile agentAudioTrack={voiceAssistant.audioTrack} />
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
  )
}

export default Playground
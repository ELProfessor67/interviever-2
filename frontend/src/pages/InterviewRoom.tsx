import useConnect from '@/hooks/useConnect';
import React from 'react'
import {
  LiveKitRoom,
  useTracks,
  useLocalParticipant,
  VideoConference,
  RoomAudioRenderer,
  StartAudio,
} from "@livekit/components-react";
import { Track } from "livekit-client";
import Playground from '@/components/Playground';

const InterviewRoom = () => {
  const { token, wsUrl, loading, identity } = useConnect();


  return (
    <>
      {
        token ?
          <LiveKitRoom serverUrl={wsUrl} token={token} connect>
            <Playground/>
            <RoomAudioRenderer/>
            <StartAudio label="Click to enable audio playback" />
          </LiveKitRoom>
          :
          <span>Connecting...</span>
      }
    </>
  )
}

export default InterviewRoom
from livekit.plugins import deepgram
from livekit.agents import (
    DEFAULT_API_CONNECT_OPTIONS,
    APIConnectionError,
    APIConnectOptions,
    APIStatusError,
    APITimeoutError,
    stt,
    utils,
)
import logging
from typing import Any, List, Optional, Tuple

logger = logging.getLogger("livekit.plugins.deepgram")

def live_transcription_to_speech_data(
    language: str, data: dict
) -> List[stt.SpeechData]:
    dg_alts = data["channel"]["alternatives"]

    return [
        stt.SpeechData(
            language=language,
            start_time=alt["words"][0]["start"] if alt["words"] else 0,
            end_time=alt["words"][-1]["end"] if alt["words"] else 0,
            confidence=alt["confidence"],
            text=alt["transcript"],
        )
        for alt in dg_alts
    ]






class SpeechStream(deepgram.SpeechStream):
    treanscriptions = ""
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        
    
    def _process_stream_event(self, data: dict) -> None:
        assert self._opts.language is not None
        
        if data["type"] == "SpeechStarted":
            # This is a normal case. Deepgram's SpeechStarted events
            # are not correlated with speech_final or utterance end.
            # It's possible that we receive two in a row without an endpoint
            # It's also possible we receive a transcript without a SpeechStarted event.
            if self._speaking:
                return

            # self._speaking = True
            # start_event = stt.SpeechEvent(type=stt.SpeechEventType.START_OF_SPEECH)
            # self._event_ch.send_nowait(start_event)

        # see this page:
        # https://developers.deepgram.com/docs/understand-endpointing-interim-results#using-endpointing-speech_final
        # for more information about the different types of events
        elif data["type"] == "Results":
            metadata = data["metadata"]
            request_id = metadata["request_id"]
            is_final_transcript = data["is_final"]
            is_endpoint = data["speech_final"]
            self._request_id = request_id

    
            alts = live_transcription_to_speech_data(self._opts.language, data)
            # If, for some reason, we didn't get a SpeechStarted event but we got
            # a transcript with text, we should start speaking. It's rare but has
            # been observed.
            if len(alts) > 0 and alts[0].text:
                self.treanscriptions += f" ,{alts[0].text}"
                if not self._speaking:
                    self._speaking = True
                    # start_event = stt.SpeechEvent(
                    #     type=stt.SpeechEventType.START_OF_SPEECH
                    # )
                    # self._event_ch.send_nowait(start_event)
                

                if is_endpoint:
                    print("8765:log",self.treanscriptions)
                    alts[0].text = self.treanscriptions
                    self.treanscriptions = ""
                    final_event = stt.SpeechEvent(
                        type=stt.SpeechEventType.FINAL_TRANSCRIPT,
                        request_id=request_id,
                        alternatives=alts,
                    )
                    self._event_ch.send_nowait(final_event)
                    
                    self._speaking = False
                   

                # if is_final_transcript:
                #     final_event = stt.SpeechEvent(
                #         type=stt.SpeechEventType.FINAL_TRANSCRIPT,
                #         request_id=request_id,
                #         alternatives=alts,
                #     )
                #     self._event_ch.send_nowait(final_event)
                # else:
                #     interim_event = stt.SpeechEvent(
                #         type=stt.SpeechEventType.INTERIM_TRANSCRIPT,
                #         request_id=request_id,
                #         alternatives=alts,
                #     )
                #     self._event_ch.send_nowait(interim_event)

            # if we receive an endpoint, only end the speech if
            # we either had a SpeechStarted event or we have a seen
            # a non-empty transcript (deepgram doesn't have a SpeechEnded event)
            

            # if is_endpoint and self._speaking:

            #     self._speaking = False
            #     self._event_ch.send_nowait(
            #         stt.SpeechEvent(type=stt.SpeechEventType.END_OF_SPEECH)
            #     )

        elif data["type"] == "Metadata":
            pass  # metadata is too noisy
        else:
            logger.warning("received unexpected message from deepgram %s", data)


class DeepgramSTT(deepgram.STT):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

    def stream(
        self,
        *,
        language = None,
        conn_options: APIConnectOptions = DEFAULT_API_CONNECT_OPTIONS,
    ) -> "SpeechStream":
        config = self._sanitize_options(language=language)
        stream = SpeechStream(
            stt=self,
            conn_options=conn_options,
            opts=config,
            api_key=self._api_key,
            http_session=self._ensure_session(),
            base_url=self._base_url,
        )
        self._streams.add(stream)
        return stream

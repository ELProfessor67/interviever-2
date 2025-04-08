import logging
from dotenv import load_dotenv
from livekit import rtc,api

from livekit.agents import (
    AutoSubscribe,
    JobContext,
    JobProcess,
    WorkerOptions,
    cli,
    llm,
    metrics
)
from livekit.agents.pipeline import VoicePipelineAgent
from livekit.plugins import deepgram, openai, silero
from livekit.plugins.deepgram import tts
import time
from datetime import datetime
from aws_service import upload_text_to_s3,get_recording_url
from itertools import tee
import requests
import os
import json

logger = logging.getLogger("voice-assistant")
load_dotenv()


n8n_url = os.getenv("N8N_URL")

def prewarm(proc: JobProcess):
    proc.userdata["vad"] = silero.VAD.load()


async def entrypoint(ctx: JobContext):
   
    meeting_start_time = time.time()
    transcriptions = []
    openai_llm = openai.LLM(model='gpt-4o-mini')
    #initialize llm
    

    logger.info(f"connecting to room {ctx.room.name}")
    await ctx.connect(auto_subscribe=AutoSubscribe.AUDIO_ONLY)

    # wait for the first participant to connect
    participant = await ctx.wait_for_participant()
    logger.info(f"starting voice assistant for participant {participant.identity}")

    
    metadata = json.loads(participant.metadata)
    SYSTEM_PROMT=metadata.get("prompt","You are interview conducter")
    CANDIDATE_DETAIL=metadata.get("candidate_detail","You are interview conducter")
    initial_ctx = llm.ChatContext().append(
        role="system",
        text=SYSTEM_PROMT
    )

    initial_ctx.append(role="user",text=f"CandidateDetail: {CANDIDATE_DETAIL}")

    dg_model = "nova-3-general"
    if participant.kind == rtc.ParticipantKind.PARTICIPANT_KIND_SIP:
        # use a model optimized for telephony
        dg_model = "nova-2-phonecall"

    
    async def before_llm(assistant: VoicePipelineAgent, chat_ctx: llm.ChatContext):
        current_time = time.time()
        elapsed_time_min = (current_time - meeting_start_time) / 60
        transcriptions.append(f"Interview: {chat_ctx.messages[len(chat_ctx.messages)-2].content}")
        transcriptions.append(f"Candidate: {chat_ctx.messages[len(chat_ctx.messages)-1].content}")
        chat_ctx.messages[len(chat_ctx.messages)-1].content = f"ElapsedTime: ${elapsed_time_min}min, CandidateSays: {chat_ctx.messages[len(chat_ctx.messages)-1]}"


    agent = VoicePipelineAgent(
        vad=ctx.proc.userdata["vad"],
        stt=deepgram.STT(model=dg_model),
        before_llm_cb=before_llm,
        llm=openai_llm,
        # tts=openai.TTS(),
        tts=tts.TTS(model="aura-asteria-en"),
        chat_ctx=initial_ctx,
    )

    agent.start(ctx.room, participant)

    usage_collector = metrics.UsageCollector()

    @agent.on("metrics_collected")
    def _on_metrics_collected(mtrcs: metrics.AgentMetrics):
        metrics.log_metrics(mtrcs)
        usage_collector.collect(mtrcs)



    async def log_usage(res,lkapi):
        print("User Disconnected")
        summary = usage_collector.get_summary()
        logger.info(f"Usage: ${summary}")
        
        # stop recording
        await lkapi.aclose()

        #save to google sheet
        text = "\n".join(transcriptions)
        filename = f"{time.time()}.txt"
        file_url = upload_text_to_s3(text,filename)
        recording_file_url = get_recording_url(res.file.filename)
        current_time = time.time()
        elapsed_time_min = (current_time - meeting_start_time) / 60

        current_datetime = datetime.now()
        formatted_datetime = current_datetime.strftime("%Y-%m-%d %H:%M:%S") 

        data = {
            "transcription": file_url,
            "recording": recording_file_url,
            "roomname": ctx.room.name,
            "duration": f"{elapsed_time_min:.2f}min",
            "date": formatted_datetime,
            "name": metadata.get("name", ""),
            "age": metadata.get("age", ""),
            "gender": metadata.get("gender", ""),
            "industry": metadata.get("industry", ""),
            "experience": metadata.get("experience", ""),
            "goal": metadata.get("goal", ""),
            "BD": metadata.get("BD", ""),
            "GM": metadata.get("GM", ""),
            "PC": metadata.get("PC", ""),
            "IB": metadata.get("IB", "")
        }

        headers = {"Content-Type": "application/json"}

        response = requests.post(n8n_url, json=data, headers=headers)
        print("DONE")

        

     
    await agent.say("Hello I am You interviewer today.", allow_interruptions=True)


    #  # recording 
    req = api.RoomCompositeEgressRequest(
        room_name=ctx.room.name,
        layout="single-speaker",
        preset=api.EncodingOptionsPreset.H264_720P_30,
        audio_only=True,
        file_outputs=[  
            api.EncodedFileOutput(
                filepath=ctx.room.name,
                s3=api.S3Upload(
                    bucket=os.getenv("S3_BUCKET_NAME"),
                    access_key=os.getenv("S3_ACCESS_KEY"),
                    secret=os.getenv("S3_SECRET_ACCESS_KEY"),
                    force_path_style=True,
                ),
            ),
        ],
    )

    lkapi = api.LiveKitAPI()
    res = await lkapi.egress.start_room_composite_egress(req)
    logger.info(f"Egress started: {res.egress_id}")
    ctx.add_shutdown_callback(lambda: log_usage(res,lkapi))

if __name__ == "__main__":
    cli.run_app(
        WorkerOptions(
            entrypoint_fnc=entrypoint,
            prewarm_fnc=prewarm,
            shutdown_process_timeout=2
        ),
    )
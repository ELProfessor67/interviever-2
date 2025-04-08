import Fastify from 'fastify';
import dotenv from 'dotenv';
import fastifyFormBody from '@fastify/formbody';
import fastifyWs from '@fastify/websocket';
import fastifySocketIo from 'fastify-socket.io';
import { TranscriptionService } from './services/TranscribtionService.js';
import { SYSTEM_PROMTP, TIME_LIMIT, WELCOME_MESSAGE } from './constant/promptConstant.js';
import { textToSpeechService } from './services/realTimeSpeechService.js';
import { promptLLM } from './services/promtLLMservice.js';
import fastifyCors from 'fastify-cors';
import { createWriteStream, writeFile } from 'fs';
import { AccessToken } from "livekit-server-sdk";
import { date } from 'zod';

// Load environment variables from .env file
dotenv.config();

// Retrieve the OpenAI API key from environment variables
const { OPENAI_API_KEY } = process.env;
const apiKey = process.env.LIVEKIT_API_KEY;
const apiSecret = process.env.LIVEKIT_API_SECRET;


if (!OPENAI_API_KEY) {
    console.error('Missing OpenAI API key. Please set it in the .env file.');
    process.exit(1);
}

// Initialize Fastify
const fastify = Fastify();
fastify.register(fastifyFormBody);
fastify.register(fastifyWs);
fastify.register(fastifySocketIo, {
    cors: {
        origin: '*', // Adjust CORS as needed
    }
});

fastify.register(fastifyCors, {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
});

const PORT = process.env.PORT || 5002;

// Session management
const sessions = new Map();

function generateRandomAlphanumeric(length) {
    const characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    const charactersLength = characters.length;

    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
}

const createToken = (userInfo, grant) => {
    const at = new AccessToken(apiKey, apiSecret, userInfo);
    at.addGrant(grant);
    return at.toJwt();
};



// Root Route
fastify.get('/', async (request, reply) => {
    reply.send({ message: 'Media Stream Server is running!' });
});

//generate livekit token
fastify.post('/token', async (request, reply) => {
   
    const {metadata} = request.body;
    const roomName = `room-${generateRandomAlphanumeric(4)}-${generateRandomAlphanumeric(4)}`;

    // Get participant name from query params or generate random one
    const identity = `identity-${generateRandomAlphanumeric(4)}`;

    const grant = {
        room: roomName,
        roomJoin: true,
        canPublish: true,
        canPublishData: true,
        canSubscribe: true,
    };
    const token = await createToken({ identity,metadata:JSON.stringify(metadata)}, grant);
    const result = {
        identity,
        accessToken: token,
    };
    reply.send(result);
});





// WebSocket route for talk better
fastify.register(async (fastify) => {
    fastify.get('/media-stream', { websocket: true }, (connection, req) => {
        console.log("Client connected");

        const handleIntruption = () => {
            config.stopStream = true;
            connection.send(
                JSON.stringify({
                    event: 'clear',
                })
            );
        }

        const handleSendTranscription = (user, transcript_text) => {
            connection.send(
                JSON.stringify({
                    event: 'transcription',
                    transcription: `${user}: ${transcript_text}`
                })
            );
        }

        const config = {
            stopStream: false,
            assistantSpeaking: false,
            user: {
                name: undefined,
            },
            sections: [],
            botSpeaking: true,
            count: 1,
            userWavChunks: [],
            writeFile: null
        }






        const transcriptionService = new TranscriptionService(handleIntruption, config);
        const TTSService = textToSpeechService(connection, config);
        const userChat = [];
        let startAt = new Date();

        // Handle incoming messages from Twilio
        connection.on('message', async (message) => {
            try {


                const data = JSON.parse(message);
                switch (data.event) {
                    case 'start':
                        config.user.name = data?.start?.user?.name;
                        config.sections = data?.start?.sections;
                        // const systemPrompt = SYSTEM_PROMTP(config.sections, config.user.name);
                        const systemPrompt = data.start.system_prompt;
                        userChat.push({ role: 'system', content: systemPrompt });
                        setTimeout(async () => {
                            config.stopStream = false;
                            const assistantResponse = await promptLLM(TTSService, userChat, config);
                            if (assistantResponse) handleSendTranscription("Interviewer", assistantResponse);
                            userChat.push({ role: 'assistant', content: assistantResponse });
                        }, 1000);
                        break;
                    case 'media':
                        transcriptionService.send(data.media.payload);
                        break;
                }
            } catch (error) {
                console.error('Error parsing message:', error, 'Message:', message);
            }
        });








        transcriptionService.on('transcription', async (transcript_text) => {
            if (!transcript_text) return

            console.log('User', transcript_text);

            if (transcript_text) {
                handleIntruption();
            }

            handleSendTranscription("Candidate", transcript_text);
            userChat.push({ role: 'user', content: transcript_text });
            const elapsedTime = Math.floor((Date.now() - startAt) / 60000);

            config.stopStream = false;
            const assistantResponse = await promptLLM(TTSService, userChat, config, `[Elapsed Time: ${elapsedTime} min] Candidate: {transcript_text}`);
            handleSendTranscription("Interviewer", assistantResponse);
            userChat.push({ role: 'assistant', content: assistantResponse });
            console.log('Assistant', assistantResponse);
        })

        // Handle connection close and log transcript
        connection.on('close', async () => {
            console.log(`Client disconnected`);
            TTSService.close();
            transcriptionService.close();
        });
    });
});



fastify.listen({ port: PORT }, (err) => {
    if (err) {
        console.error(err);
        process.exit(1);
    }
    console.log(`Server is listening on port ${PORT}`);
});
import WebSocket from 'ws';
import wavefile from 'wavefile';
import fs from 'fs'
import pkg from 'lodash';
import { convertWebmToWav } from '../utils/webmToWav.js';
const { debounce } = pkg;

const deepgramTTSWebsocketURL = 'wss://api.deepgram.com/v1/speak?encoding=mulaw&sample_rate=8000&container=none';

export const textToSpeechService = (connection, config) => {
  let chunks = [];

  const handleSave = debounce(() => {
    console.log("Saving Wav chunks...",chunks.length);

    const mergeBuffer = Buffer.concat(chunks);
    const wav = new wavefile.WaveFile();
    wav.fromScratch(1, 8000, '8m', mergeBuffer);
    fs.writeFileSync(`./recording-chunks/${config.count++}.wav`, wav.toBuffer());
    chunks = []
    config.writeFile = fs.createWriteStream(`./recording-chunks/${config.count++}.webm`);
    config.botSpeaking = false;
  }, 500); // Debounce time (100ms)

  const options = {
    headers: {
      Authorization: `Token ${process.env.DEEPGRAM_API_KEY}`
    }
  };

  const ws = new WebSocket(deepgramTTSWebsocketURL, options);

  ws.on('open', function open() {
    console.log('deepgram TTS: Connected to the WebSocket server');
  });

  ws.on('message', function incoming(data) {
    // Handles barge in

    try {
      let json = JSON.parse(data.toString());
      console.log('deepgram TTS: ', data.toString());
      return;
    } catch (e) {
      // Ignore
    }

    // if (config.botSpeaking == false && config.writeFile) {
    //   config.writeFile.end();
    // }

    config.botSpeaking = true;
    const buffer = Buffer.from(data);
    const wav = new wavefile.WaveFile();
    wav.fromScratch(1, 8000, '8m', buffer);
    // chunks.push(wav.toBuffer());
    wav.fromMuLaw();
    wav.toSampleRate(16000);
    const payload = Buffer.from(wav.data.samples).toString('base64');

    const sendData = {
      event: 'media',
      media: {
        payload
      }
    }

    if (!config.stopStream) {
      connection.send(JSON.stringify(sendData));
    }

    // handleSave();
  });

  ws.on('close', function close() {
    console.log('deepgram TTS: Disconnected from the WebSocket server');
  });

  ws.on('error', function error(error) {
    console.log("deepgram TTS: error received");
    console.error(error);
  });
  return ws;
}



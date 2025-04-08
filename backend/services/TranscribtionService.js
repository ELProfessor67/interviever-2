import { Buffer } from 'node:buffer';
import EventEmitter from 'events';
import WebSocket from 'ws';
export class TranscriptionService extends EventEmitter {
  socket;
  isOpen = false;
  text = '';
  config = null
  constructor(handleIntruption, config) {
    super();
    this.config = config;
    this.socket = new WebSocket('wss://api.deepgram.com/v1/listen?model=nova-2-phonecall&language=en&smart_format=true&sample_rate=8000&channels=1&multichannel=false&no_delay=true&endpointing=300', [
      'token',
      process.env.DEEPGRAM_API_KEY,
    ]);

    this.socket.onopen = () => {
      this.isOpen = true;
      console.log({ event: 'onopen' });
    }

    this.socket.onmessage = (message) => {
      const received = JSON.parse(message.data)
      if (!received?.channel?.alternatives) return;
      const transcript = received?.channel?.alternatives[0]?.transcript


      if (transcript) {
        this.text += transcript;
        handleIntruption();

      };


      if (transcript && received.speech_final) {
        this.emit("transcription", this.text);
        this.text = '';
      }
    }

    this.socket.onclose = () => {
      this.isOpen = false;
      console.log({ event: 'onclose' })
    }

    this.socket.onerror = (error) => {
      this.isOpen = false;
      console.log({ event: 'onerror', error })
    }

  }

  /**
   * Send the payload to Deepgram
   * @param {String} payload A base64 MULAW/8000 audio stream
   */
  async send(payload) {
    if (this.config?.botSpeaking == false) {
      const buffer = Buffer.from(payload, 'base64');
      // this.config.userWavChunks.push(buffer);
      // this.config.writeFile.write(buffer);
    }

    if (this.isOpen) {
      this.socket.send(Buffer.from(payload, 'base64'));
    }
  }

  close() {
    this.socket.close();
  }
}


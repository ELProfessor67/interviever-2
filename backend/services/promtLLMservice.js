import OpenAI from "openai";
import { config } from "dotenv";
config();

const openai = new OpenAI();

export async function promptLLM(mediaStream, prompt,config) {
    const stream = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      stream: true,
      temperature: 0.7,
      presence_penalty: 0.6,
      frequency_penalty: 0,
      top_p: 1,
      max_tokens: 150,
      messages: prompt,
    });
  
    config.stopStream = false;
    let text = '';
    for await (const chunk of stream) {
      if (!config.stopStream) {
        const chunk_message = chunk?.choices[0]?.delta?.content;
        if (chunk_message) {
          text += chunk_message;
          mediaStream.send(JSON.stringify({ 'type': 'Speak', 'text': chunk_message }));
        }
      }
    }
    // Tell TTS Websocket were finished generation of tokens
    mediaStream.send(JSON.stringify({ 'type': 'Flush' }));
    return text;
}
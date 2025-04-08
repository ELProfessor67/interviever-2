
import { getApiKey } from '../utils/apiKeyUtils';
import { toast } from 'sonner';

const OPENAI_TTS_ENDPOINT = 'https://api.openai.com/v1/audio/speech';

let activeAudioElement: HTMLAudioElement | null = null;

export const validateApiKey = async (apiKey: string): Promise<boolean> => {
  try {
    // Use OpenAI's models endpoint to validate the API key
    const response = await fetch('https://api.openai.com/v1/models', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      const error = await response.json().catch(() => null);
      console.error('API key validation failed:', response.status, error);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error validating OpenAI API key:', error);
    return false;
  }
};

export const generateSpeech = async (text: string): Promise<ArrayBuffer | null> => {
  const apiKey = getApiKey('openai');

  if (!apiKey) {
    console.error('OpenAI API key is missing');
    toast.error('OpenAI API key is required for AI responses');
    return null;
  }

  try {
    console.log('Generating speech using OpenAI TTS:', text.substring(0, 50) + (text.length > 50 ? '...' : ''));
    
    const response = await fetch(OPENAI_TTS_ENDPOINT, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'tts-1',
        voice: 'alloy',
        input: text
      })
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('Speech generation failed', response.status, response.statusText, errorData);
      
      if (response.status === 401) {
        toast.error('Invalid API key. Please check your OpenAI API key.');
      } else if (response.status === 429) {
        toast.error('Rate limit exceeded. Please try again in a moment.');
      } else {
        toast.error('Failed to generate speech. Please check your API key and settings.');
      }
      return null;
    }

    const audioArrayBuffer = await response.arrayBuffer();
    return audioArrayBuffer;
  } catch (error) {
    console.error('Error generating speech:', error);
    toast.error('Failed to generate speech. Please try again.');
    return null;
  }
};

export const playAudioBuffer = async (audioBuffer: ArrayBuffer): Promise<void> => {
  return new Promise((resolve, reject) => {
    try {
      // Stop any currently playing audio first
      stopAnyPlayingAudio();

      // Create a Blob and URL from the audio buffer
      const blob = new Blob([audioBuffer], { type: 'audio/mpeg' });
      const audioUrl = URL.createObjectURL(blob);
      
      // Create a new audio element and play it
      const audio = new Audio();
      audio.src = audioUrl;

      // Important: Set audio output to speakers only to reduce echo
      if ('setSinkId' in audio && typeof (audio as any).setSinkId === 'function') {
        try {
          // This will ensure audio goes to speakers if the browser supports it
          (audio as any).setSinkId('default');
        } catch (e) {
          console.log('Could not set audio output device', e);
        }
      }

      activeAudioElement = audio;
      
      audio.onended = () => {
        URL.revokeObjectURL(audioUrl);
        if (activeAudioElement === audio) {
          activeAudioElement = null;
        }
        resolve();
      };
      
      audio.onerror = (e) => {
        URL.revokeObjectURL(audioUrl);
        console.error('Audio playback error:', e);
        if (activeAudioElement === audio) {
          activeAudioElement = null;
        }
        reject(new Error('Failed to play audio'));
      };
      
      // Set volume to an appropriate level
      audio.volume = 0.8;
      
      // Play audio
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.catch(error => {
          console.error('Audio play error:', error);
          if (activeAudioElement === audio) {
            activeAudioElement = null;
          }
          reject(error);
        });
      }
    } catch (error) {
      console.error('Error playing audio buffer:', error);
      reject(error);
    }
  });
};

// Function to stop any playing audio
export const stopAnyPlayingAudio = (): void => {
  if (activeAudioElement) {
    console.log('Stopping currently playing audio');
    activeAudioElement.pause();
    activeAudioElement.remove();
    activeAudioElement = null;
  }
};

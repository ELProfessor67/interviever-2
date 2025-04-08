import { getApiKey } from '../utils/apiKeyUtils';
import { toast } from 'sonner';

const OPENAI_API_ENDPOINT = 'https://api.openai.com/v1';

export interface TranscriptionResponse {
  text: string;
}

export async function transcribeAudio(audioBlob: Blob): Promise<TranscriptionResponse> {
  const apiKey = getApiKey('openai');
  
  if (!apiKey) {
    console.error('OpenAI API key is missing');
    toast.error('OpenAI API key is required for transcription');
    return { text: '[Transcription unavailable - API key missing]' };
  }

  console.log(`Transcribing audio: ${audioBlob.size} bytes, type: ${audioBlob.type}`);

  if (audioBlob.size === 0) {
    console.error('Empty audio blob received for transcription');
    toast.error('No audio data to transcribe. Please check your microphone.');
    return { text: '[No audio data to transcribe]' };
  }

  if (audioBlob.size < 1000) {
    console.warn('Very small audio blob received, might not contain enough data to transcribe');
    toast.warning('Audio recording appears to be too short. Please speak longer and more clearly.');
    return { text: '[Audio recording too short]' };
  }

  // Ensure we're using the correct format - WebM is preferred for browser compatibility 
  // with Whisper API
  const formData = new FormData();
  
  // Use the explicit file extension based on the MIME type
  let filename = 'audio.webm';
  const blobType = audioBlob.type.toLowerCase();
  
  if (blobType.includes('webm')) {
    filename = 'audio.webm';
  } else if (blobType.includes('wav') || blobType.includes('wave')) {
    filename = 'audio.wav';
  } else if (blobType.includes('mp3') || blobType.includes('mpeg')) {
    filename = 'audio.mp3';
  } else {
    console.warn(`Unknown audio type: ${blobType}, defaulting to webm`);
  }
  
  console.log(`Using filename: ${filename} for blob type: ${blobType}`);
  
  formData.append('file', audioBlob, filename);
  formData.append('model', 'whisper-1');
  formData.append('response_format', 'json');
  formData.append('language', 'en');

  try {
    console.log(`START TRANSCRIPTION: Sending request to OpenAI for ${filename}, size: ${audioBlob.size} bytes`);
    console.log(`Using API key (first 5 chars): ${apiKey.substring(0, 5)}...`);
    
    // Log form data content for debugging
    for (const [key, value] of formData.entries()) {
      if (key === 'file') {
        const fileObj = value as File;
        console.log(`FormData - ${key}: ${fileObj.name}, size: ${fileObj.size}, type: ${fileObj.type}`);
      } else {
        console.log(`FormData - ${key}: ${value}`);
      }
    }

    // Make the API request
    const response = await fetch(`${OPENAI_API_ENDPOINT}/audio/transcriptions`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`
      },
      body: formData
    });

    // Log the response status for debugging
    console.log(`TRANSCRIPTION RESPONSE: Status: ${response.status}`);
    
    if (!response.ok) {
      const errorText = await response.text();
      try {
        const errorData = JSON.parse(errorText);
        console.error('TRANSCRIPTION ERROR:', errorData);
        
        // User-friendly error messages
        if (response.status === 401) {
          toast.error('API key is invalid or expired. Please check your OpenAI API key.');
        } else if (response.status === 429) {
          toast.error('Rate limit exceeded. Please try again in a moment.');
        } else if (response.status === 400) {
          const errorMessage = errorData.error?.message || 'Unknown error';
          console.error('Full error message:', errorMessage);
          
          if (errorMessage.includes('file format') || errorMessage.includes('audio format')) {
            toast.error('Audio format issue. Please use Chrome for best compatibility.');
            console.error('Audio format error. Original type:', audioBlob.type);
          } else if (errorMessage.includes('Invalid file')) {
            toast.error('Invalid audio file. Please try speaking more clearly or check your microphone.');
          } else {
            toast.error(`Transcription failed: ${errorMessage}`);
          }
        } else {
          toast.error('Failed to transcribe speech. Please try again.');
        }
        
        // Provide a placeholder text so the interview can continue
        return { text: "[I couldn't hear what you said. Could you repeat that more clearly?]" };
      } catch (e) {
        console.error('Error parsing API error response:', e, 'Raw:', errorText);
        toast.error('Failed to transcribe speech. Please check your microphone and try again.');
        return { text: "[I couldn't hear what you said. Could you repeat that more clearly?]" };
      }
    }

    const result = await response.json();
    console.log('TRANSCRIPTION SUCCESS: Result:', result);
    
    if (!result.text || result.text.trim() === '') {
      console.warn('Empty transcription received from API');
      toast.warning('No speech detected. Please speak more clearly or check your microphone.');
      return { text: '[No speech detected. Please speak more clearly.]' };
    }
    
    return result;
  } catch (error) {
    console.error('TRANSCRIPTION ERROR:', error);
    toast.error('Failed to connect to transcription service. Please check your internet connection.');
    return { text: '[Had trouble hearing you. Please check your microphone and try again.]' };
  }
}

// Helper function to determine a standard MIME type for the audio
function determineStandardMimeType(originalType: string): string {
  console.log('Determining standard MIME type for:', originalType);
  
  // First, try the most Whisper-compatible formats
  if (originalType.includes('mp3') || originalType.includes('mpeg')) {
    return 'audio/mp3';
  }
  
  if (originalType.includes('wav')) {
    return 'audio/wav';
  }
  
  // WebM is well-supported on Chrome
  if (originalType.includes('webm')) {
    return 'audio/webm';
  }
  
  // Ogg is often supported on Firefox
  if (originalType.includes('ogg')) {
    return 'audio/ogg';
  }
  
  // Apple devices often use audio/mp4
  if (originalType.includes('mp4') || originalType.includes('m4a')) {
    return 'audio/mp4';
  }
  
  // Chrome's MediaRecorder typically uses WebM by default
  console.log('Using audio/mp3 as default MIME type for Whisper compatibility');
  return 'audio/mp3';
}

export async function generateResponse(messages: { role: string, content: string }[]): Promise<string> {
  const apiKey = getApiKey('openai');
  
  if (!apiKey) {
    console.error('OpenAI API key is missing');
    toast.error('OpenAI API key is required for AI responses');
    return "I'm sorry, I can't generate a response right now. Please check your API key settings.";
  }

  console.log(`START GENERATING RESPONSE: Using API key (first 5 chars): ${apiKey.substring(0, 5)}...`);
  console.log('Sending messages to OpenAI:', JSON.stringify(messages, null, 2));

  try {
    console.log('Sending chat request to OpenAI API');
    
    const response = await fetch(`${OPENAI_API_ENDPOINT}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: 'You are an AI interviewer collecting information about users to create personas. Ask follow-up questions based on their responses.'
          },
          ...messages
        ],
        temperature: 0.7,
        max_tokens: 300
      })
    });
    
    // Log the response status for debugging
    console.log(`CHAT RESPONSE: Status: ${response.status}`);

    if (!response.ok) {
      let errorMessage = 'Failed to generate response';
      try {
        const errorData = await response.json();
        errorMessage = errorData.error?.message || errorMessage;
        console.error('CHAT ERROR:', errorData);
        
        // Check for common issues
        if (response.status === 401) {
          toast.error('API key is invalid or expired. Please check your OpenAI API key.');
        } else if (response.status === 429) {
          toast.error('Rate limit exceeded. Please try again in a moment.');
        } else {
          toast.error(`AI response failed: ${errorMessage}`);
        }
      } catch (parseError) {
        console.error('Error parsing API error response:', parseError);
        console.error('Raw response:', await response.text().catch(() => 'Unable to get response text'));
        toast.error('Failed to generate AI response. Check console for details.');
      }
      throw new Error(errorMessage);
    }

    const data = await response.json();
    console.log('CHAT SUCCESS: OpenAI response:', data);
    return data.choices[0].message.content;
  } catch (error) {
    console.error('CHAT ERROR: Response generation error:', error);
    toast.error('Failed to generate AI response. Please try again.');
    return "I'm sorry, I couldn't process your response right now. Let's try again.";
  }
}


import { createClient } from '@supabase/supabase-js';

// Initialize the Supabase client with your provided credentials
// Updated URL from .com to .co which is the correct Supabase domain
const supabaseUrl = 'https://wgerdrdsuusnrdnwwelt.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndnZXJkcmRzdXVzbnJkbnd3ZWx0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDIxODkxMjAsImV4cCI6MjA1Nzc2NTEyMH0.yAoqtSbNo7gabNOSyDrNGNjIUaMIPwyhevV2F-IQHbY';

if (!supabaseUrl || !supabaseKey) {
  console.error('Supabase environment variables are missing');
}

export const supabase = createClient(supabaseUrl, supabaseKey);

export interface Participant {
  id?: string;
  email: string;
  screener_passed: boolean;
  questionnaire_data: Record<string, any>;
  interview_unlocked: boolean;
  unlock_code?: string;
  interview_completed: boolean;
  transcript_url?: string;
  audio_url?: string;
  created_at?: string;
}

// Create a new participant
export async function createParticipant(participant: Omit<Participant, 'id' | 'created_at'>): Promise<Participant | null> {
  try {
    const { data, error } = await supabase
      .from('participants')
      .insert(participant)
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error creating participant:', error);
    return null;
  }
}

// Get a participant by email
export async function getParticipantByEmail(email: string): Promise<Participant | null> {
  try {
    const { data, error } = await supabase
      .from('participants')
      .select('*')
      .eq('email', email)
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error getting participant:', error);
    return null;
  }
}

// Update a participant's interview data
export async function updateParticipantInterview(
  participantId: string, 
  updates: Partial<Pick<Participant, 'interview_completed' | 'transcript_url' | 'audio_url'>>
): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('participants')
      .update(updates)
      .eq('id', participantId);

    if (error) throw error;
    return true;
  } catch (error) {
    console.error('Error updating participant interview:', error);
    return false;
  }
}

// Generate and store an unlock code for a participant
export async function generateUnlockCode(email: string): Promise<string | null> {
  try {
    // Generate a random 6-digit code
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    
    const { error } = await supabase
      .from('participants')
      .update({ unlock_code: code })
      .eq('email', email);

    if (error) throw error;
    return code;
  } catch (error) {
    console.error('Error generating unlock code:', error);
    return null;
  }
}

// Validate an unlock code
export async function validateUnlockCode(email: string, code: string): Promise<boolean> {
  try {
    const { data, error } = await supabase
      .from('participants')
      .select('*')
      .eq('email', email)
      .eq('unlock_code', code)
      .single();

    if (error) throw error;
    
    if (data) {
      // If code is valid, mark the interview as unlocked
      await supabase
        .from('participants')
        .update({ interview_unlocked: true })
        .eq('id', data.id);
        
      return true;
    }
    
    return false;
  } catch (error) {
    console.error('Error validating unlock code:', error);
    return false;
  }
}

// Save interview transcript
export async function saveTranscript(participantId: string, transcript: string): Promise<string | null> {
  try {
    const fileName = `transcript_${participantId}_${Date.now()}.json`;
    
    // Upload transcript to Supabase storage
    const { data, error } = await supabase
      .storage
      .from('transcripts')
      .upload(fileName, JSON.stringify({ transcript }), {
        contentType: 'application/json',
      });

    if (error) throw error;
    
    // Get the public URL for the uploaded file
    const { data: urlData } = supabase
      .storage
      .from('transcripts')
      .getPublicUrl(fileName);
      
    // Update the participant record with the transcript URL
    await updateParticipantInterview(participantId, {
      transcript_url: urlData.publicUrl
    });
    
    return urlData.publicUrl;
  } catch (error) {
    console.error('Error saving transcript:', error);
    return null;
  }
}

// Save interview audio
export async function saveAudio(participantId: string, audioBlob: Blob): Promise<string | null> {
  try {
    const fileName = `audio_${participantId}_${Date.now()}.mp3`;
    
    // Upload audio to Supabase storage - updated to use 'interview-audio' bucket
    const { data, error } = await supabase
      .storage
      .from('interview-audio')
      .upload(fileName, audioBlob, {
        contentType: 'audio/mpeg',
      });

    if (error) throw error;
    
    // Get the public URL for the uploaded file
    const { data: urlData } = supabase
      .storage
      .from('interview-audio')
      .getPublicUrl(fileName);
      
    // Update the participant record with the audio URL
    await updateParticipantInterview(participantId, {
      audio_url: urlData.publicUrl
    });
    
    return urlData.publicUrl;
  } catch (error) {
    console.error('Error saving audio:', error);
    return null;
  }
}

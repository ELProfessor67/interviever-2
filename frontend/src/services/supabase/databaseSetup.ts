
import { supabase } from './supabaseService';
import { toast } from 'sonner';

/**
 * Checks if the required tables exist in the Supabase database
 * and creates them if they don't
 */
export async function ensureTablesExist(): Promise<boolean> {
  try {
    console.log('Starting complete database check...');
    
    // First check if we can connect to Supabase at all
    try {
      // Instead of directly accessing the supabaseUrl property, we'll use the URL from the service file
      console.log('Checking Supabase connection...');
      const { data: healthCheck, error: healthError } = await supabase.rpc('healthcheck', {});
      
      if (healthError) {
        console.error('Supabase connection error:', healthError);
        // If we can't connect, try to create the buckets manually instead of failing
        console.log('Attempting to create storage buckets directly...');
        await createStorageBuckets();
      } else {
        console.log('Supabase connection is healthy');
      }
    } catch (healthErr) {
      // RPC might not exist, which is fine, we'll try direct API calls
      console.log('Health check not available, continuing with direct checks');
    }
    
    // Create storage buckets if they don't exist
    const bucketsReady = await ensureStorageBuckets();
    if (!bucketsReady) {
      console.log('Failed to ensure storage buckets');
      return false;
    }

    // Now check if participants table exists
    console.log('Checking participants table...');
    try {
      const { data: tables, error } = await supabase
        .from('participants')
        .select('id')
        .limit(1);
      
      if (error) {
        console.error('Error checking participants table:', error);
        
        if (error.code === '42P01' || error.message.includes('relation "participants" does not exist')) {
          // Table doesn't exist
          toast.error('Participants table does not exist. Please create it in Supabase.', {
            duration: 8000,
          });
          return false;
        } else if (error.code === '42P07' || error.message.includes('relation "participants" already exists')) {
          // Table already exists, which is what we want
          console.log('Participants table exists (code indicated)');
          return true;
        } else {
          // Other error (connection issues, etc.)
          toast.error(`Database connection error: ${error.message}`, {
            duration: 5000,
          });
          return false;
        }
      }
      
      // If we got here, the query succeeded which means the table exists
      console.log('Participants table exists and accessible ✅');
      return true;
    } catch (tableErr) {
      console.error('Exception during table check:', tableErr);
      
      // As a fallback, try to query another way
      try {
        const { data: tablesData, error: tablesError } = await supabase
          .rpc('get_tables', {});
        
        if (!tablesError && tablesData && tablesData.includes('participants')) {
          console.log('Participants table exists (alternate check) ✅');
          return true;
        }
      } catch (fallbackErr) {
        // Fallback didn't work either
      }
      
      toast.error('Could not verify database setup. Please check your Supabase configuration.');
      return false;
    }
  } catch (error) {
    console.error('Database setup error:', error);
    toast.error('Failed to set up database. Please check your Supabase configuration.');
    return false;
  }
}

/**
 * Ensures the required storage buckets exist and creates them if they don't
 */
async function ensureStorageBuckets(): Promise<boolean> {
  try {
    console.log('Checking and ensuring storage buckets exist...');
    
    // List available buckets to see what we have
    const { data: bucketList, error: listError } = await supabase
      .storage
      .listBuckets();
    
    if (listError) {
      console.error('Error listing storage buckets:', listError);
      
      // Create buckets if we couldn't list them (might be permissions)
      return await createStorageBuckets();
    }
    
    console.log('Available buckets:', bucketList || []);
    
    // Check if our required buckets exist in the list
    const bucketNames = bucketList?.map(bucket => bucket.name) || [];
    const hasTranscriptsBucket = bucketNames.includes('transcripts');
    const hasAudioBucket = bucketNames.includes('interview-audio');
    
    console.log('Bucket check results:', { hasTranscriptsBucket, hasAudioBucket });
    
    // If buckets don't exist, try to create them
    if (!hasTranscriptsBucket || !hasAudioBucket) {
      return await createStorageBuckets();
    }
    
    console.log('All required storage buckets exist ✅');
    return true;
  } catch (error) {
    console.error('Error checking storage buckets:', error);
    return await createStorageBuckets(); // Try creating as a fallback
  }
}

/**
 * Creates the required storage buckets if they don't exist
 */
async function createStorageBuckets(): Promise<boolean> {
  try {
    console.log('Creating storage buckets...');
    let success = true;
    
    // Create transcripts bucket if needed
    try {
      await supabase.storage.createBucket('transcripts', {
        public: true,
        fileSizeLimit: 5242880, // 5MB
      });
      console.log('Created transcripts bucket ✅');
    } catch (error: any) {
      // If bucket already exists, that's fine
      if (error.message && error.message.includes('already exists')) {
        console.log('Transcripts bucket already exists ✅');
      } else {
        console.error('Error creating transcripts bucket:', error);
        success = false;
      }
    }
    
    // Create interview-audio bucket if needed
    try {
      await supabase.storage.createBucket('interview-audio', {
        public: true,
        fileSizeLimit: 52428800, // 50MB
      });
      console.log('Created interview-audio bucket ✅');
    } catch (error: any) {
      // If bucket already exists, that's fine
      if (error.message && error.message.includes('already exists')) {
        console.log('Interview-audio bucket already exists ✅');
      } else {
        console.error('Error creating interview-audio bucket:', error);
        success = false;
      }
    }
    
    return success;
  } catch (error) {
    console.error('Error creating storage buckets:', error);
    toast.error('Failed to create storage buckets. Please check your Supabase permissions.');
    return false;
  }
}

/**
 * Creates the participants table in Supabase
 */
async function createParticipantsTable() {
  // This function is only for reference since we can't create tables via the Supabase JS client
  // You'll need to create the table manually in the Supabase dashboard
  
  toast.info('Please create the "participants" table in your Supabase dashboard with the following structure:', {
    duration: 8000,
  });
  
  console.info(`
    Table name: participants
    Columns:
    - id: uuid (primary key, default: gen_random_uuid())
    - email: text (not null)
    - screener_passed: boolean (default: false)
    - questionnaire_data: jsonb (default: '{}')
    - interview_unlocked: boolean (default: false)
    - unlock_code: text
    - interview_completed: boolean (default: false)
    - transcript_url: text
    - audio_url: text
    - created_at: timestamp with time zone (default: now())
  `);
  
  toast.info('After creating the table, reload this page to continue setup.', {
    duration: 5000,
  });
  
  return;
}

/**
 * Provides SQL scripts to create tables in Supabase SQL Editor
 * This is an alternative to manual table creation
 */
export function getSetupSQLScripts(): string {
  return `
-- Create participants table
CREATE TABLE participants (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL,
  screener_passed BOOLEAN DEFAULT FALSE,
  questionnaire_data JSONB DEFAULT '{}'::jsonb,
  interview_unlocked BOOLEAN DEFAULT FALSE,
  unlock_code TEXT,
  interview_completed BOOLEAN DEFAULT FALSE,
  transcript_url TEXT,
  audio_url TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Create index on email for faster lookups
CREATE UNIQUE INDEX participants_email_idx ON participants (email);

-- Set up Row Level Security (RLS)
ALTER TABLE participants ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anonymous reads but restrict writes
CREATE POLICY "Allow anonymous read access" 
ON participants FOR SELECT USING (true);

CREATE POLICY "Allow insert for new participants" 
ON participants FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow update for existing participants" 
ON participants FOR UPDATE USING (true);
`;
}

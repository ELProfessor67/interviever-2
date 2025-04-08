
import React, { useState } from 'react';
import { Button } from './ui/button';
import { Alert, AlertDescription } from './ui/alert';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Info, Loader2, CheckCircle, AlertTriangle, Mic, Play } from 'lucide-react';
import { getApiKey } from '@/services/utils/apiKeyUtils';
import { transcribeAudio } from '@/services/ai/openaiService';
import { generateSpeech, playAudioBuffer } from '@/services/ai/textToSpeechService';
import { toast } from 'sonner';
import { useAudioRecorder } from '@/hooks/useAudioRecorder';

const OpenAITester: React.FC = () => {
  const [isTestingModels, setIsTestingModels] = useState(false);
  const [modelStatus, setModelStatus] = useState<Record<string, boolean | null>>({});
  const [testLog, setTestLog] = useState<string[]>([]);
  const [testText, setTestText] = useState("This is a test of the OpenAI text-to-speech API.");
  const [currentTest, setCurrentTest] = useState('');
  
  const { isRecording, startRecording, stopRecording, audioBlob } = useAudioRecorder({
    onComplete: (blob) => {
      if (blob && blob.size > 0) {
        handleTestTranscription(blob);
      }
    }
  });

  // Test if the API key has access to required models
  const testApiModels = async () => {
    const apiKey = getApiKey('openai');
    if (!apiKey) {
      toast.error('No API key found. Please save an API key first.');
      return;
    }

    setIsTestingModels(true);
    setModelStatus({});
    setTestLog(['Starting OpenAI model access test...']);
    setCurrentTest('models');

    try {
      addLog('Testing access to OpenAI models API');
      const response = await fetch('https://api.openai.com/v1/models', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(`Failed to get models: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      addLog(`Successfully retrieved ${data.data.length} models`);

      // Check for specific models
      const requiredModels = ['tts-1', 'whisper-1', 'gpt-4o-mini'];
      const availableModels = data.data.map((m: any) => m.id);
      
      const modelResults: Record<string, boolean> = {};
      
      requiredModels.forEach(model => {
        const hasModel = availableModels.includes(model);
        modelResults[model] = hasModel;
        addLog(`Model ${model}: ${hasModel ? 'Available ✓' : 'Not available ✗'}`);
      });

      setModelStatus(modelResults);
      addLog('Model access test completed');
    } catch (error) {
      addLog(`Error: ${error instanceof Error ? error.message : String(error)}`);
      toast.error('Failed to test API model access');
    } finally {
      setIsTestingModels(false);
    }
  };

  // Test text-to-speech functionality
  const testTextToSpeech = async () => {
    setTestLog(['Starting text-to-speech test...']);
    setCurrentTest('tts');
    addLog(`Test text: "${testText}"`);

    try {
      addLog('Generating speech...');
      const audioBuffer = await generateSpeech(testText);
      
      if (!audioBuffer) {
        addLog('Failed to generate speech');
        return;
      }
      
      addLog(`Successfully generated speech (${audioBuffer.byteLength} bytes)`);
      addLog('Playing audio...');
      
      await playAudioBuffer(audioBuffer);
      addLog('Audio playback completed successfully');
    } catch (error) {
      addLog(`Error: ${error instanceof Error ? error.message : String(error)}`);
    }
  };

  // Test recording and transcription
  const handleTestTranscription = async (blob: Blob) => {
    addLog(`Recording completed (${blob.size} bytes)`);
    
    try {
      addLog('Sending audio for transcription...');
      const result = await transcribeAudio(blob);
      
      if (result.text) {
        addLog(`Transcription result: "${result.text}"`);
      } else {
        addLog('No transcription text returned');
      }
    } catch (error) {
      addLog(`Error: ${error instanceof Error ? error.message : String(error)}`);
    }
  };

  const startTestRecording = () => {
    setTestLog(['Starting transcription test...']);
    setCurrentTest('transcription');
    addLog('Recording audio...');
    startRecording();
  };

  const stopTestRecording = () => {
    addLog('Stopping recording...');
    stopRecording();
  };

  const addLog = (message: string) => {
    setTestLog(prev => [...prev, message]);
  };

  return (
    <Card className="border border-amber-200 bg-amber-50/50">
      <CardHeader>
        <CardTitle className="text-lg">OpenAI API Tester</CardTitle>
        <CardDescription>Test OpenAI API functionality directly</CardDescription>
      </CardHeader>
      <CardContent>
        <Alert className="mb-4 bg-blue-50 border-blue-200">
          <Info className="h-4 w-4" />
          <AlertDescription>
            This tool helps diagnose issues with the OpenAI API connection for speech and transcription.
          </AlertDescription>
        </Alert>

        <Tabs defaultValue="models">
          <TabsList className="mb-4">
            <TabsTrigger value="models">Test API Access</TabsTrigger>
            <TabsTrigger value="tts">Test TTS</TabsTrigger>
            <TabsTrigger value="transcription">Test Transcription</TabsTrigger>
          </TabsList>
          
          <TabsContent value="models" className="space-y-4">
            <Button 
              onClick={testApiModels} 
              disabled={isTestingModels}
            >
              {isTestingModels ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Testing...
                </>
              ) : 'Test OpenAI API Access'}
            </Button>
            
            {Object.keys(modelStatus).length > 0 && (
              <div className="mt-4 grid grid-cols-3 gap-2">
                {Object.entries(modelStatus).map(([model, available]) => (
                  <div 
                    key={model}
                    className={`p-2 rounded-md flex items-center ${
                      available ? 'bg-green-100 border border-green-200' : 'bg-red-100 border border-red-200'
                    }`}
                  >
                    {available ? (
                      <CheckCircle className="h-4 w-4 mr-2 text-green-600" />
                    ) : (
                      <AlertTriangle className="h-4 w-4 mr-2 text-red-600" />
                    )}
                    <span className="text-sm font-mono">{model}</span>
                  </div>
                ))}
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="tts" className="space-y-4">
            <textarea
              className="w-full p-2 border rounded-md"
              rows={3}
              value={testText}
              onChange={(e) => setTestText(e.target.value)}
              placeholder="Enter text to convert to speech"
            />
            <Button onClick={testTextToSpeech}>
              <Play className="mr-2 h-4 w-4" />
              Test Text-to-Speech
            </Button>
          </TabsContent>
          
          <TabsContent value="transcription" className="space-y-4">
            <div className="flex space-x-2">
              {isRecording ? (
                <Button variant="destructive" onClick={stopTestRecording}>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Stop Recording
                </Button>
              ) : (
                <Button onClick={startTestRecording}>
                  <Mic className="mr-2 h-4 w-4" />
                  Start Recording
                </Button>
              )}
            </div>
            <p className="text-sm text-gray-500">
              Speak clearly, then stop recording to test transcription.
            </p>
          </TabsContent>
        </Tabs>

        {testLog.length > 0 && currentTest && (
          <div className="mt-4">
            <h4 className="font-medium mb-2">Test Log:</h4>
            <div className="bg-black text-green-400 p-3 rounded-md font-mono text-xs h-40 overflow-y-auto">
              {testLog.map((log, i) => (
                <div key={i} className="mb-1">
                  {log}
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className="text-xs text-gray-500">
        This tester helps diagnose any issues with the OpenAI API connection.
      </CardFooter>
    </Card>
  );
};

export default OpenAITester;

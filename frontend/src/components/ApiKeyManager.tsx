
import React, { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { getApiKey, saveApiKey, clearApiKeys } from "@/services/utils/apiKeyUtils";
import { Input } from "./ui/input";
import { toast } from "sonner";
import { validateApiKey } from "@/services/ai/textToSpeechService";
import { AlertCircle, CheckCircle2, Info, Loader2, X, AlertTriangle } from "lucide-react";
import { Alert, AlertDescription } from "./ui/alert";

interface ApiKeyManagerProps {
  onApiKeyUpdate: (apiKey: string | null) => void;
}

const ApiKeyManager: React.FC<ApiKeyManagerProps> = ({ onApiKeyUpdate }) => {
  const [apiKey, setApiKey] = useState<string>("");
  const [isApiKeyValid, setIsApiKeyValid] = useState<boolean>(false);
  const [isValidating, setIsValidating] = useState<boolean>(false);
  const [validationMessage, setValidationMessage] = useState<string>("");
  const [validationAttempts, setValidationAttempts] = useState<number>(0);
  const [validationDetails, setValidationDetails] = useState<string>("");
  const [showDetails, setShowDetails] = useState<boolean>(false);

  // Check if API key exists on mount
  useEffect(() => {
    const checkApiKey = async () => {
      const storedApiKey = getApiKey("openai");
      if (storedApiKey) {
        setApiKey(storedApiKey);
        
        // Validate the stored API key
        setIsValidating(true);
        setValidationMessage("Validating stored API key...");
        try {
          console.log("API KEY MANAGER: Validating stored OpenAI API key");
          const isValid = await validateApiKey(storedApiKey);
          setIsApiKeyValid(isValid);
          if (isValid) {
            setValidationMessage("API Key is valid");
            onApiKeyUpdate(storedApiKey);
            toast.success("API Key validated successfully");
            console.log("API KEY MANAGER: API key validation successful");
          } else {
            setValidationMessage("Stored API Key is invalid. Please enter a new one.");
            setValidationDetails("Your stored API key failed validation. This might be because the key is invalid, expired, or doesn't have access to the required models (whisper-1, tts-1, gpt-4o-mini).");
            toast.error("Stored API Key is invalid. Please enter a new one.");
            console.error("API KEY MANAGER: Stored API key validation failed");
          }
        } catch (error) {
          console.error("API KEY MANAGER: API key validation error:", error);
          setValidationMessage("Failed to validate API Key. Network error.");
          setValidationDetails("A network error occurred during API key validation. Please check your internet connection and try again.");
          toast.error("Failed to validate API Key");
        } finally {
          setIsValidating(false);
        }
      }
    };
    
    checkApiKey();
  }, [onApiKeyUpdate, validationAttempts]);

  const handleSaveApiKey = async () => {
    if (!apiKey) {
      toast.error("API Key cannot be empty.");
      return;
    }
    
    if (!apiKey.startsWith('sk-')) {
      toast.error("API Key should start with 'sk-'. Please check your OpenAI API key.");
      setValidationMessage("Invalid API Key format. It should start with 'sk-'.");
      setValidationDetails("OpenAI API keys typically start with 'sk-' followed by a long string of characters. Make sure you're using the correct format from your OpenAI account.");
      return;
    }
    
    setIsValidating(true);
    setValidationMessage("Validating API key...");
    try {
      console.log("API KEY MANAGER: Attempting to validate new API key...");
      // Validate the API key
      const isValid = await validateApiKey(apiKey);
      
      if (isValid) {
        saveApiKey("openai", apiKey);
        setIsApiKeyValid(true);
        setValidationMessage("API Key is valid");
        setValidationDetails("Your API key has been validated and saved. It has access to the required models.");
        onApiKeyUpdate(apiKey);
        toast.success("API Key saved and validated successfully!");
        console.log("API KEY MANAGER: API key saved and validated successfully");
      } else {
        setValidationMessage("Invalid API Key. Please check and try again.");
        setValidationDetails("Your API key failed validation. This might be because the key is invalid, expired, or doesn't have access to the required models (whisper-1, tts-1, gpt-4o-mini).");
        toast.error("Invalid API Key. Please check and try again.");
        console.error("API KEY MANAGER: API key validation failed");
      }
    } catch (error) {
      console.error("API KEY MANAGER: API key validation error:", error);
      setValidationMessage("Failed to validate API Key. Network error.");
      setValidationDetails("A network error occurred during API key validation. Please check your internet connection and try again.");
      toast.error("Failed to validate API Key. Please try again.");
    } finally {
      setIsValidating(false);
    }
  };

  const handleClearApiKey = () => {
    clearApiKeys();
    setApiKey("");
    setIsApiKeyValid(false);
    setValidationMessage("");
    setValidationDetails("");
    onApiKeyUpdate(null);
    toast.success("API Key cleared successfully!");
  };

  const retryValidation = () => {
    setValidationAttempts(prev => prev + 1);
  };

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  const isStructurallyValidKey = apiKey.startsWith('sk-') && apiKey.length > 10;

  return (
    <div className="space-y-4">
      <Alert className="bg-muted">
        <Info className="h-4 w-4" />
        <AlertDescription>
          You need an OpenAI API key with access to speech models (tts-1 and whisper-1) and GPT-4o Mini.
        </AlertDescription>
      </Alert>
      
      <div className="flex items-center space-x-2">
        <Input
          type="password"
          placeholder="Enter your OpenAI API Key"
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
          disabled={isApiKeyValid || isValidating}
          className={isStructurallyValidKey ? "border-green-400" : ""}
        />
        <Button 
          onClick={handleSaveApiKey} 
          disabled={isApiKeyValid || isValidating || !apiKey}
        >
          {isValidating ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Validating...
            </>
          ) : "Save API Key"}
        </Button>
      </div>
      
      {validationMessage && (
        <div className="space-y-2">
          <div className={`flex items-center justify-between ${isApiKeyValid ? "text-green-500" : "text-amber-500"}`}>
            <div className="flex items-center">
              {isApiKeyValid ? (
                <CheckCircle2 className="h-4 w-4 mr-2" />
              ) : isValidating ? (
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              ) : (
                <AlertCircle className="h-4 w-4 mr-2" />
              )}
              {validationMessage}
            </div>
            
            <div className="flex items-center space-x-2">
              {!isApiKeyValid && !isValidating && validationMessage.includes("Failed") && (
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={retryValidation} 
                  className="text-xs"
                >
                  Retry
                </Button>
              )}
              
              {validationDetails && (
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={toggleDetails} 
                  className="text-xs"
                >
                  {showDetails ? "Hide Details" : "Show Details"}
                </Button>
              )}
            </div>
          </div>
          
          {showDetails && validationDetails && (
            <Alert className={isApiKeyValid ? "bg-green-50 border-green-200" : "bg-amber-50 border-amber-200"}>
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription className="text-xs">
                {validationDetails}
              </AlertDescription>
            </Alert>
          )}
        </div>
      )}
      
      <div className="text-sm text-gray-400 mt-1">
        Your API key should start with "sk-" and must have access to OpenAI's audio models (whisper-1, tts-1) and chat models (gpt-4o-mini).
      </div>
      
      {isApiKeyValid && (
        <Button variant="destructive" onClick={handleClearApiKey}>
          Clear API Key
        </Button>
      )}
    </div>
  );
};

export default ApiKeyManager;


// This file contains utility functions for working with API keys

// Store an API key in local storage
export const setApiKey = (service: string, key: string): void => {
  const keys = getApiKeys();
  keys[service] = key;
  localStorage.setItem('apiKeys', JSON.stringify(keys));
};

// Get all API keys from local storage
export const getApiKeys = (): Record<string, string> => {
  const keys = localStorage.getItem('apiKeys');
  return keys ? JSON.parse(keys) : {};
};

// Get a specific API key from local storage
export const getApiKey = (service: string): string | null => {
  const keys = getApiKeys();
  return keys[service] || null;
};

// Remove an API key from local storage
export const removeApiKey = (service: string): void => {
  const keys = getApiKeys();
  delete keys[service];
  localStorage.setItem('apiKeys', JSON.stringify(keys));
};

// Clear all API keys from local storage
export const clearApiKeys = (): void => {
  localStorage.removeItem('apiKeys');
};

// For backward compatibility
export const saveApiKey = setApiKey;

import { useState } from 'react';

import { createGreenApi } from './api/greenApi';
import type { GreenApiCredentials } from './api/types';
import { AuthForm } from './components/AuthForm/AuthForm';

export const App = () => {
  const [credentials, setCredentials] =
    useState<GreenApiCredentials | null>(null);

  const [isLoading, setIsLoading] =
    useState(false);

  const [error, setError] =
    useState<string | null>(null);

  const handleLogin = async (
    newCredentials: GreenApiCredentials,
  ) => {
    setIsLoading(true);
    setError(null);

    try {
      const api = createGreenApi(newCredentials);

      const { stateInstance } =
        await api.getStateInstance();

      if (stateInstance !== 'authorized') {
        setError(`Instance is not authorized: ${stateInstance}`);

        return;
      }

      setCredentials(newCredentials);
    } catch {
      setError('Failed to connect to GREEN-API. Check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  if (!credentials) {
    return (
      <AuthForm
        onSubmit={handleLogin}
        isLoading={isLoading}
        error={error}
      />
    );
  }

  return (
    <main>
      <h1>Chat</h1>
    </main>
  );
};
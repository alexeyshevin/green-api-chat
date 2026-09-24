import { useState } from 'react';
import type { GreenApiCredentials } from './api/types';
import { AuthForm } from './components/AuthForm/AuthForm';

export const App = () => {
  const [credentials, setCredentials] =
    useState<GreenApiCredentials | null>(null);

  if (!credentials) {
    return (
      <AuthForm
        onSubmit={setCredentials}
      />
    );
  }

  return (
    <main>
      <h1>Chat</h1>

      <p>
        Instance: {credentials.idInstance}
      </p>
    </main>
  );
};
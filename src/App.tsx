import { useMemo, useState } from 'react';
import { createGreenApi } from './api/greenApi';
import type { GreenApiCredentials } from './api/types';
import { AuthForm } from './components/AuthForm/AuthForm';
import { Chat } from './components/Chat/Chat';
import { CreateChatForm } from './components/CreateChatForm/CreateChatForm';
import type { Chat as ChatType } from './types/chat';
import type { Message } from './types/message';

const App = () => {
  const [credentials, setCredentials] = useState<GreenApiCredentials | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [chat, setChat] = useState<ChatType | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isCreatingChat, setIsCreatingChat] = useState(false);
  const [createChatError, setCreateChatError] = useState<string | null>(null);

  const api = useMemo(() => {
    if (!credentials) {
      return null;
    }

    return createGreenApi(credentials);
  }, [credentials]);

  const handleLogin = async (newCredentials: GreenApiCredentials) => {
    setIsLoading(true);
    setError(null);

    try {
      const loginApi = createGreenApi(newCredentials);

      const { stateInstance } =
        await loginApi.getStateInstance();

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

  const handleCreateChat = async (contact: string) => {
    if (!api) {
      return;
    }

    setIsCreatingChat(true);
    setCreateChatError(null);

    try {
      const result = await api.checkAccount(contact);

      if (!result.exist || !result.chatId) {
        setCreateChatError('Telegram account was not found.');

        return;
      }

      setChat({
        chatId: result.chatId,
        contact
      });
    } catch {
      setCreateChatError('Failed to find Telegram account.');
    } finally {
      setIsCreatingChat(false);
    }
  };

  const handleSendMessage = async (text: string) => {
    if (!api || !chat) {
      return;
    }

    const normalizedText = text.trim();

    if (!normalizedText) {
      return;
    }

    const { idMessage } = await api.sendMessage({
      chatId: chat.chatId,
      message: normalizedText,
    });

    const newMessage: Message = {
      id: idMessage,
      text: normalizedText,
      direction: 'outgoing',
      timestamp: Date.now(),
    };

    setMessages((prev) => [
      ...prev,
      newMessage,
    ]);
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

  if (!chat) {
    return (
      <CreateChatForm
        onSubmit={handleCreateChat}
        isLoading={isCreatingChat}
        error={createChatError}
      />
    );
  }

  return (
    <Chat
      chat={chat}
      messages={messages}
      onSendMessage={handleSendMessage}
    />
  );
};

export default App;
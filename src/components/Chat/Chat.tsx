import type { Chat as ChatType } from '../../types/chat';
import type { Message } from '../../types/message';
import './Chat.css';
import { MessageInput } from './MessageInput/MessageInput';
import { MessageList } from './MessageList/MessageList';

type Props = {
  chat: ChatType;
  messages: Message[];
  onSendMessage: (text: string) => Promise<void>;
};

export const Chat = ({ chat, messages, onSendMessage }: Props) => {
  return (
    <section className="chat">
      <header className="chat__header">
        <h2>{chat.contact}</h2>
      </header>

      <MessageList messages={messages} />

      <MessageInput
        onSend={onSendMessage}
      />
    </section>
  );
};
import type { Message } from '../../../types/message';
import './MessageList.css';

type Props = {
  messages: Message[];
};

export const MessageList = ({ messages }: Props) => {
  return (
    <div className="message-list">
      {messages.map((message) => (
        <div
          key={message.id}
          className={`message message--${message.direction}`}
        >
          <p>{message.text}</p>

          <time>
            {new Date(
              message.timestamp,
            ).toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
            })}
          </time>
        </div>
      ))}
    </div>
  );
};
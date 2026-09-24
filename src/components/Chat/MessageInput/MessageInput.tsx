import {
    type ChangeEvent,
    type SyntheticEvent,
    useState,
} from 'react';

type Props = {
  onSend: (text: string) => Promise<void>;
};

export const MessageInput = ({ onSend }: Props) => {
  const [text, setText] = useState('');
  const [isSending, setIsSending] = useState(false);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  };

  const handleSubmit = async (event: SyntheticEvent<HTMLFormElement, SubmitEvent>) => {
    event.preventDefault();

    const normalizedText = text.trim();

    if (!normalizedText || isSending) {
      return;
    }

    setIsSending(true);

    try {
      await onSend(normalizedText);

      setText('');
    } finally {
      setIsSending(false);
    }
  };

  return (
    <form
      className="message-input"
      onSubmit={handleSubmit}
    >
      <input
        value={text}
        onChange={handleChange}
        placeholder="Message"
        disabled={isSending}
      />

      <button
        type="submit"
        disabled={!text.trim() || isSending}
      >
        Send
      </button>
    </form>
  );
};
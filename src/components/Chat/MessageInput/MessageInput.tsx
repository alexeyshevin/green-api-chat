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
  const [error, setError] = useState<string | null>(null);

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
    setError(null);

    try {
        await onSend(normalizedText);

        setText('');
    } catch {
        setError('Failed to send message.');
    } finally {
        setIsSending(false);
    }
  };

  return (
    <>
        {error && (
            <p className="message-input__error">
                {error}
            </p>
        )}

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
            {isSending ? 'Sending...' : 'Send'}
        </button>
        </form>
    </>
  );
};
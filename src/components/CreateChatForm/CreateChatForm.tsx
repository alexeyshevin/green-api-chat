import {
  type ChangeEvent,
  type SyntheticEvent,
  useState,
} from 'react';
import './CreateChatForm.css';

type Props = {
  onSubmit: (contact: string) => Promise<void>;
  isLoading: boolean;
  error: string | null;
};

export const CreateChatForm = ({ onSubmit, isLoading, error }: Props) => {
  const [contact, setContact] = useState('');

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setContact(event.target.value);
  };

  const handleSubmit = async (event: SyntheticEvent<HTMLFormElement, SubmitEvent>) => {
    event.preventDefault();

    const normalizedContact = contact.trim();

    if (!normalizedContact) {
      return;
    }

    await onSubmit(normalizedContact);
  };

  return (
    <form
      className="create-chat-form"
      onSubmit={handleSubmit}
    >
      <h2>Start new chat</h2>

      <label>
        Phone number or username

        <input
          value={contact}
          onChange={handleChange}
          placeholder="+79991234567 or @username"
          autoComplete="off"
          disabled={isLoading}
        />
      </label>

      {error && (
        <p className="create-chat-form__error">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={isLoading || !contact.trim()}
      >
        {isLoading ? 'Searching...' : 'Start chat'}
      </button>
    </form>
  );
};
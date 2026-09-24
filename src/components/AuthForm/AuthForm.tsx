import {
    type ChangeEvent,
    type SyntheticEvent,
    useState,
} from 'react';
import type { GreenApiCredentials } from '../../api/types';
import './AuthForm.css';

type Props = {
  onSubmit: (credentials: GreenApiCredentials) => void;
  isLoading: boolean;
  error: string | null;
};

export const AuthForm = ({ onSubmit, isLoading, error }: Props) => {
  const [credentials, setCredentials] = useState<GreenApiCredentials>({ idInstance: '', apiTokenInstance: '' });

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setCredentials((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: SyntheticEvent<HTMLFormElement, SubmitEvent>) => {
    event.preventDefault();

    const idInstance = credentials.idInstance.trim();
    const apiTokenInstance =
        credentials.apiTokenInstance.trim();

    if (!idInstance || !apiTokenInstance) {
        return;
    }

    await onSubmit({
        idInstance,
        apiTokenInstance,
    });
  };

  return (
    <form
      className="auth-form"
      onSubmit={handleSubmit}
    >
      <h1>GREEN-API Chat</h1>

      <label>
        ID Instance

        <input
          name="idInstance"
          value={credentials.idInstance}
          onChange={handleChange}
          placeholder="Enter ID Instance"
          autoComplete="off"
        />
      </label>

      <label>
        API Token Instance

        <input
          name="apiTokenInstance"
          type="password"
          value={credentials.apiTokenInstance}
          onChange={handleChange}
          placeholder="Enter API Token Instance"
          autoComplete="off"
        />
      </label>

        {error && (
            <p className="auth-form__error">
                {error}
            </p>
        )}

        <button
            type="submit"
            disabled={isLoading}
        >
            {isLoading ? 'Connecting...' : 'Sign in'}
        </button>
    </form>
  );
};
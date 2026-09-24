import {
    type ChangeEvent,
    type FormEvent,
    useState,
} from 'react';

import type { GreenApiCredentials } from '../../api/types';

import './AuthForm.css';

type Props = {
  onSubmit: (credentials: GreenApiCredentials) => void;
};

export const AuthForm = ({ onSubmit }: Props) => {
  const [credentials, setCredentials] = useState<GreenApiCredentials>({ idInstance: '', apiTokenInstance: '' });

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setCredentials((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const idInstance = credentials.idInstance.trim();
    const apiTokenInstance =
      credentials.apiTokenInstance.trim();

    if (!idInstance || !apiTokenInstance) {
      return;
    }

    onSubmit({
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

      <button type="submit">
        Sign in
      </button>
    </form>
  );
};
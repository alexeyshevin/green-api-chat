import type {
    DeleteNotificationResponse,
    GreenApiCredentials,
    GreenApiNotification,
    SendMessageRequest,
    SendMessageResponse,
} from './types';

export const createGreenApi = ({
  idInstance,
  apiTokenInstance,
}: GreenApiCredentials) => {
  const baseUrl =
    `https://api.green-api.com/waInstance${idInstance}`;

  const sendMessage = async (
    data: SendMessageRequest,
  ): Promise<SendMessageResponse> => {
    const response = await fetch(
      `${baseUrl}/sendMessage/${apiTokenInstance}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      },
    );

    if (!response.ok) {
      throw new Error(
        `Failed to send message: ${response.status}`,
      );
    }

    return response.json();
  };

  const receiveNotification =
    async (): Promise<GreenApiNotification | null> => {
      const response = await fetch(
        `${baseUrl}/receiveNotification/${apiTokenInstance}?receiveTimeout=5`,
      );

      if (!response.ok) {
        throw new Error(
          `Failed to receive notification: ${response.status}`,
        );
      }

      if (response.status === 204) {
        return null;
      }

      const text = await response.text();

      if (!text) {
        return null;
      }

      return JSON.parse(text) as GreenApiNotification;
    };

  const deleteNotification = async (
    receiptId: number,
  ): Promise<DeleteNotificationResponse> => {
    const response = await fetch(
      `${baseUrl}/deleteNotification/${apiTokenInstance}/${receiptId}`,
      {
        method: 'DELETE',
      },
    );

    if (!response.ok) {
      throw new Error(
        `Failed to delete notification: ${response.status}`,
      );
    }

    return response.json();
  };

  return {
    sendMessage,
    receiveNotification,
    deleteNotification,
  };
};
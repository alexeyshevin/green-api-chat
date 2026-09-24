import type {
    IncomingMessageBody,
    UnknownNotificationBody,
} from './types';

export const isIncomingTextMessage = (
  body: UnknownNotificationBody,
): body is IncomingMessageBody => {
  if (
    body.typeWebhook !== 'incomingMessageReceived' ||
    typeof body.messageData !== 'object' ||
    body.messageData === null
  ) {
    return false;
  }

  const messageData = body.messageData as Record<string, unknown>;

  return (
    messageData.typeMessage === 'textMessage' &&
    typeof messageData.textMessageData === 'object' &&
    messageData.textMessageData !== null
  );
};
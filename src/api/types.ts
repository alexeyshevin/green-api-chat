export type GreenApiCredentials = {
  idInstance: string;
  apiTokenInstance: string;
};

export type SendMessageRequest = {
  chatId: string;
  message: string;
};

export type SendMessageResponse = {
  idMessage: string;
};

export type TelegramTextMessageData = {
  typeMessage: 'textMessage';
  textMessageData: {
    textMessage: string;
  };
};

export type TelegramSenderData = {
  chatId: string;
  chatName: string;
  sender: string;
  senderName: string;
  senderContactName: string;
  senderPhoneNumber?: number;
};

export type IncomingMessageBody = {
  typeWebhook: 'incomingMessageReceived';
  timestamp: number;
  idMessage: string;
  senderData: TelegramSenderData;
  messageData: TelegramTextMessageData;
};

export type DeleteNotificationResponse = {
  result: boolean;
  reason?: string;
};

export type UnknownNotificationBody = {
  typeWebhook: string;
  [key: string]: unknown;
};

export type GreenApiNotification = {
  receiptId: number;
  body: UnknownNotificationBody;
};
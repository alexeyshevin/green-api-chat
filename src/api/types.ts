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
  chatType: 'user' | 'group' | 'supergroup' | 'channel' | 'bot';
  sender: string;
  chatName: string;
  senderName: string;
  senderType: 'user' | 'group' | 'supergroup' | 'channel' | 'bot';
  senderContactName: string;
  senderPhoneNumber: number;
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

export type CheckAccountResponse = {
  exist: boolean;
  chatId?: string;
  username?: string;
  phoneNumber?: number;
  fromCache?: boolean;
};
export type MessageDirection =
  | 'incoming'
  | 'outgoing';

export type Message = {
  id: string;
  text: string;
  direction: MessageDirection;
  timestamp: number;
};
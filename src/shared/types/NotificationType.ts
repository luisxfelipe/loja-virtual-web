export type NotificationEnum = 'success' | 'error' | 'info' | 'warning';

export interface NotificationType {
  message: string;
  type: NotificationEnum;
  description?: string;
}

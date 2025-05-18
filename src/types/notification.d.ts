export type Notification = {
  id: string;
  createdAt: string;
  isRead: boolean;
  notificationType: 'like' | 'comment';
  author: {
    fullName: string;
    image?: string;
  };
  comment?: string;
  postId: string;
};

export interface CreateNotificationParams {
  notificationType: 'like' | 'comment';
  notificationTypeId: string;
  userId: string;
  postId: string;
}

export interface RawNotification {
  _id: string;
  createdAt: string;
  seen: boolean;
  post: string;
  channel: string;
  comment?: string;
  author?: {
    fullName?: string;
    image?: string;
  };
}

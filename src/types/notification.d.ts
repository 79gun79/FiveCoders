export type Comment = {
  id: string;
  comment: string;
  authorId: string;
  createdAt: string;
};

export type Notification = {
  id: string;
  createdAt: string;
  isRead: boolean;
  notificationType: 'like' | 'comment';
  postId: string;
  channelId: string;
  author: {
    fullName: string;
    image?: string;
  };
  comment: Comment;
};

export interface CreateNotificationParams {
  notificationType: 'like' | 'comment';
  notificationTypeId: string;
  userId: string;
  postId: string;
  comment?: string;
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

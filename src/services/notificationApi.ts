import { client } from './axios';
import { comment } from '../types/comment';
import {
  Notification,
  RawNotification,
  CreateNotificationParams,
} from '../types/notification';

export const fetchNotifications = async (): Promise<Notification[]> => {
  const { data } = await client.get<RawNotification[]>('/notifications');
  return data.map((item) => ({
    id: item._id,
    createdAt: item.createdAt,
    isRead: !item.seen ? false : true,
    postId: item.post,
    channelId: item.channel,
    comment: item.comment ?? '',
    notificationType: item.comment ? 'comment' : 'like',
    author: {
      fullName: item.author?.fullName ?? '',
      image: item.author?.image,
    },
  }));
};

export const createNotification = async (
  params: CreateNotificationParams,
): Promise<Notification> => {
  const { data } = await client.post('/notifications/create', params);
  return {
    id: data._id,
    createdAt: data.createdAt,
    isRead: !data.seen ? false : true,
    postId: data.post,
    channelId: data.channel,
    comment: data.comment ?? '',
    notificationType: data.notificationType,
    author: {
      fullName: data.author?.fullName ?? '',
      image: data.author?.image,
    },
  };
};

export const seenNotifications = async (): Promise<Notification[]> => {
  const { data } = await client.put('/notifications/seen');
  return data;
};

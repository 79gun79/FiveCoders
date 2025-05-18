import { Follow } from './follow';

export type User = {
  coverImage: string; // 커버 이미지
  image: string; // 프로필 이미지
  role: string;
  emailVerified: boolean; // 사용되지 않음
  banned: boolean; // 사용되지 않음
  isOnline: boolean;
  posts: Post[];
  likes: Like[];
  comments: CommentType[];
  followers: [];
  following: Follow[];
  notifications: [];
  messages: [];
  _id: string;
  fullName: string;
  email: string;
  createdAt: string;
  updatedAt: string;
};

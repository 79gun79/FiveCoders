import { create } from 'zustand';
import { postsData } from '../data/postsData';
import { commentsData } from '../data/commentsData';
import placeholderIcon from '../assets/channelImg.svg';
import { Channel } from '../types/channel';

export const usePostStore = create<
  Channel & {
    createPost: (newPost: string) => void;
  } & {
    deletePost: (id: number) => void;
  }
>((set) => ({
  _id: '1',
  name: 'FC온라인',
  description: '슈팅',
  authRequired: false,
  posts: postsData,
  createdAt: '',
  updatedAt: '',
  __v: 0,
  imageUrl: '/channelImages/fc_online.jpg',

  createPost: (newPost: string) =>
    set((state) => {
      const nextId = state.posts.length + 1;
      const newItem: PostType = {
        postId: nextId,
        image: placeholderIcon,
        coverImage: placeholderIcon,
        content: newPost,
        userName: '익명',
        comments: commentsData,
      };
      return {
        posts: [...state.posts, newItem],
      };
    }),

  deletePost: (id: number) =>
    set((state) => ({
      posts: state.posts.filter((post) => post.postId !== id),
    })),
}));

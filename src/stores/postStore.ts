import { create } from 'zustand';
import { postsData } from '../data/postsData';
import { commentsData } from '../data/commentsData';
import { dummyChannels } from '../data/dummyChannels';
import placeholderIcon from '../assets/channelImg.svg';

export const usePostStore = create<PostStore>((set) => ({
  allPosts: dummyChannels.reduce(
    (acc, cur) => {
      acc[cur._id] = [...postsData];
      return acc;
    },
    {} as Record<string, Post[]>,
  ),

  createPost: (channelId: string, newPost: string) =>
    set((state) => {
      const nextId = String(state.allPosts[channelId]?.length + 1);
      const newItem: Post = {
        _id: nextId,
        image: placeholderIcon,
        imagePublicId: '',
        title: newPost,
        channel: '',
        author: '익명',
        createdAt: '',
        updatedAt: '',
        likes: [],
        comments: commentsData,
      };
      return {
        allPosts: {
          ...state.allPosts,
          [channelId]: [...(state.allPosts[channelId] || []), newItem],
        },
      };
    }),

  deletePost: (channelId: string, id: string) =>
    set((state) => ({
      allPosts: {
        ...state.allPosts,
        [channelId]: state.allPosts[channelId].filter((v) => v._id !== id),
      },
    })),
}));

import { create } from 'zustand';
import { postsData } from '../data/postsData';
import { commentsData } from '../data/commentsData';
import placeholderIcon from '../assets/channelImg.svg';
import { dummyChannels } from '../data/dummyChannels';

export const usePostStore = create<PostStore>((set) => ({
  allPosts: dummyChannels.reduce(
    (acc, cur) => {
      acc[cur._id] = [...postsData];
      return acc;
    },
    {} as Record<string, PostType[]>,
  ),

  createPost: (channelId: string, newPost: string) =>
    set((state) => {
      const nextId = state.allPosts[channelId]?.length + 1;
      const newItem: PostType = {
        postId: nextId,
        image: '',
        coverImage: placeholderIcon,
        content: newPost,
        userName: '익명',
        comments: commentsData,
      };
      return {
        allPosts: {
          ...state.allPosts,
          [channelId]: [...(state.allPosts[channelId] || []), newItem],
        },
      };
    }),

  deletePost: (channelId: string, id: number) =>
    set((state) => ({
      allPosts: {
        ...state.allPosts,
        [channelId]: state.allPosts[channelId].filter((v) => v.postId !== id),
      },
    })),
}));

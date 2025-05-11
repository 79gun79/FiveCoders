import { create } from 'zustand';
import { postsData } from '../data/postsData';
import { commentsData } from '../data/commentsData';
import placeholderIcon from '../assets/channelImg.svg';

export const usePostStore = create<PostStore>((set) => ({
  allPosts: {},

  loadPosts: (channelId: string) =>
    set((state) => {
      if (!state.allPosts[channelId]) {
        // 기존에 로딩된 적이 없으면 초기값 설정
        return {
          allPosts: {
            ...state.allPosts,
            [channelId]: postsData,
          },
        };
      }
      return state;
    }),

  createPost: (channelId: string, newPost: string) =>
    set((state) => {
      const nextId = state.allPosts[channelId].length + 1;
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

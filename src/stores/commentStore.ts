import { create } from 'zustand';
import { commentsData } from '../data/commentsData';
import placeholderIcon from '../assets/channelImg.svg';

export const useCommentStore = create<{
  comments: CommentType[];
  addComment: (newComment: string) => void;
  deleteComment: (id: number) => void;
}>((set) => ({
  comments: commentsData,

  addComment: (newComment: string) =>
    set((state) => {
      const nextId = state.comments.length + 1;
      const newItem: CommentType = {
        commentId: nextId,
        comment: newComment,
        coverImage: placeholderIcon,
        userName: '익명',
      };
      return {
        comments: [...state.comments, newItem],
      };
    }),

  deleteComment: (id: number) =>
    set((state) => ({
      comments: state.comments.filter((comment) => comment.commentId !== id),
    })),
}));

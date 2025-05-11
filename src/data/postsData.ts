import { commentsData } from '../data/commentsData';
import placeholderIcon from '../assets/channelImg.svg';

export const postsData: PostType[] = [
  {
    postId: 1,
    image: placeholderIcon,
    coverImage: placeholderIcon,
    content: '안녕하세요! 환영합니다',
    userName: '운영자',
    comments: commentsData,
  },
];
// 각 채널에 들어갈 게시글 정보

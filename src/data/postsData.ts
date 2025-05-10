import { commentsData } from '../data/commentsData';
import placeholderIcon from '../assets/channelImg.svg';

export const postsData: PostType[] = [
  {
    postId: 1,
    image: placeholderIcon,
    coverImage: placeholderIcon,
    content: '골키퍼 AI 또 너프 먹은 것 같지 않음?',
    userName: '피파의노예',
    comments: commentsData,
  },
  {
    postId: 2,
    image: placeholderIcon,
    coverImage: placeholderIcon,
    content: '골키퍼 AI 또 너프 먹은 것 같지 않음??',
    userName: '코리아음바페',
    comments: commentsData,
  },
  {
    postId: 3,
    image: placeholderIcon,
    coverImage: placeholderIcon,
    content: '골키퍼 AI 또 너프 먹은 것 같지 않음?!',
    userName: '반박불가',
    comments: commentsData,
  },
];
// 각 채널에 들어갈 게시글 정보

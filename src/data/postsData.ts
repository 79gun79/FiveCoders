import { commentsData } from '../data/commentsData';
import placeholderIcon from '../assets/channelImg.svg';

export const postsData: PostType[] = [
  {
    postId: 1,
    image: '',
    coverImage: placeholderIcon,
    content:
      '안녕하세요. 운영자 GM입니다!<p>반갑습니다. 운영자 입니다!</p><p>겜뮤에 오신 것을 환영합니다!</p>',
    userName: '운영자',
    comments: commentsData,
  },
];
// 각 채널에 들어갈 게시글 정보

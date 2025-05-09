//구독한 채널 불러오기
//구독한 채널의 id를 가져옴
export function getSubscribedChannels(): string[] {
  const data = localStorage.getItem('subscribedChannels');
  return data ? JSON.parse(data) : [];
}

//구독한 채널 저장하기
//문자열(id)를 local에 저장
export function setSubscribedChannels(channels: string[]) {
  localStorage.setItem('subscribedChannels', JSON.stringify(channels));
}

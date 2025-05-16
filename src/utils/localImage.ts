export const getImagePreview = (channelId: string): string | null => {
  const imagePreview = localStorage.getItem(`imagePreview_${channelId}`);
  return imagePreview ? imagePreview : null;
};

export const setImagePreview = (
  channelId: string,
  imagePreview: string,
): void => {
  localStorage.setItem(`imagePreview_${channelId}`, imagePreview);
};

export const blobToBase64 = (blob: Blob): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64data = reader.result as string;
      resolve(base64data);
    };
    reader.onerror = () => {
      reject(new Error('파일을 Base64로 변환할 수 없습니다.'));
    };
    reader.readAsDataURL(blob);
  });
};

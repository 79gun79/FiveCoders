import { useState } from 'react';
import { createChannel } from '../services/channelApi';
import { setImagePreview } from '../utils/localImage';
import type { Channel } from '../types/channel';
import { customToast } from '../utils/customToast';
import { blobToBase64 } from '../utils/imageConverter';

interface CreateChannelFormProps {
  onClose: () => void;
  onCreate: (channel: Channel, imagePreview: string | null) => void;
}

export default function CreateChannelForm({
  onClose,
  onCreate,
}: CreateChannelFormProps) {
  const [channelName, setChannelName] = useState('');
  const [channelDescription, setChannelDescription] = useState('');
  const [, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreviewState] = useState<string | null>(null);
  const [imageFileName, setImageFileName] = useState<string>('');

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    if (file) {
      setImageFile(file);
      setImageFileName(file.name);

      const base64Image = await blobToBase64(file);
      setImagePreviewState(base64Image);
    } else {
      setImageFileName('');
      setImagePreviewState(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!channelName.trim() || !channelDescription.trim()) {
      customToast('채널 설명과 이름을 입력해주세요', 'error');
      return;
    }

    try {
      const newChannel = await createChannel({
        name: channelName,
        description: channelDescription,
        authRequired: true,
      });

      if (imagePreview) {
        setImagePreview(newChannel._id, imagePreview);
      }

      onCreate(newChannel, imagePreview);
      onClose();
    } catch (error) {
      console.error('채널 생성 실패:', error);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-lg rounded-lg bg-[var(--color-bg-white)] p-8 shadow-lg">
        <h1 className="mb-6 text-2xl font-semibold text-[var(--color-text-black)]">
          새 채널 생성하기
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="channelDescription"
              className="block text-base font-medium text-[var(--color-gray7)]"
            >
              채널 설명
            </label>
            <input
              id="channelDescription"
              type="text"
              value={channelDescription}
              onChange={(e) => setChannelDescription(e.target.value)}
              className="mt-2 block w-full rounded-md border border-[var(--color-gray3)] p-3 shadow-sm focus:border-[var(--color-main)] focus:ring-0 focus:ring-[var(--color-main)] focus:outline-none sm:text-sm"
              placeholder="예: FPS, RPG, 등"
            />
          </div>
          <div>
            <label
              htmlFor="channelName"
              className="block text-base font-medium text-[var(--color-gray7)]"
            >
              채널 이름
            </label>
            <input
              id="channelName"
              type="text"
              value={channelName}
              onChange={(e) => setChannelName(e.target.value)}
              className="mt-2 block w-full rounded-md border border-[var(--color-gray3)] p-3 shadow-sm focus:border-[var(--color-main)] focus:ring-0 focus:ring-[var(--color-main)] focus:outline-none sm:text-sm"
              placeholder="예: 오버워치, 리그오브레전드, 등"
            />
          </div>
          <div>
            <label className="mb-2 block text-base font-medium text-[var(--color-gray7)]">
              채널 대표 이미지
            </label>
            <div className="relative flex items-center justify-between rounded-md border border-[var(--color-gray3)] p-3 shadow-sm">
              <span className="truncate text-sm text-[var(--color-gray6)]">
                {imageFileName || '선택된 파일이 없습니다'}
              </span>
              <label
                htmlFor="bannerImage"
                className="cursor-pointer rounded-md border border-[var(--color-main)] bg-[var(--color-bg-white)] px-3 py-1 text-sm text-[var(--color-main)] transition hover:bg-[var(--color-main)] hover:text-[var(--color-bg-white)]"
              >
                파일 선택
              </label>
              <input
                id="bannerImage"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </div>
            {imagePreview && (
              <div className="mt-4">
                <img
                  src={imagePreview}
                  alt="Banner Preview"
                  className="h-36 w-full rounded-md object-cover"
                />
              </div>
            )}
          </div>
          <div className="flex gap-4">
            <button
              type="button"
              onClick={onClose}
              className="w-full cursor-pointer rounded-md bg-[var(--color-gray4)] py-3 text-[var(--color-bg-white)] hover:bg-[var(--color-gray6)]"
            >
              취소
            </button>
            <button
              type="submit"
              className="w-full cursor-pointer rounded-md bg-[var(--color-main)] py-3 text-[var(--color-bg-white)] hover:bg-[var(--color-sub)]"
            >
              생성하기
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

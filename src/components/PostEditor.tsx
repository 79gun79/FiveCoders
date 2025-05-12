import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import { useEffect, useState } from 'react';

interface PostEditorProps {
  className?: string;
  value?: string;
  onChange: (value: string) => void;
}

export default function PostEditor({
  className,
  value,
  onChange,
}: PostEditorProps) {
  const [isFocused, setIsFocused] = useState(false);
  const modules = {
    toolbar: {
      container: [
        ['bold', 'italic', 'strike', 'underline', 'image'],
        [
          {
            color: [
              'red',
              'orange',
              'yellow',
              'green',
              'blue',
              'purple',
              'pink',
              'brown',
              'black',
            ],
          },
        ],
      ],
    },
  };
  useEffect(() => {
    const editor = document.querySelector('.ql-editor');
    const toolbar = document.querySelector('.ql-toolbar');
    const container = document.querySelector('.ql-container');

    editor?.classList.add(
      'min-w-[656px]',
      'min-h-[419px]',
      'p-4',
      'textBasic',
      'text-[var(--color-text-black)]',
      'leading-[1.5]',
    );

    editor?.setAttribute('data-placeholder', '내용을 입력하세요');

    toolbar?.classList.add(
      'rounded-t-xl',
      'border-[var(--color-gray4)]',
      'bg-white',
    );

    container?.classList.add('rounded-b-xl', 'border-[var(--color-gray4)]');
  }, [value]);
  return (
    <>
      <div
        className={`rounded-xl transition-all ${
          isFocused ? 'commentBorder' : ''
        }`}
      >
        <ReactQuill
          theme="snow"
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={className}
          value={value}
          onChange={onChange}
          modules={modules}
        />
      </div>
    </>
  );
}

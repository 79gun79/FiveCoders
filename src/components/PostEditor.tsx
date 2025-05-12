import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';

interface PostEditorProps {
  ref?: ReactQuill | null;
  className?: string;
  value?: string;
  onChange: (value: string) => void;
}

const PostEditor = forwardRef<ReactQuill, PostEditorProps>(
  ({ className, value, onChange }, ref) => {
    const [isFocused, setIsFocused] = useState(false);

    const quillRef = useRef<ReactQuill>(null);
    useImperativeHandle(ref, () => quillRef.current!, []);

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
            ref={quillRef}
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
  },
);
export default PostEditor;

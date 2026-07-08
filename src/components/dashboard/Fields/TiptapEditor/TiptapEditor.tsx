'use client';

import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import Placeholder from '@tiptap/extension-placeholder';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { Bold, Italic, List, ListOrdered, Strikethrough } from 'lucide-react';
import { useEffect } from 'react';
import { Control, FieldValues, Path, useController } from 'react-hook-form';

interface TiptapEditorProps<T extends FieldValues> {
  label: string;
  name: Path<T>;
  control: Control<T>;
  placeholder?: string;
  required?: boolean;
}

const TiptapEditor = <T extends FieldValues>({
  label,
  name,
  control,
  placeholder = 'Write something...',
  required = false,
}: TiptapEditorProps<T>) => {
  const {
    field: { onChange, value },
    fieldState: { error },
  } = useController({
    name,
    control,
  });

  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder,
        emptyEditorClass: 'is-editor-empty',
      }),
    ],
    content: value || '',
    editorProps: {
      attributes: {
        class: 'prose prose-sm sm:prose-base focus:outline-none min-h-[150px] p-4 text-slate-700',
      },
    },
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      if (editor.isEmpty || html === '<p></p>') {
        onChange('');
      } else {
        onChange(html);
      }
    },
  });

  
  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value || '');
    }
  }, [value, editor]);

  if (!editor) return null;

  return (
    <div className="space-y-2">
      <Label className="block font-medium">
        {label} {required && <span className="text-danger">*</span>}
      </Label>

      <div
        className={cn(
          'flex flex-col rounded-sm transition-all overflow-hidden',
          'border',
          'focus-within:border-primary focus-within:ring-2 focus-within:ring-emerald-100',
          {
            'bg-[#F9FAFB]': true,
            'border-danger/50 focus-within:border-danger focus-within:ring-danger/10': error,
            'border-primary/10': !error,
          }
        )}
      >
        {/* Toolbar */}
        <div className="flex flex-wrap items-center gap-1 border-b border-slate-200 bg-slate-50 p-2">
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={cn(
              'rounded-sm p-1.5 transition-colors hover:bg-slate-200',
              editor.isActive('bold') ? 'bg-slate-200 text-slate-900' : 'text-slate-600'
            )}
            title="Bold"
          >
            <Bold size={16} />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={cn(
              'rounded-sm p-1.5 transition-colors hover:bg-slate-200',
              editor.isActive('italic') ? 'bg-slate-200 text-slate-900' : 'text-slate-600'
            )}
            title="Italic"
          >
            <Italic size={16} />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleStrike().run()}
            className={cn(
              'rounded-sm p-1.5 transition-colors hover:bg-slate-200',
              editor.isActive('strike') ? 'bg-slate-200 text-slate-900' : 'text-slate-600'
            )}
            title="Strikethrough"
          >
            <Strikethrough size={16} />
          </button>
          <div className="mx-1 h-5 w-px bg-slate-300" />
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={cn(
              'rounded-sm p-1.5 transition-colors hover:bg-slate-200',
              editor.isActive('bulletList') ? 'bg-slate-200 text-slate-900' : 'text-slate-600'
            )}
            title="Bullet List"
          >
            <List size={16} />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            className={cn(
              'rounded-sm p-1.5 transition-colors hover:bg-slate-200',
              editor.isActive('orderedList') ? 'bg-slate-200 text-slate-900' : 'text-slate-600'
            )}
            title="Numbered List"
          >
            <ListOrdered size={16} />
          </button>
        </div>

        {/* Editor Area */}
        <div className="bg-white">
          <EditorContent editor={editor} />
        </div>
      </div>

      {error && <p className="text-danger mt-1 text-xs font-medium">{error.message}</p>}
    </div>
  );
};

export default TiptapEditor;

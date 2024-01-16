import CodeMirror, { ReactCodeMirrorProps, ReactCodeMirrorRef } from '@uiw/react-codemirror';
import { forwardRef } from 'react';
import { monokai } from '@uiw/codemirror-theme-monokai';
import { cn } from '@/lib/utils';

export type EditorProps = Omit<ReactCodeMirrorProps, 'ref'>;

export const CodeEditor = forwardRef<ReactCodeMirrorRef, EditorProps>(({ className, ...props }, ref) => {
    return (
        <CodeMirror
            className={cn('size-full', className)}
            height='100%'
            theme={monokai}
            ref={ref}
            {...props}
        />
    )
});
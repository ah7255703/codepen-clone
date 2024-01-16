import { ReactCodeMirrorRef } from '@uiw/react-codemirror';
import { CodeEditor, EditorProps } from "./Base";
import { forwardRef } from 'react';
import { langs } from '@uiw/codemirror-extensions-langs';

export const JsEditor = forwardRef<ReactCodeMirrorRef, EditorProps>((props, ref) => {
    return (
        <CodeEditor
            extensions={[
                langs.javascript(),
            ]}
            ref={ref}
            {...props}
        />
    )
});
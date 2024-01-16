import { ReactCodeMirrorRef } from '@uiw/react-codemirror';
import { CodeEditor, EditorProps } from "./Base";
import { forwardRef } from 'react';
import { langs } from '@uiw/codemirror-extensions-langs';
import { snippetCompletion } from "@codemirror/autocomplete"

const htmlShell = '<!DOCTYPE html><html><head><title>Page Title</title></head><body>${}</body></html>'

export const HTMLEditor = forwardRef<ReactCodeMirrorRef, EditorProps>((props, ref) => {
    return (
        <CodeEditor
            extensions={[
                langs.html({
                    autoCloseTags: true,
                }),
                langs.html().language.data.of({
                    autocompletion: [snippetCompletion(htmlShell, {
                        label: "!",
                        type: "!",
                        detail: "!",
                        apply: htmlShell
                    })]
                }),
            ]}
            basicSetup={{
                autocompletion: true,
                completionKeymap: true,
            }}

            ref={ref}
            {...props}
        />
    )
});
import { ResizablePanelGroup, ResizableHandle, ResizablePanel } from '@/components/ui/resizable';
import { HTMLEditor } from './components/code-editor/HtmlEditor';
import { CssEditor } from './components/code-editor/CssEditor';
import { JsEditor } from './components/code-editor/JsEditor';
import {
    cssStore,
    htmlStore,
    jsStore,
    useCssStore,
    useHTMLStore,
    useJsStore
} from './store/codeStores';
import { useEffect, useState } from 'react';
import debounce from 'lodash.debounce';
function PreviewPanel() {
    const htmlCode = useHTMLStore();
    const cssCode = useCssStore();
    const jsCode = useJsStore();
    return (
        <ResizablePanel defaultSize={40}>
            <iframe className='w-full h-full' srcDoc={`
                    <html>
                        <head>
                            <style>${cssCode}</style>
                        </head>
                        <body>
                            ${htmlCode}
                            <script>${jsCode}</script>
                        </body>
                    </html>
                `} />
        </ResizablePanel>
    )
}
function HTMLPanel() {
    const htmlCode = useHTMLStore();

    const [
        displayHtmlCode,
        setDisplayHtmlCode
    ] = useState(() => htmlCode);

    useEffect(() => {
        debounce(async () => {
            htmlStore.update(displayHtmlCode);
        }, 500)();
    }
        , [displayHtmlCode]);
    return (
        <ResizablePanel defaultSize={40} minSize={30} className='flex flex-col items-start'>
            <div className='w-full flex items-center justify-between p-1'>
                <h3 className='font-semibold'>
                    HTML
                </h3>
            </div>
            <HTMLEditor
                value={displayHtmlCode}
                className='flex-1'
                onChange={async (v) => {
                    setDisplayHtmlCode(v);

                }} />
        </ResizablePanel>
    )
}
function CssPanel() {
    const cssCode = useCssStore();
    const [
        displayCssCode,
        setDisplayCssCode
    ] = useState(() => cssCode);
    useEffect(() => {
        debounce(async () => {
            cssStore.update(displayCssCode);
        }, 500)();
    }
        , [displayCssCode]);
    return (
        <ResizablePanel defaultSize={40} minSize={30}>
            <CssEditor
                value={displayCssCode}
                onChange={(value) => setDisplayCssCode(value)}
            />
        </ResizablePanel>
    )
}
function JsPanel() {
    const jsCode = useJsStore();
    const [
        displayJsCode,
        setDisplayJsCode
    ] = useState(() => jsCode);
    useEffect(() => {
        debounce(async () => {
            jsStore.update(displayJsCode);
        }, 500)();
    }
        , [displayJsCode]);

    return (
        <ResizablePanel defaultSize={40} minSize={30}>
            <JsEditor
                value={displayJsCode}
                onChange={(value) => setDisplayJsCode(value)}
            />
        </ResizablePanel>
    )
}
export default function Application() {
    return (
        <div className='flex flex-col h-full'>
            <header className='h-14 w-full border-b'>
                <div className='max-w-2xl w-full h-full px-4 flex items-center justify-between'>
                    <h2 className='font-bold text-lg'>Code Pen</h2>
                </div>
            </header>
            <ResizablePanelGroup className='size-full flex-1' direction='vertical'>
                <ResizablePanel defaultSize={50} minSize={30}>
                    <ResizablePanelGroup direction='horizontal'>
                        <HTMLPanel />
                        <ResizableHandle />
                        <CssPanel />
                        <ResizableHandle />
                        <JsPanel />
                    </ResizablePanelGroup>
                </ResizablePanel>
                <ResizableHandle />
                <PreviewPanel />
            </ResizablePanelGroup>
        </div>

    )
}

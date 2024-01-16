import { Observer, useObserver } from "./observer";

class HTMLStore extends Observer<string> {
    setHTML = (html: string) => {
        this.update(html);
    }
}
class CssStore extends Observer<string> {
    setHTML = (css: string) => {
        this.update(css);
    }
}
class JsStore extends Observer<string> {
    setHTML = (js: string) => {
        this.update(js);
    }
}

export const cssStore = new CssStore("");
export const useCssStore = () => useObserver(cssStore);

export const htmlStore = new HTMLStore("");
export const useHTMLStore = () => useObserver(htmlStore);

export const jsStore = new JsStore("");
export const useJsStore = () => useObserver(jsStore);
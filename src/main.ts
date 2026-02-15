import './style.css'
import Prism from 'prismjs';
// 다크 모드 테마 (Tomorrow Night 등 선택 가능)
import 'prismjs/themes/prism-tomorrow.css';
// 지원할 언어 (예: typescript, javascript 등)
import 'prismjs/components/prism-typescript';

const state = new Proxy({
    code: localStorage.getItem('last_code') || ''
}, {
    set(target, prop, value) {
        (target as any)[prop] = value;
        if (prop === 'code') {
            updateView(value);
            localStorage.setItem('last_code', value)
            console.log(value)
        }

        return true;
    },
});

const dom = {
    editor : document.getElementById("editor") as HTMLTextAreaElement,
    highlighting: document.getElementById("highlightingContent") as HTMLElement,
    lineNumbers: document.getElementById("lineNumbers") as HTMLDivElement,
}

const handler = {
    editorInputHandler: (e: any) => {
        state.code = e.currentTarget.value;
    },
};

const bind = () => {
    dom.editor?.addEventListener('input', handler.editorInputHandler)
}


function updateView(code: string) {
// 하이라이팅 적용
    dom.highlighting.textContent = code.endsWith('\n') ? code + ' ' : code;
    Prism.highlightElement(dom.highlighting);
}

function initView(code: string) {
    updateView(code);
    dom.editor.textContent = code;
}

const init = () => {
    bind();
    initView(state.code);
}

init();

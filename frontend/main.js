import singScript from './modules/singScript.js';
import homeScript from './modules/homeScript.js';
import { edit } from './modules/edit.js';
import regeneratorRuntime from "regenerator-runtime";


if (window.location.pathname === "/cadastrar") {
    const fomurario = document.querySelector('.regForm');
    fomurario.addEventListener('submit', e => {
        e.preventDefault();
        singScript(document.querySelectorAll('.it, .ds, .sr, .st'));
    });
};

if (window.location.pathname === "/") {
   homeScript();
};

if (window.location.pathname.match(/\/edit/)) {
    edit();
};



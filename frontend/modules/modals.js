import { signUp } from './login.js';
import { primaryPrinter } from './printers.js';


function devModal(id) {

    const modalShow = async () => {
        let resp = await fetchOne(id);
        if (!resp) return;

        primaryPrinter('.modal', resp);
        externalClickDetector();
        exitClickDetector();
        editableDetect();
    }

    const editableDetect = () => {
        let btn = document.querySelector('#edit');
        if (!btn) return;

        btn.addEventListener('click', () => {
            window.location.href = `/edit/${id}`
        })
    }

    modalShow();
};


function loginModel() {

    const modalShow = async () => {
        let resp = await login();
        if(!resp) return;

        primaryPrinter('.modal', resp);
        exitClickDetector();
        externalClickDetector();
        submitDetect();
    }
    modalShow();
};


async function login() {
    let resp = null;

    await axios.get('/login').then(data => { resp = data.data })
    .catch(err => alert('Erro de requesição, por favor tente mais tarde!'));
    return resp
};


async function fetchOne(id) {
    let resp = null;

    await axios.get(`/fetchOne/${id}/html`).then(data => {
        resp = data.data;
    }).catch(err => {
        err.response.status === 404 && alert('Ninguem encontrado!');
        err.response.status === 500 &&
            alert('Erro de requisição, por favor tente mais tarde!');
    });
    return resp;
};


function submitDetect(){
    document.querySelector("#modal-form")
    .addEventListener('submit', e => {
        e.preventDefault();
        signUp(document.querySelectorAll('.modal-login-input'));
    })
};


function externalClickDetector() {
    document.querySelector('#modal-bg')
        .addEventListener('click', e => {
            e.target.id === 'modal-bg' && e.target.remove();
        });
};


function exitClickDetector() {
    document.querySelector('#exit')
        .addEventListener('click', () => {
            primaryPrinter('.modal', '');
        });
}


export { devModal, loginModel }
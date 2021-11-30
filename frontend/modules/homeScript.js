import { getInputData } from './getIn.js';
import { liLoading, msgLiCreator, primaryPrinter } from './printers.js';
import { devModal, loginModel } from './modals.js';

const inputs = document.querySelectorAll('.sr, .ds, .st, #src-btn, #src-box');
const pagerDiv = document.querySelector('.pager-num');

const listSize = 10;
const pagerSize = 8;
const url = 'http://localhost:3030';

export default function homeScript() {
    const btnSet = document.querySelectorAll('.btn-set');
    const mBtns = document.querySelectorAll('.m-btn');
    const extOpt = document.querySelector('#ext-opt');
    const sideBar = document.querySelector(".side-bar").classList;
    const navigation = document.querySelector(".navigation").classList;

    const pageCreator = async (offSet = 0) => {
        let resp = await fetchDevs(queryCreator(getInputData(inputs)), offSet);

        if (resp) {
            primaryPrinter('.ul-p', resp);

            pagerButtonCreator(
                getInputData(document.querySelectorAll('.pager'))
            );
            dynamicClickDetector(
                document.querySelectorAll('.num'),
                document.querySelectorAll('.list-item')
            );
        } else { pagerButtonCreator({ 'pages': 1, 'atual': 1 }) };
        return;
    };


    const dynamicClickDetector = (pager, liDevs) => {

        eventListen(pager, 'click', t => {
            if (t.classList[2] === 'active') return;

            if (t.name === '-->') pagerDiv.id = parseInt(pagerDiv.id) + pagerSize;
            if (t.name === '<--') pagerDiv.id = parseInt(pagerDiv.id) - pagerSize;

            pageCreator(listSize * t.value);
        });

        eventListen(liDevs, 'click', t => {
            t.tagName === "SPAN" ? devModal(t.parentNode.id) :
                devModal(t.id);
        });
        return;
    };
    pageCreator();
    loginClickDetector();
    profileClickDetector();

    eventListen(inputs, 'click', t => {
        if (t.type !== 'text') {
            pagerDiv.id = 0;
            pageCreator();
        };
    });


    eventListen(btnSet, 'click', t => {
        if (pagerDiv.childNodes.length <= 1) return;

        pagerDiv.childNodes.forEach((el, i, arr) => {
            if (el.classList[2] !== 'active') return;
            let cont = 0;

            if (t.value === 'prev' && el.value !== '0') {
                cont = parseInt(el.value) - 1;
                if (i - 1 === 0 && arr[i - 1].name === '<--') {
                    pagerDiv.id = parseInt(pagerDiv.id) - pagerSize;
                };
            };

            if (t.value === 'next') {
                cont = arr[arr.length - 1].value !== el.value ?
                    parseInt(el.value) + 1 : parseInt(el.value);

                if (arr[i + 1] && arr[i + 1].name === '-->') {
                    pagerDiv.id = parseInt(pagerDiv.id) + pagerSize;
                }
            };
            pageCreator(listSize * cont);
        })
    });
    // responsivo
    eventListen([...mBtns, extOpt], 'click', t => {
        if (t.id === 'filter') {
            navigation[1] === "showUp" &&
                navigation.toggle('showUp');

            sideBar.toggle('showUp');
        };

        if (t.id === 'options') {
            sideBar[1] === "showUp" &&
                sideBar.toggle('showUp');

            navigation.toggle('showUp');
        };
        extOpt.style = 'display: block';

        if (t.id === "ext-opt") {
            navigation[1] === "showUp" &&
                navigation.toggle('showUp');

            sideBar[1] === "showUp" &&
                sideBar.toggle('showUp');
        };

        if (sideBar[1] !== "showUp" && navigation[1] !== "showUp") {
            extOpt.style = ''
        };
    });
};


async function fetchDevs(qry, offSet = 0) {
    let response = null;

    liLoading(true);
    await axios.get(`${url}/fetchAll/html?limit=${listSize}&offSet=${offSet}&${qry}`)
        .then(resp => {
            liLoading(false);
            response = resp.data;
        }).catch(err => {
            if (err.response.status === 404 || err.response.status === 500) {
                msgLiCreator(err.response.data.join('<br>'));
            };
        });
    return response;
};


function profileClickDetector(){
    let btn = document.querySelector('.circle');
    if (!btn) return;
    btn.addEventListener('click', t => devModal(t.target.id));
}


function loginClickDetector() {
    let btn = document.querySelector('#in');
    if (!btn) return;
    btn.addEventListener('click', loginModel);
};


function pagerButtonCreator(pag, limit = pagerSize) {
    pagerDiv.innerHTML = '';
    limit = limit + parseInt(pagerDiv.id);

    for (var i = parseInt(pagerDiv.id); i < pag['pages']; i++) {
        if (parseInt(pagerDiv.id) === i && i !== 0) {
            let btn = document.createElement('button');
            btn.value = i - 1;
            btn.name = '<--';
            btn.innerHTML = '...';
            btn.className = "btn-pager num";
            pagerDiv.appendChild(btn);
        };

        let btn = document.createElement('button');
        btn.value = i;
        btn.name = i + 1;
        btn.innerHTML = i + 1;
        btn.className = Number(pag['atual']) === i + 1 ?
            "btn-pager num active" : "btn-pager num";

        if (i === limit) {
            btn.name = '-->';
            btn.innerHTML = '...';
            pagerDiv.appendChild(btn);
            break;
        };
        pagerDiv.appendChild(btn);
    };
    return;
};


function queryCreator(obj) {
    let arr = [];
    for (var key in obj) {
        if (obj[key] === '') continue;
        arr.push(`${key}=${typeof obj[key] === 'string' ? obj[key] : obj[key].join('+')}`);
    }
    return arr.join('&');
};


function eventListen(inputs, event, callback) {
    return inputs.forEach((el) => {
        el.addEventListener(event, e => {
            callback(e.target);
        });
    });
};
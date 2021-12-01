import { getInputData } from "./getIn";
import { errPrinter, fullScreenLoading } from "./printers";


function edit() {
    const form = document.querySelector('.regForm');
    const inputs = document.querySelectorAll('.it, .ds, .sr, .st');
    const oldObj = getInputData(inputs);

    const main = async () => {
        let alerts = document.querySelectorAll('.alertSpan');
        alerts.length > 0 && alerts.forEach(e => e.remove());

        let obj = getInputData(inputs);
        let password = passCheck(obj);
        let finalObj = objCompare(oldObj, obj);

        if (password) finalObj.password = password;

        if (Object.keys(finalObj).length !== 0) {
            finalObj.devSide && (finalObj.devSide = finalObj.devSide.join(''));

            await postege(finalObj);

            return;
        };
        return;
    };

    del();

    form.addEventListener('submit', e => {
        e.preventDefault();
        main();
    });
};


function del() {

    const delet = async () => {
        let confirma = window.confirm('Tem certeza que deseja deletar sua conta?');

        if (confirma) {
            fullScreenLoading(true);
            await axios.get('/del').then(resp => {
                fullScreenLoading(false);
                if (resp.status === 200) window.location.href = '/';
            }).catch(err => {
                fullScreenLoading(false);
                if (err.response.status === 404) {
                    alert('Erro! usuário não existe!');
                    window.location.href = '/';
                };
            });
        }
    };

    document.getElementById('del').addEventListener('click', e => {
        delet();
    })
};


async function postege(obj) {
    fullScreenLoading(true);
    await axios.put('/edit', obj).then(resp => {
        fullScreenLoading(false);
        if (resp.status === 200) window.location.href = '/';

    }).catch(err => {
        fullScreenLoading(false);
        if (err.response.status === 400) {
            serverCheck(err.response.data);
        };
        if (err.response.status === 404) {
            alert('Ocorreu um erro, por favor tente mais tarde!');
        };
    });
};


function serverCheck(data) {
    let keyIndex
    data.forEach(element => {
        keyIndex = Object.keys(element).join('');
        errPrinter(keyIndex, element[keyIndex]);
    });
};


function passCheck(obj2) {
    if (!obj2.p1 && obj2.p2) {
        errPrinter('pst1', 'Crie uma primeiro!');
        return false;
    };
    if (obj2.p1 && obj2.p1.length < 3 || obj2.p1.length > 12) {
        errPrinter('pst1', 'Deve ter entre 3 e 12 caracteres!');
        return false;
    };
    if (obj2.p1 && !obj2.p2) {
        errPrinter('pst2', 'Confirme sua senha!');
        return false;
    };
    if (obj2.p1 !== obj2.p2) {
        errPrinter('pst2', 'As senhas não coincidem!');
        return false;
    };

    return obj2.p1;
};


function objCompare(old, neuu) {
    let objD = {};
    delete old.p1;
    delete old.p2;
    neuu = emptyCleanUp(neuu);

    for (var i in old) {
        let control = false;

        if (neuu[i] && typeof old[i] === 'string' && old[i] !== neuu[i]) control = true;

        if (neuu[i] && typeof old[i] === 'object') {
            control = 0 < old[i].filter(el => { if (neuu[i].indexOf(el) === -1) return el }).length;
            if (old[i].length !== neuu[i].length) control = true;
        };

        control && (objD[i] = neuu[i]);
    };
    return objD;
};


function emptyCleanUp(obj1) {
    for (var key in obj1) {
        if (!obj1[key] || obj1[key] === '') delete obj1[key];
    };
    return obj1;
};

export { edit }
import { getInputData } from "./getIn";
import { errPrinter, fullScreenLoading } from "./printers";

function signUp(dados){
    let obj = getInputData(dados);

    let alerts = document.querySelectorAll('.alertSpan');
    alerts.length > 0 && alerts.forEach(e => e.remove());
    
    if (emptyCheck(obj)) {
        postege(obj);
    };
};


async function postege(obj){
    fullScreenLoading(true, '.loading');
    await axios.post('/login', obj).then(resp => {
        fullScreenLoading(false, '.loading');
        window.location.href = `/`;
    }).catch(err => {
        fullScreenLoading(false, '.loading');
        if(err.response.status === 404 || err.response.status === 401){
            serverCheck(err.response.data);
        };
    });
};


function serverCheck(data){
    let keyIndex
    data.forEach(element => {
        keyIndex = Object.keys(element).join('');
        errPrinter(keyIndex, element[keyIndex]);
    });
};


function emptyCheck(dados){
    let control = true;

    if (!dados.email || dados.email === "") control = errPrinter('et', 'E-mail requerido!');
    if (!dados.password || dados.password === "") control = errPrinter('pst', 'Senha requerida!');
    
    return control;
};

export { signUp }

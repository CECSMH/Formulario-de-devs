import { getInputData } from './getIn.js';
import { errPrinter, fullScreenLoading } from './printers.js';
const url = 'http://localhost:3030';

export default function singScript(inputs) {
    let alerts = document.querySelectorAll('.alertSpan');
    let dados = getInputData(inputs);

    alerts.length > 0 && alerts.forEach(e => e.remove());

    if (emptyCheck(dados)) {
        fullScreenLoading(true);

        dados.password = dados.p1;
        dados.devSide = dados.devSide.join('');
        delete dados.p1;
        delete dados.p2;

        postege(dados);
    };
};


async function postege(dados) {
    await axios.post('/cadastrar', dados).then(data => {
        if (data.status === 200) {
            fullScreenLoading(false);
            window.location.href = `${url}/`;
        }
    }).catch(err => {
        if (err.response.status === 400) {
            emptyServerCheck(err.response.data)
            fullScreenLoading(false);
        };
        if (err.response.status === 422) {
            fullScreenLoading(false);
            alert(err.response.data)
        };
        if (err.response.status === 500) {
            fullScreenLoading(false);
            alert("Erro ao criar usuário, por favor tente novamente mais tarde!");
        }
    });
};


function emptyServerCheck(resp) {
    let keyIndex
    resp.forEach(element => {
        keyIndex = Object.keys(element).join('');
        errPrinter(keyIndex, element[keyIndex]);
    });
};


function emptyCheck(dados) {
    let control = true;

    if (!dados.fullName || dados.fullName === "") control = errPrinter('nt', 'Nome requerido!');
    if (!dados.email || dados.email === "") control = errPrinter('et', 'E-mail requerido!');
    if (!dados.devSide || dados.devSide === "") control = errPrinter('dsl', 'Escolha o seu lado de atuação!');
    if (!dados.seniority || dados.seniority === "") control = errPrinter('srt', 'Escolha o seu nivel de senioridade!');
    if (!dados.stacks || dados.stacks === "") control = errPrinter('stt', 'Escolha a/as stacks que você utiliza!');
    if (!dados.experience || dados.experience === "") control = errPrinter('xpt', 'Descreva a sua experiencia na sua área!');

    if (!dados.p1 || dados.p1 === "") {
        control = errPrinter('pst1', 'Crie uma senha!');
    } else if (dados.p1.length < 3 || dados.p1.length > 12) {
        control = errPrinter('pst1', 'Deve ter entre 3 e 12 caracteres!');
    } else if (!dados.p2 || dados.p2 === "") {
        control = errPrinter('pst2', 'Confirme sua senha!');
    } else if (dados.p1 !== dados.p2) {
        control = errPrinter('pst2', 'As senhas não coincidem!');
    };

    return control;
};


function primaryPrinter(selector, element) {
    let el = document.querySelector(selector);
    
    typeof element === 'string' && (el.innerHTML = element);
    typeof element === 'object' && el.appendChild(element);
};


function errPrinter(id, errText) {
    let title = document.getElementById(id);
    if (title.lastElementChild && title.lastElementChild.className === "alertSpan") {
        title.lastElementChild.remove();
    }

    let span = document.createElement('span');
    span.className = "alertSpan";
    span.style = "color: #d9534f; font-size: 14px; margin-left: 4px; font-weith: bold";

    span.innerText = errText;
    title.appendChild(span);

    return false;
};


function msgLiCreator(text) {
    primaryPrinter('.ul-p', '');
    if (text) {
        let li = document.createElement("li");
        li.className = 'msg';
        li.style = "background: none";
        li.innerHTML = text;

        primaryPrinter('.ul-p', li);
    };
};


function liLoading(binario) {
    primaryPrinter('.ul-p', '');
    if (binario) {
        let img = document.createElement('img');
        let li = document.createElement("li");

        img.src = '/assets/img/loading.gif';
        img.style = 'width: 30px';
        li.className = 'msg';
        li.style = "background: none;"

        li.appendChild(img);
        primaryPrinter('.ul-p', li);
    };
};


function fullScreenLoading(binario, target = '.modal') {
    primaryPrinter(target, '')
    if (binario) {
        let div = document.createElement('div');
        let img = document.createElement('img');
        img.src = '/assets/img/loading.gif';
        img.style = 'width: 60px';

        div.id = 'modal-bg';
        div.appendChild(img);
       
        primaryPrinter(target, div);
    };
};

export { msgLiCreator, liLoading, errPrinter, fullScreenLoading, primaryPrinter }
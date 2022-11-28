// Асинхронные запросы
async function loadCurrencies(){
    const res = await fetch('https://www.nbrb.by/api/exrates/currencies');
    console.log(res);
    let currencies = await res.json();

    // фильтр: убираем недействительные валюты
    currencies = currencies.filter((c)=> {
        const d = new Date(c.Cur_DateEnd);
        const now = Date.now();
        return d.getTime() - now > 0;
    });
    drawCurrencies(currencies);
}

function drawCurrencies(currencies) {
    const select = document.getElementById('currencies');
    currencies.forEach((c)=> {
        const option = document.createElement('option');
    option.innerText = c.Cur_Name;
    option.value = c.Cur_ID;
    select.appendChild(option);
    });
}

loadCurrencies();

    async function showExRate(id){
        const url = `https://www.nbrb.by/api/exrates/rates/${id}`;
        const res = await fetch(url);
        const rate = await res.json();
        const d = document.getElementById('exrate');
        d.innerText = `${rate.Cur_Scale} ${rate.Cur_Name} = ${rate.Cur_OfficialRate} BYN`;

    };

    async function sendMessage(){
        const username = document.getElementById('username');
        const msg = document.getElementById('msg');
        const req = {
            name: username.value,
            message: msg.value

        };
        const reqJSON = JSON.stringify(req);
        const url = 'http://192.168.100.101:8080';
        await fetch(url, {
            method: 'POST',
            body: reqJSON,
            headers: {
                'Content-Type':'application/json'
            }
        });
        msg.value = '';
    }
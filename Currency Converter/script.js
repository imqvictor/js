const amountInput = document.getElementById('amount');
const fromInput = document.getElementById('from');
const toInput = document.getElementById('to');
const display = document.getElementById('display');
const convertBtn = document.getElementById('convertBtn');

convertBtn.addEventListener('click', convertCurrency);

async function convertCurrency() {
    const amount = Number(amountInput.value);
    if (amount === "") {
        alert("amount empty");
        return;
    }
    if (amount <= 0) {
        alert("please enter amount greater than 1");
        return;
    }
    const from = fromInput.value.trim();
    if (from === "") {
        alert("from empty");
        return;
    }
    const to = toInput.value.trim();
    if (to === "") {
        alert("to empty");
        return;
    }
    if (from === to) {
        alert("please select differrent currencies");
        return;
    }
    console.log(amount);
    console.log(from);
    console.log(to);

    const request = 'https://open.er-api.com/v6/latest/' + `${encodeURIComponent(from)}`;
    const response = await fetch(request);
    const data = await response.json();

    console.log(data.rates[from]);
    console.log(data.rates[to]);

    const rate = data.rates[to] * amount;
    const fixedRate = rate.toFixed(2);

    console.log(rate);

    display.textContent = `${amount} ${from} = ${fixedRate} ${to}`;

    amountInput.value = "";
    fromInput.value = "";
    toInput.value = "";
}

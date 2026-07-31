const display = document.getElementById("display");
let previousNumber = "";
let currentNumber = "";
let operator = "";

const numberButtons = document.querySelectorAll('.number');

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        display.value += button.textContent;
    })
});

const clear = document.getElementById('clear');
clear.addEventListener('click', clearDisplay);
function clearDisplay() {
    display.value = "";
    previousNumber = "";
    currentNumber = "";
    operator = "";
}

const operatorButtons = document.querySelectorAll('.operator');
operatorButtons.forEach(button => {
    button.addEventListener('click', () => {
        console.log(previousNumber = display.value);
        console.log(operator = button.textContent);

        display.value = "";
    })
})

const equalsButton = document.getElementById('equals');
equalsButton.addEventListener('click', calculate);

function calculate() {
    // Implementation for calculation
    currentNumber = display.value;
    console.log(currentNumber);
    if (previousNumber !== "" && operator !== "" && display.value !== "") {
        let first = Number(previousNumber);
        let second = Number(currentNumber);
        let result;

        switch (operator) {
            case "+":
                result = first + second;
                break;
            case "-":
                result = first - second;
                break;
            case "x":
                result = first * second;
                break;
            case "/":
                result = first / second;
                break;
            default:
                result = "NaN";
                break;
        }
        console.log(display.value = result);
    } else {
        display.value = "please enter numbers";
    }

}

const period = document.getElementById('period');
period.addEventListener('click', edgeCase);

function edgeCase() {
    if (!display.value.includes(".")) {
        display.value += ".";
    }
}

const backSpace = document.getElementById("backspace");
backSpace.addEventListener('click', backSpaceFun);

function backSpaceFun() {
    display.value = display.value.slice(0, -1);
}

const plusMinus = document.getElementById("plus-minus");
plusMinus.addEventListener('click', plusMinusFun);

function plusMinusFun() {
    if (display.value == "") {
        return;
    }

    const number = Number(display.value);
    const result = display.value * -1;

    display.value = result;
}

const percenrBtn = document.getElementById("modulo");
percenrBtn.addEventListener('click', percentage);

function percentage() {
    if (display === "") {
        return;
    }

    const number = Number(display.value);

    display.value = number / 100;
}
let number1Array = [];
let number2Array = [];
let operator = null; 

const numberButtons = Array.from(document.querySelectorAll(".numbers button"));
const operatorButtons = Array.from(document.querySelectorAll(".operators button"));

const equalButton = document.querySelector("#equalButton");

const displayScreen = document.querySelector("p");

numberButtons.forEach((button) => {
    button.addEventListener("click", () => {

        if (operator == null) {

            number1Array.unshift(parseInt(button.textContent));
            displayScreen.textContent = computeNumber(number1Array).toString();

        } else {

            number2Array.unshift(parseInt(button.textContent));
            displayScreen.textContent = computeNumber(number2Array).toString();
        }
        
    });
});

operatorButtons.forEach((button) => {
    button.addEventListener("click", () => {

        operator = button.textContent.toString()
        displayScreen.textContent = button.textContent;
        
    });
});

equalButton.addEventListener("click", () => {
    if ((number1Array != []) && (number2Array != []) && (operator != null)) {

        const result = operate(number1Array, number2Array, operator);
        displayScreen.textContent = result;

        number1Array = Array.from(String(result).split('').reverse().join(''), Number);
        number2Array = [];
        operator = null;

    }
});


function operate(number1Array, number2Array, operator) { 

    const number1 = computeNumber(number1Array);
    const number2 = computeNumber(number2Array);

    switch (operator) {
    case "+":
        return add(number1, number2);
        break;
    case "-":
        return substract(number1, number2);
        break;
    case "*":
        return multiply(number1, number2);
        break;
    case "÷":
        return divide(number1, number2);
        break;
    default:
        return "Invalid operator"
    }
}

function add(number1, number2) {
    return number1 + number2
}

function substract(number1, number2) {
    return number1 - number2
}

function multiply(number1, number2) {
    return number1*number2 
}

function divide(number1, number2) {
    return number1/number2 
}

function computeNumber (numberArray) {
    const number = numberArray.reduce((number, currentDigit, index) => {
        number += currentDigit*Math.pow(10, index)
        return number
    }, 0)

    return number
}
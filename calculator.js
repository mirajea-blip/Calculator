let number1Array = [];
let number2Array = [];
let operator = null; 

const numberButtons = Array.from(document.querySelectorAll(".numbers button"));
const operatorButtons = Array.from(document.querySelectorAll(".operators button"));

const equalButton = document.querySelector("#equalButton");

const clearButton = document.querySelector("#clearButton");

const backspaceButton = document.querySelector("#backspace");

const displayScreen = document.querySelector("p");

numberButtons.forEach((button) => {
    button.addEventListener("click", () => {

        if (operator == null) {

            number1Array.unshift(parseInt(button.textContent));
            displayScreen.textContent = computeNumber(number1Array).toString();

        } else if (operator !== "=") {

            number2Array.unshift(parseInt(button.textContent));
            displayScreen.textContent = computeNumber(number2Array).toString();

        } else {

            number1Array = [parseInt(button.textContent)];
            operator  = null; 
            displayScreen.textContent = computeNumber(number1Array).toString(); 

        }
        
    });
});

operatorButtons.forEach((button) => {
    button.addEventListener("click", () => {

        if (number2Array.length !== 0) {

            const result = operate(number1Array, number2Array, operator);

            if (result === null) {

                displayScreen.textContent = `Can't divide by zero : enter a new ` + 
                `second operand for your division or start a new operation with the first ` + 
                `operand being ${computeNumber(number1Array)}`; 
    
            } else {

                displayScreen.textContent = result.toFixed(2);
                number1Array = Array.from(String(result).split('').reverse().join(''));

            }
            
            number2Array = [];

        }

        operator = button.textContent.toString()
        
    });
});

equalButton.addEventListener("click", () => {
    if ((number1Array.length !== 0) && (number2Array.length !== 0) && (operator != null)) {

        const result = operate(number1Array, number2Array, operator);

        if (result === null) {

            displayScreen.textContent = `Can't divide by zero : enter a new ` + 
            `second operand for your division or start a new operation with the first ` + 
            `operand being ${computeNumber(number1Array)}`; 

        } else {

            displayScreen.textContent = result.toFixed(2);
            number1Array = Array.from(String(result).split('').join(''));
            operator = "=";

        }

        number2Array = [];

    }
});

clearButton.addEventListener("click", () => {

    number1Array=[];
    number2Array = [];
    operator = null;
    displayScreen.textContent = "";

});

backspaceButton.addEventListener("click", () => {

    if ((number1Array.length !== 0) && (operator === null)) {

        console.log("in");
        
        number1Array = number1Array.slice(1);
        displayScreen.textContent = computeNumber(number1Array);

    } else if ((number2Array.length !== 0)) {

        console.log("here");
        console.log(number2Array.length); 

        number2Array = number2Array.slice(1);
        displayScreen.textContent = computeNumber(number2Array);

    }
 
});

function operate(number1Array, number2Array, operator) {
    
    if ((computeNumber(number2Array) === 0) && (operator === "÷")) {
        return null;
    } 

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

function computeNumber(numberArray) {

    function getNumberFromArray(numberArray) { 
        
        const numberFromArray = numberArray.reduce((number, currentDigit, index) => {
            number += currentDigit*Math.pow(10, index)
            return number
        }, 0);

        return numberFromArray

    }

    let sign = 1;

    if (numberArray[0] === "-") {

        numberArray.shift();

        sign = -1;

    } 
    
    if (numberArray.includes(".")) {

        const splitIndex = numberArray.indexOf(".");

        const integerPart = numberArray.slice(0, splitIndex).reverse();
        const fractionPart = numberArray.slice(splitIndex + 1).reverse();
        
        const number = getNumberFromArray(integerPart) + getNumberFromArray(fractionPart) * Math.pow(10, -fractionPart.length);

        return sign*number 

    } else {
        return sign*getNumberFromArray(numberArray) 
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

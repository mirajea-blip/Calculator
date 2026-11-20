let number1Array = [];
let number2Array = [];
let operator = null; 

const numberButtons = Array.from(document.querySelectorAll(".numbers button"));
const operatorButtons = Array.from(document.querySelectorAll(".operators button"));

const equalButton = document.querySelector("#equalButton");

const clearButton = document.querySelector("#clearButton");

const backspaceButton = document.querySelector("#backspace");

const computationdisplayScreen = document.querySelector("#computationDisplay");
const errorDisplayScreen = document.querySelector("#errorDisplay");

const periodButton = document.querySelector("#period");

numberButtons.forEach((button) => {
    button.addEventListener("click", () => {

        if (operator == null) {

            number1Array.unshift(parseInt(button.textContent));
            computationdisplayScreen.textContent = computationdisplayScreen.textContent + button.textContent;

        } else if (operator !== "=") {

            number2Array.unshift(parseInt(button.textContent));
            computationdisplayScreen.textContent = computationdisplayScreen.textContent + button.textContent;

        } else {

            number1Array = [parseInt(button.textContent)];
            operator  = null; 
            computationdisplayScreen.textContent = button.textContent; 

        }
        
    });
});

operatorButtons.forEach((button) => {
    button.addEventListener("click", () => {

        if (number2Array.length !== 0) {

            const result = operate(number1Array, number2Array, operator);

            if (result === null) {

                errorDisplayScreen.textContent = `Can't divide by zero : selecte a new operand` + 
                `and a second operator`; 

                operator = null;

                computationdisplayScreen.textContent = computeNumber(number1Array);
    
            } else {

                computationdisplayScreen.textContent = result.toFixed(2) + button.textContent;
                operator = button.textContent.toString();
                number1Array = Array.from(String(result).split('').reverse().join(''));

            }
            
            number2Array = [];

        } else {

            operator = button.textContent.toString();
            computationdisplayScreen.textContent = computationdisplayScreen.textContent + button.textContent;

        }
        
    });
});

equalButton.addEventListener("click", () => {
    if ((number1Array.length !== 0) && (number2Array.length !== 0) && (operator != null)) {

        const result = operate(number1Array, number2Array, operator);

        if (result === null) {

            errorDisplayScreen.textContent = `Can't divide by zero : selecte a new operand` + 
            `and a second operator`; 

            operator = null;

            computationdisplayScreen.textContent = computeNumber(number1Array);

        } else {

            computationdisplayScreen.textContent = result.toFixed(2);
            number1Array = Array.from(String(result).split('').join('')).reverse();
            operator = "=";

        }

        number2Array = [];

    }
});

clearButton.addEventListener("click", () => {

    number1Array=[];
    number2Array = [];
    operator = null;
    computationdisplayScreen.textContent = "";

});

backspaceButton.addEventListener("click", () => {

    if ((number1Array.length !== 0) && (operator === null)) {
        
        number1Array = number1Array.slice(1);
        computationdisplayScreen.textContent = computationdisplayScreen.textContent.slice(0,-1);

    } else if ((number2Array.length !== 0)) {

        number2Array = number2Array.slice(1);
        computationdisplayScreen.textContent = computationdisplayScreen.textContent.slice(0,-1);

    }
 
});

periodButton.addEventListener("click", () => {

    /* 
    - The period button can't be used before a digit is entered or right after
      a click on an operator. 
    - If there is no digit entered after the period the operation is computed as if a zero was behind the period
    */

    if (computationdisplayScreen.textContent.includes(".")) {

        return 

    } else if ((number1Array.length !== 0) && (operator === null)) {
        
       number1Array.unshift(periodButton.textContent);
       computationdisplayScreen.textContent = computationdisplayScreen.textContent + periodButton.textContent;

    } else if ((number2Array.length !== 0)) {

        number2Array.unshift(periodButton.textContent);
        computationdisplayScreen.textContent = computationdisplayScreen.textContent + periodButton.textContent;

    }

});

operatorButtons.forEach((button) => {
    button.addEventListener("click", () => {
        if (errorDisplayScreen.textContent.length !== 0) {
            errorDisplayScreen.textContent = "";
        }
    });
})


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

    if (numberArray[numberArray.length - 1] === "-") {

        numberArray.pop();

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

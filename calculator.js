let number1;
let number2;
let operator; 

const numberButtons = Array.from(document.querySelectorAll(".numbers button"));

function operate(number1, number2, operator) { 
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
    case "/":
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
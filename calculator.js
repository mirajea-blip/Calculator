let number1 = null;
let number2 = null;
let operator = null; 

const numberButtons = Array.from(document.querySelectorAll(".numbers button"));
const displayScreen = document.querySelector("p");

numberButtons.forEach((button) => {
    button.addEventListener("click", () => {

        if (number1 == null) {
            number1 = parseInt(button.textContent); 
        } else if (number2 == null) {
            number2 = parseInt(button.textContent);
        } else {
            number1 = parseInt(button.textContent);
        }

        displayScreen.textContent = button.textContent;
        
    });
});

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
document.addEventListener("DOMContentLoaded", function() {
    const screen = document.getElementById("screen");
    let currentInput = "";
    let operator = null;
    let firstOperand = null;
    let shouldResetScreen = false;

    const updateScreen = (text) => {
        screen.textContent = text;
    };

    const clearCalculator = () => {
        currentInput = "";
        operator = null;
        firstOperand = null;
        shouldResetScreen = false;
        updateScreen("0");
    };

    const deleteLastDigit = () => {
        currentInput = currentInput.slice(0, -1);
        updateScreen(currentInput || "0");
    };

    const appendNumber = (number) => {
        if (currentInput.length >= 10) return; 
        if (shouldResetScreen) {
            currentInput = number;
            shouldResetScreen = false;
        } else {
            currentInput += number;
        }
        updateScreen(currentInput);
    };

    const chooseOperator = (op) => {
        if (currentInput === "") return;
        if (firstOperand !== null && operator !== null) {
            currentInput = calculateResult();
            updateScreen(currentInput);
        }
        firstOperand = currentInput;
        operator = op;
        shouldResetScreen = true;
    };

    const calculateResult = () => {
        const secondOperand = currentInput;
        let result = 0;
        const num1 = parseFloat(firstOperand);
        const num2 = parseFloat(secondOperand);

        switch (operator) {
            case '+':
                result = num1 + num2;
                break;
            case '-':
                result = num1 - num2;
                break;
            case '*':
                result = num1 * num2;
                break;
            case '/':
                result = num2 !== 0 ? num1 / num2 : "Error";
                break;
            case '%':
                result = num1 % num2;
                break;
        }

        return result.toString().slice(0, 10); 
    };

    document.querySelectorAll(".number").forEach(button => {
        button.addEventListener("click", () => appendNumber(button.textContent));
    });

    document.querySelectorAll(".operator").forEach(button => {
        button.addEventListener("click", () => chooseOperator(button.textContent));
    });

    document.getElementById("equal").addEventListener("click", () => {
        if (operator === null || shouldResetScreen) return;
        currentInput = calculateResult();
        updateScreen(currentInput);
        operator = null;
        firstOperand = null;
        shouldResetScreen = true;
    });

    document.getElementById("clear").addEventListener("click", clearCalculator);

    document.getElementById("delete").addEventListener("click", deleteLastDigit);
});


clearCalculator();
document.addEventListener("DOMContentLoaded", () => {
    const display = document.getElementById("display");
    const buttons = document.querySelectorAll(".button");
    let currentInput = "";
    let previousInput = "";
    let operator = "";

    buttons.forEach((button) => {
        button.addEventListener("click", () => {
            const buttonText = button.textContent;

            if (buttonText === "AC") {
                clear();
            } else if (buttonText === document.getElementById("hapus").textContent) {
                currentInput = currentInput.slice(0, -1);
                updateDisplay();
            } else if (buttonText === "=") {
                calculate();
            } else if (/[0-9]/.test(buttonText)) {
                currentInput += buttonText;
                updateDisplay();
            } else {
                handleOperator(buttonText);
            }
        });
    });

    function updateDisplay() {
        display.textContent = currentInput;
    }

    function clear() {
        currentInput = "";
        previousInput = "";
        operator = "";
        updateDisplay();
    }

    function handleOperator(op) {
        if (currentInput !== "") {
            if (previousInput !== "") {
                calculate();
            }
            operator = op;
            previousInput = currentInput;
            currentInput = "";
        }
    }

    function calculate() {
        if (previousInput !== "" && currentInput !== "" && operator !== "") {
            const prev = parseFloat(previousInput);
            const current = parseFloat(currentInput);
            let result;

            switch (operator) {
                case "+":
                    result = prev + current;
                    break;
                case "-":
                    result = prev - current;
                    break;
                case "*":
                    result = prev * current;
                    break;
                case "/":
                    result = prev / current;
                    break;
                case "%":
                    result = (prev / 100) * current;
                    break;
                default:
                    return;
            }

            currentInput = result.toString();
            previousInput = "";
            operator = "";
            updateDisplay();
        }
    }
});

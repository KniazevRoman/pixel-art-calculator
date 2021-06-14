/* Appearance */ 

document.addEventListener("DOMContentLoaded", ()=> {
    let buttons = document.querySelectorAll('.calculator__controls-button_square');

    for (let button of buttons) {
        button.style.height = getComputedStyle(button).width;
        button.style.marginBottom = getComputedStyle(buttons[0]).marginRight;
    }

    let longButtons = document.querySelectorAll('.calculator__controls-button_long');

    for (let button of longButtons) {
        button.style.height = getComputedStyle(buttons[0]).width;
    }
});

/* Logic */

createCalc();

function createCalc() {
    let powered = false;
    let screen = document.querySelector('.calculator__screen');
    startPowerButton();

    let operand1 = '';
    let operator = '';
    let operand2 = '';
    let result = '';

    let startNewInput = false;
    let newCalculation = false;

    function startPowerButton() {
        let powerButton = document.querySelector('.calculator__controls-button_power');
        let powerIndicator = document.querySelector('.calculator__controls-power-indicator');
        powerButton.addEventListener('click', ()=> {
            if (!powered) {
                powered = true;
                powerIndicator.style.backgroundColor = 'rgb(9, 240, 59)';
                screen.textContent = '0';
                operand1 = '';
                operator = '';
                operand2 = '';
                result = '';
                startNumberButtons();
                startClearButton();
                startOperatorButtons();
                startEqualButton();
                startKeyboardSupport();
            } else {
                powered = false;
                powerIndicator.style.backgroundColor = 'rgb(50, 50, 104)';
                screen.textContent = '';
                operand1 = '';
                operator = '';
                operand2 = '';
                result = '';
                terminateNumberButtons();
                terminateClearButton();
                terminateOperatorButtons();
                terminateEqualButton();
                terminateKeyboardSupport();
            }
        });
    }

    /* Process user unput */

    function processNumber(event) {
        if (screen.textContent.length == 10 && !startNewInput && !newCalculation) {
            console.log('Input is ignored. No free space on the screen');
            return;
        } else if(screen.textContent.indexOf('.') != -1 && event.target.dataset.number == '.' && !startNewInput && !newCalculation) {
            console.log('Input is ignored. The dot has already been inputed');
            return;
        }

        if(newCalculation) {
            operand1 = '';
            operator = '';
            operand2 = '';
            result = '';
            screen.textContent = '';

            newCalculation = false;
        }

        if(!operator) {
            if (!operand1) {
                screen.textContent = event.target.dataset.number;
                operand1 += event.target.dataset.number;
            } else {
                screen.textContent += event.target.dataset.number;
                operand1 += event.target.dataset.number;
            }
        } else {
            if (startNewInput) {
                startNewInput = false;
                screen.textContent = event.target.dataset.number;
                operand2 += event.target.dataset.number;
            } else {
                screen.textContent += event.target.dataset.number;
                operand2 += event.target.dataset.number;
            }
        }
        
        
    }

    function clearInput() {
        screen.textContent = '0';
        if(newCalculation) {
            operand1 = '';
            operator = '';
            operand2 = '';
            result = '';
        }else if(!operator) {
            operand1 = '';
        } else {
            operand2 = '';
        }
    }

    function processOperator(event) {
        startNewInput = true;

        if(!operator || newCalculation) {
            operator = event.target.textContent;
            operand2 = '';
            newCalculation = false;
        } else {
            if (operator == '+') {
                result = +operand1 + +operand2;
                screen.textContent = checkForOverflow(result);

                operator = event.target.textContent;
                operand1 = result;
                operand2 = '';
            } else if(operator == '-') {
                result = operand1 - operand2;
                screen.textContent = checkForOverflow(result);

                operator = event.target.textContent;
                operand1 = result;
                operand2 = '';
            } else if(operator == '*') {
                result = operand1 * operand2;
                screen.textContent = checkForOverflow(result);

                operator = event.target.textContent;
                operand1 = result;
                operand2 = '';
            } else if(operator == '/') {
                result = operand1 / operand2;
                screen.textContent = checkForOverflow(result);

                operator = event.target.textContent;
                operand1 = result;
                operand2 = '';
            }
        }
    }

    function processEqual() {
        newCalculation = true;
        if(!operator) {
            return;
        } else if (operator == '+') {
            result = +operand1 + +operand2;
            screen.textContent = checkForOverflow(result);
            operand1 = result;
        } else if(operator == '-') {
            result = operand1 - operand2;
            screen.textContent = checkForOverflow(result);
            operand1 = result;
        } else if(operator == '*') {
            result = operand1 * operand2;
            screen.textContent = checkForOverflow(result);
            operand1 = result;
        } else if(operator == '/') {
            result = operand1 / operand2;
            screen.textContent = checkForOverflow(result);
            operand1 = result;
        }
    }

    function processKeyboard(event) {

        let numberButtons = document.querySelectorAll('[data-number]');
        for (let numberButton of numberButtons) {
            if (numberButton.dataset.number == event.key) {
                let event = new MouseEvent('click', {
                    view: window,
                    bubbles: true,
                    cancelable: true
                });

                let equalButton = document.querySelector('.calculator__controls-button_result');
                equalButton.focus();

                numberButton.dispatchEvent(event);
            }
        }

        let operatorButtons = document.querySelectorAll('.calculator__controls-button_operator');
        for (let operatorButton of operatorButtons) {
            if (operatorButton.textContent == event.key) {
                let event = new MouseEvent('click', {
                    view: window,
                    bubbles: true,
                    cancelable: true
                });

                operatorButton.dispatchEvent(event);
            }
        }

        if (event.key == 'Delete') {
            clearInput();
        }
    }

    /* Round the output to fit in the screen */

    function checkForOverflow(output) {
        if (output.toString().length >= 10) {
            try {
                return +output.toFixed(10-Math.round(output).toString().length);
            } catch {
                return Number.parseFloat(output).toExponential(2);
            }
        } else {
            return +output;
        }
    }

    /* Turn on the calculator */

    function startNumberButtons() {
        let numberButtons = document.querySelectorAll('[data-number]');
        for (let numberButton of numberButtons) {
            numberButton.addEventListener('click', processNumber);
        }
    }

    function startClearButton() {
        let clearButton = document.querySelector('.calculator__controls-button_clear');
        clearButton.addEventListener('click', clearInput);
    }

    function startOperatorButtons() {
        let operatorButtons = document.querySelectorAll('.calculator__controls-button_operator');
        for (let operatorButton of operatorButtons) {
            operatorButton.addEventListener('click', processOperator);
        }
    }

    function startEqualButton() {
        let equalButton = document.querySelector('.calculator__controls-button_result');
        equalButton.addEventListener('click', processEqual);
    }

    function startKeyboardSupport() {
        let controls = document.querySelector('.calculator__controls');
        controls.addEventListener('keyup', processKeyboard);
    }

    /* Turn off the calculator */

    function terminateNumberButtons() {
        let numberButtons = document.querySelectorAll('[data-number]');
        for (let numberButton of numberButtons) {
            numberButton.removeEventListener('click', processNumber);
        }
    }

    function terminateClearButton() {
        let clearButton = document.querySelector('.calculator__controls-button_clear');
        clearButton.removeEventListener('click', clearInput);
    }

    function terminateOperatorButtons() {
        let operatorButtons = document.querySelectorAll('.calculator__controls-button_operator');
        for (let operatorButton of operatorButtons) {
            operatorButton.removeEventListener('click', processOperator);
        }
    }

    function terminateEqualButton() {
        let equalButton = document.querySelector('.calculator__controls-button_result');
        equalButton.removeEventListener('click', processEqual);
    }

    function terminateKeyboardSupport() {
        let controls = document.querySelector('.calculator__controls');
        controls.removeEventListener('keyup', processKeyboard);
    }
}
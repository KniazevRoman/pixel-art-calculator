import {checkForOverflow} from "./round.js";
import {state} from "./state.js";

export function processNumber(event) {
    if (state.screen.textContent.length == 10 && !state.startNewInput && !state.newCalculation) {
        console.log('Input is ignored. No free space on the screen');
        return;
    } else if(state.screen.textContent.indexOf('.') != -1 && event.target.dataset.number == '.' && !state.startNewInput && !state.newCalculation) {
        console.log('Input is ignored. The dot has already been inputed');
        return;
    }

    if(state.newCalculation) {
        state.operand1 = '';
        state.operator = '';
        state.operand2 = '';
        state.result = '';
        state.screen.textContent = '';

        state.newCalculation = false;
    }

    if(!state.operator) {
        if (!state.operand1) {
            state.screen.textContent = event.target.dataset.number;
            state.operand1 += event.target.dataset.number;
        } else {
            state.screen.textContent += event.target.dataset.number;
            state.operand1 += event.target.dataset.number;
        }
    } else {
        if (state.startNewInput) {
            state.startNewInput = false;
            state.screen.textContent = event.target.dataset.number;
            state.operand2 += event.target.dataset.number;
        } else {
            state.screen.textContent += event.target.dataset.number;
            state.operand2 += event.target.dataset.number;
        }
    }
    
    
}

export function clearInput() {
    state.screen.textContent = '0';
    if(state.newCalculation) {
        state.operand1 = '';
        state.operator = '';
        state.operand2 = '';
        state.result = '';
    }else if(!state.operator) {
        state.operand1 = '';
    } else {
        state.operand2 = '';
    }
}

export function processOperator(event) {
    state.startNewInput = true;

    if(!state.operator || state.newCalculation) {
        state.operator = event.target.textContent;
        state.operand2 = '';
        state.newCalculation = false;
    } else {
        if (state.operator == '+') {
            state.result = +state.operand1 + +state.operand2;
            state.screen.textContent = checkForOverflow(state.result);

            state.operator = event.target.textContent;
            state.operand1 = state.result;
            state.operand2 = '';
        } else if(state.operator == '-') {
            state.result = state.operand1 - state.operand2;
            state.screen.textContent = checkForOverflow(state.result);

            state.operator = event.target.textContent;
            state.operand1 = state.result;
            state.operand2 = '';
        } else if(state.operator == '*') {
            state.result = state.operand1 * state.operand2;
            state.screen.textContent = checkForOverflow(state.result);

            state.operator = event.target.textContent;
            state.operand1 = state.result;
            state.operand2 = '';
        } else if(state.operator == '/') {
            state.result = state.operand1 / state.operand2;
            state.screen.textContent = checkForOverflow(state.result);

            state.operator = event.target.textContent;
            state.operand1 = state.result;
            state.operand2 = '';
        }
    }
}

export function processEqual() {
    state.newCalculation = true;
    if(!state.operator) {
        return;
    } else if (state.operator == '+') {
        state.result = +state.operand1 + +state.operand2;
        state.screen.textContent = checkForOverflow(state.result);
        state.operand1 = state.result;
    } else if(state.operator == '-') {
        state.result = state.operand1 - state.operand2;
        state.screen.textContent = checkForOverflow(state.result);
        state.operand1 = state.result;
    } else if(state.operator == '*') {
        state.result = state.operand1 * state.operand2;
        state.screen.textContent = checkForOverflow(state.result);
        state.operand1 = state.result;
    } else if(state.operator == '/') {
        state.result = state.operand1 / state.operand2;
        state.screen.textContent = checkForOverflow(state.result);
        state.operand1 = state.result;
    }
}

export function processKeyboard(event) {

    let numberButtons = document.querySelectorAll('[data-number]');
    for (let numberButton of numberButtons) {
        if (numberButton.dataset.number == event.key) {
            let event = new MouseEvent('click', {
                view: window,
                bubbles: true,
                cancelable: true
            });

            let equalButton = document.querySelector('.calculator__controls-button_state.result');
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
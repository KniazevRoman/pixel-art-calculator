import * as process from "./process.js";

export function terminateNumberButtons() {
    let numberButtons = document.querySelectorAll('[data-number]');
    for (let numberButton of numberButtons) {
        numberButton.removeEventListener('click', process.processNumber);
    }
}

export function terminateClearButton() {
    let clearButton = document.querySelector('.calculator__controls-button_clear');
    clearButton.removeEventListener('click', process.clearInput);
}

export function terminateOperatorButtons() {
    let operatorButtons = document.querySelectorAll('.calculator__controls-button_operator');
    for (let operatorButton of operatorButtons) {
        operatorButton.removeEventListener('click', process.processOperator);
    }
}

export function terminateEqualButton() {
    let equalButton = document.querySelector('.calculator__controls-button_result');
    equalButton.removeEventListener('click', process.processEqual);
}

export function terminateKeyboardSupport() {
    let controls = document.querySelector('.calculator__controls');
    controls.removeEventListener('keyup', process.processKeyboard);
}
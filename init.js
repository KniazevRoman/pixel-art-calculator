import * as terminate from "./terminate.js";
import * as process from "./process.js";
import {state} from "./state.js";

export function startNumberButtons() {
    let numberButtons = document.querySelectorAll('[data-number]');
    for (let numberButton of numberButtons) {
        numberButton.addEventListener('click', process.processNumber);
    }
}

export function startClearButton() {
    let clearButton = document.querySelector('.calculator__controls-button_clear');
    clearButton.addEventListener('click', process.clearInput);
}

export function startOperatorButtons() {
    let operatorButtons = document.querySelectorAll('.calculator__controls-button_operator');
    for (let operatorButton of operatorButtons) {
        operatorButton.addEventListener('click', process.processOperator);
    }
}

export function startEqualButton() {
    let equalButton = document.querySelector('.calculator__controls-button_result');
    equalButton.addEventListener('click', process.processEqual);
}

export function startKeyboardSupport() {
    let controls = document.querySelector('.calculator__controls');
    controls.addEventListener('keyup', process.processKeyboard);
}

export function startCalculator() {
    let powerButton = document.querySelector('.calculator__controls-button_power');
    let powerIndicator = document.querySelector('.calculator__controls-power-indicator');
    powerButton.addEventListener('click', ()=> {
        if (!state.powered) {
            state.powered = true;
            powerIndicator.style.backgroundColor = 'rgb(9, 240, 59)';
            state.screen.textContent = '0';
            state.operand1 = '';
            state.operator = '';
            state.operand2 = '';
            state.result = '';
            startNumberButtons();
            startClearButton();
            startOperatorButtons();
            startEqualButton();
            startKeyboardSupport();
        } else {
            state.powered = false;
            powerIndicator.style.backgroundColor = 'rgb(50, 50, 104)';
            state.screen.textContent = '';
            state.operand1 = '';
            state.operator = '';
            state.operand2 = '';
            state.result = '';
            terminate.terminateNumberButtons();
            terminate.terminateClearButton();
            terminate.terminateOperatorButtons();
            terminate.terminateEqualButton();
            terminate.terminateKeyboardSupport();
        }
    });
}
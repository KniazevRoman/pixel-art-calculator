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


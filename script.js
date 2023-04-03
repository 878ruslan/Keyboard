const result = document.querySelector('.result');
const form = document.querySelector('#form');

const ENGLISH = 'qwertyuiopasdfghjklzxcvbnm';
const NUMBERS = '1234567890';
const OPERATORS = ['Caps Lock', 'Backspace', 'Language'];
const RUSSIAN = 'йцукенгшщзхъфывапролджэячсмитьбю';

let currentLanguage = ENGLISH;

function renderKeyboard(language) {
    let keyboard = '';
    
    if (language === ENGLISH) {
        ENGLISH.split('').forEach((char) => {
            keyboard += `<button data-type="letter">${char}</button>`;
        });
    } else if (language === RUSSIAN) {
        RUSSIAN.split('').forEach((char) => {
            keyboard += `<button data-type="letter">${char}</button>`;
        });
    }
    
    NUMBERS.split('').forEach((char) => {
        keyboard += `<button data-type="number">${char}</button>`;
    });

    OPERATORS.forEach((char) => {
        keyboard += `<button data-type="${char}">${char}</button>`;
    });
    
    form.innerHTML = keyboard;
}

window.addEventListener('load', () => {
    renderKeyboard(currentLanguage);
});

form.addEventListener('click', (event) => {
    event.preventDefault();

    if (event.target.nodeName !== 'BUTTON') return;

    const type = event.target.dataset.type;
    if (type === 'letter' || type === 'number') {
        const value = event.target.innerText;
        result.innerHTML += value;
        return;
    }
    if (type === 'Caps Lock') {
        const letters = form.querySelectorAll('button[data-type="letter"]');
        for (let letter of letters) {
            const isUppercase = letter.innerHTML === letter.innerHTML.toUpperCase();
            letter.innerHTML = isUppercase
            ? letter.innerHTML.toLowerCase()
            : letter.innerHTML.toUpperCase();
        }
        return;
    }
    if (type === 'Backspace') {
        result.innerHTML = result.innerHTML.slice(0, result.innerHTML.length - 1);
        return;
    }
    if (type === 'Language') {
        currentLanguage = currentLanguage === ENGLISH ? RUSSIAN : ENGLISH;
        renderKeyboard(currentLanguage);
        return;
    }
});
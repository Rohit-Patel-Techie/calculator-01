const calculator = {
    displayValue: '',
    fullExpression: '',
    justEvaluated: false, // Flag to track if just evaluated an expression
};

function updateDisplay() {
    const display = document.querySelector('.calculator-screen');
    display.value = calculator.displayValue || '0';
}

updateDisplay();

const keys = document.querySelector('.calculator-keys');
keys.addEventListener('click', (event) => {
    const { target } = event;
    const { value } = target;
    if (!target.matches('button')) {
        return;
    }

    handleInput(value);
});

function handleInput(value) {
    if (value === 'clear') {
        resetCalculator();
    } else if (value === 'ce') {
        calculator.displayValue = '';
        calculator.fullExpression = '';
    } else if (value === '=') {
        handleEqualSign();
    } else {
        inputCharacter(value);
    }
    updateDisplay();
}

function handleEqualSign() {
    try {
        calculator.displayValue = `${parseFloat(eval(calculator.fullExpression).toFixed(7))}`;
        calculator.fullExpression = calculator.displayValue; // Set the result as the starting point for new calculations
        calculator.justEvaluated = true; // Set flag to indicate we've just evaluated an expression
    } catch (error) {
        calculator.displayValue = 'Error';
    }
}

function inputCharacter(char) {
    if (calculator.justEvaluated && isOperator(char)) {
        calculator.justEvaluated = false;
        calculator.fullExpression += char; // Continue with the previous result
    } else if (calculator.justEvaluated && !isOperator(char)) {
        calculator.fullExpression = ''; // Start new expression after pressing a number
        calculator.justEvaluated = false;
        calculator.fullExpression += char;
    } else {
        calculator.fullExpression += char;
    }
    calculator.displayValue = calculator.fullExpression; // Update display with full expression
}

function resetCalculator() {
    calculator.displayValue = '';
    calculator.fullExpression = '';
    calculator.justEvaluated = false;
}

function isOperator(char) {
    return ['+', '-', '*', '/'].includes(char);
}

// Handle keyboard input
document.addEventListener('keydown', (event) => {
    const key = event.key;
    const keyMappings = {
        'Enter': '=',
        'Backspace': 'ce',
        'Escape': 'clear',
        '+': '+',
        '-': '-',
        '*': '*',
        '/': '/',
        '.': '.',
        '0': '0',
        '1': '1',
        '2': '2',
        '3': '3',
        '4': '4',
        '5': '5',
        '6': '6',
        '7': '7',
        '8': '8',
        '9': '9',
    };

    const value = keyMappings[key];
    if (value !== undefined) {
        handleInput(value);
    }
});

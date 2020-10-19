// 

// ---------------------------- variables ----------------------------
// connect to html
const calculatorDisplay = document.querySelector('h1');
const inputBtns = document.querySelectorAll('button');  // array
const clearBtn = document.getElementById('clear-btn');

let firstVal = 0;
let operatorVal = '';
let awaitingNextVal = false;

// first and second values depending on operator (key: value)
const calculate = {
  '+': (firstNum, secondNum) => firstNum + secondNum,
  '-': (firstNum, secondNum) => firstNum - secondNum,
  '/': (firstNum, secondNum) => firstNum / secondNum,
  '*': (firstNum, secondNum) => firstNum * secondNum,
  '=': (firstNum, secondNum) => secondNum
};

// ---------------------------- functions ----------------------------

// ---> IF NUMBER WAS PRESSED
function sendNumberValue(number) {
  // replace current value if the first value is already entered
  if (awaitingNextVal) {
    calculatorDisplay.textContent = number;
    awaitingNextVal = false;
  } else {
    // if current display value is 0, replace it, if not add number to display value
    const displayVal = calculatorDisplay.textContent;
    calculatorDisplay.textContent = displayVal === '0' ? number : displayVal + number;
  }
}

// ---> IF DECIMAL WAS PRESSED
// only 1 decimal can be used
function addDecimal() {
  // don't add decimal when operator is pressed
  if (awaitingNextVal) return;
  // add decimal if none
  if (!calculatorDisplay.textContent.includes('.')) {
    calculatorDisplay.textContent = `${calculatorDisplay.textContent}.`;  // decimal at the end
  }
}

// ---> IF OPERATOR WAS PRESSED
function useOperator(operator) {
  // convert string value from display to an actual number
  const currentValue = Number(calculatorDisplay.textContent);

  // avoid multiple operators
  if (operatorVal && awaitingNextVal) {
    operatorVal = operator;
    return;
  }

  // assign firstVal if no value
  if (!firstVal) {
    firstVal = currentValue;
  } else {
    console.log(firstVal);
    console.log(currentValue);
    // store result
    const calculation = calculate[operatorVal](firstVal, currentValue);
    calculatorDisplay.textContent = calculation;
    firstVal = calculation;
  }

  // ready for next value
  awaitingNextVal = true;   // triggered after operator was pressed (get ready for the 2nd value)
  operatorVal = operator;
}


// reset all
function resetAll() {
  firstVal = 0;
  operatorVal = '';
  awaitingNextVal = false;

  calculatorDisplay.textContent = '0';
}

// ---------------------------- event listeners ----------------------------

inputBtns.forEach((inputBtn) => {   // for each item in an array

  // if it's a number
  if (inputBtn.classList.length === 0) {
    inputBtn.addEventListener('click', () => sendNumberValue(inputBtn.value));
  } 
  // if operator
  else if (inputBtn.classList.contains('operator')) {
    inputBtn.addEventListener('click', () => useOperator(inputBtn.value));
  } 
  // decimal
  else if (inputBtn.classList.contains('decimal')) {
    inputBtn.addEventListener('click', () => addDecimal());
  }

});

clearBtn.addEventListener('click', resetAll);

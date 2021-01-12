const defaultResult = 0;
let currentResult = defaultResult;
let logEntries = [];

// Gets input from input field
function getUserNumberInput() {
	return parseInt(userInput.value);
}

//Generates and writes calculation log
function createAndWriteOutput(operator, resultBeforeCalc, calcNumber) {
	const calcDescription = `${resultBeforeCalc} ${operator} ${calcNumber}`;
	outputResult(currentResult, calcDescription);
}

function writeToLog(
	operationIdentifier,
	prevResult,
	operationNumber,
	newResult
) {
	const logEntry = {
    	operation: operationIdentifier,
		prevResult: prevResult,
		number: operationNumber,
		result: newResult,
	};
	logEntries.push(logEntry);
	console.log(logEntries);
}

function calculateResult(calculationType){

	const enteredNumber = getUserNumberInput();

	if (
		calculationType !== 'ADD' && 
		calculationType !== 'SUBSTRACT' &&
		calculationType !== 'MULTIPLY' && 
		calculationType !== 'DIVIDE' ||
		!enteredNumber === 0
	)	{ 
		return;
	}
	const initialResult = currentResult;
	let mathOperator;

	if (calculationType === 'ADD') {
		currentResult += enteredNumber;
		mathOperator = '+';
	} 
	else if (calculationType === 'SUBSTRACT') {
		currentResult -= enteredNumber;
		mathOperator = '-';
	} 
	else if (calculationType === 'MULTIPLY') {
		currentResult *= enteredNumber;
		mathOperator = '*';
	} 
	else if (calculationType === 'DIVIDE') {
		currentResult /= enteredNumber;
		mathOperator = '/';
	}

	createAndWriteOutput(mathOperator, initialResult, enteredNumber);
	writeToLog(calculationType, initialResult, enteredNumber, currentResult);	
}

///////////////////////////////// This aproach down here is replaced by bind method !


// function add(num1, num2) {
// 	calculateResult("ADD")
// }

// function substract() {
// 	calculateResult("SUBSTRACT")
// }

// function multiply() {
// 	calculateResult("MULTIPLY")
// }

// function divide() {
// 	calculateResult("DIVIDE")
// }
//////////////////////////////////////////////down here////////////////

addBtn.addEventListener("click", calculateResult.bind(this, 'ADD'));
subtractBtn.addEventListener("click", calculateResult.bind(this, 'SUBSTRACT'));
multiplyBtn.addEventListener("click", calculateResult.bind(this, 'MULTIPLY'));
divideBtn.addEventListener("click", calculateResult.bind(this, 'DIVIDE'));

//currentResult.toString();                         # to string
//currentResult.toString() + +(userInput.value);   #instead of parseFloat/Int()
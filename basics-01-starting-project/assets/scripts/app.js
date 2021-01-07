const defaultResult = 0;
let currentResult = defaultResult;
let logEntries = [];

// Gets input from input field
function getUserNumberInput() {
		return userInput.value;
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

function add(num1, num2) {
		const enteredNumber = getUserNumberInput();
		const initialResult = currentResult;
		currentResult += enteredNumber;
		createAndWriteOutput("+", initialResult, enteredNumber);
		writeToLog('ADD', initialResult, enteredNumber, currentResult);
}

function substract() {
		const enteredNumber = getUserNumberInput();
		const initialResult = currentResult;
		currentResult -= enteredNumber;
		createAndWriteOutput("-", initialResult, enteredNumber);
		writeToLog('SUBSTRACT', initialResult, enteredNumber, currentResult);
}

function multiply() {
		const enteredNumber = getUserNumberInput();
		const initialResult = currentResult;
		currentResult *= enteredNumber;
		createAndWriteOutput("*", initialResult, enteredNumber);
		writeToLog('MULTIPLY', initialResult, enteredNumber, currentResult);
}

function divide() {
		const enteredNumber = getUserNumberInput();
		const initialResult = currentResult;
		currentResult /= enteredNumber;
		createAndWriteOutput("/", initialResult, enteredNumber);
		writeToLog('DIVIDE', initialResult, enteredNumber, currentResult);
}

addBtn.addEventListener("click", add);
subtractBtn.addEventListener("click", substract);
multiplyBtn.addEventListener("click", multiply);
divideBtn.addEventListener("click", divide);

// currentResult.toString();                         # to string
// currentResult.toString() + +(userInput.value);   #instead of parseFloat/Int()

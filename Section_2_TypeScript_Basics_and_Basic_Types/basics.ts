// ': number/boolean/string' assinging type number/boolean/string to function parameters
function add(n1: number, n2: number, showResult: boolean, phrase: string) {
	// if (typeof n1 !== "number" || typeof n2 !== "number") {
	// 	throw new Error("Incorrect Input!");
	// }
	const result = n1 + n2;
	if (showResult) {
		console.log(phrase + result);
	} else {
		return result;
	}
}

// TypeScript (type inference) meaning it can figure out what the type of a variable will be
// const number1 = 5; // 5.0 no difference
let number1: number;
number1 = 5;
const number2 = 2.8; // literal type meaning what type and value it should hold
const printResult = true;
let resultPhrase = "Result is: ";

add(number1, number2, printResult, resultPhrase);

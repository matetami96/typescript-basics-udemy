// function add(n1: number, n2: number): number <= return type of the function infered by TypeScript
function add(n1: number, n2: number) {
	return n1 + n2;
}

// special 'void' return type because we do not return anything from this function
// :undefined can be used if you use the 'return;' keyword inside the function
function printResult(num: number): void {
	console.log("Result: " + num);
}

// cb = callback function
// by adding a void return type we tell TypeScript that we will not do anything
// with the returned value of the callback inside 'addAndHandle'
function addAndHandle(n1: number, n2: number, cb: (num: number) => void) {
	const result = n1 + n2;
	cb(result);
}

printResult(add(5, 12));

// 'Function' type assigned
// let combineValues: Function;

// 'Function' type assigned
// combineValues should accept any function
// that takes two parameters both of type number
// and the function overall returns a number
let combineValues: (a: number, b: number) => number;

// storing a pointer at a function in a variable
// later we can execute that variable as a function
// because it points at the 'add' function
combineValues = add;
// combineValues = printResult;
// combineValues = 5;

console.log(`combineValues(8, 8): = ${combineValues(8, 8)}`);

// let someValue: undefined;

addAndHandle(10, 20, (result) => {
	console.log(`addAndHandle result: ${result}`);
	// return result; // can return a value without problem
	// because 'addAndHandle' will ignore it
});

// function sendRequest(data: string, cb: (response: any) => void) {
// 	// ... sending a request with "data"
// 	return cb({ data: "Hi there!" });
// }

// sendRequest("Send this!", (response) => {
// 	console.log(response);
// 	return true;
// });

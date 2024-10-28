// 'unknown' type is better than 'any' but needs extra check
let userInput: unknown;
let userName: string;

// we can assign any type of value
userInput = 26;
userInput = "Tomi";
// type unknown is not guaranteed to be a string
// userName = userInput;
// type check
if (typeof userInput === "string") {
	userName = userInput;
}

// this function never produces a value hence it returns the type 'never'
function generateError(message: string, code: number): never {
	throw { message: message, errorCode: code };
}

generateError("An error occured!", 500);

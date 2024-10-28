// TOPIC CONST AND LET
/* const userName = "Tomi";
// userName = 'Todd';
let age = 26;
age = 29; */
// let with 'let' you have global, block and function scope
// var with 'var' you have global and function scope

/* function add(a: number, b: number) {
	let result;
	result = a + b;
	return result;
} */

/* if (age > 20) {
	let isOld = true;
}

console.log(isOld);
console.log(result); */

// TOPIC ARROW FUNCTION(S) AND PARAMETERS WITH DEFAULT VALUES
// default function parameters have to be last in the list
// if you give 'a' a default value and call add(5) like this
// the value '5' will be assigned to variable 'a' and not 'b'
/* const add = (a: number, b: number = 1) => a + b;

const printOutput: (a: number | string) => void = (output) =>
	console.log(output);

const button = document.querySelector("button");

if (button) {
	button.addEventListener("click", (event) => console.log(event));
}

printOutput(add(5)); */

// TOPIC SPREAD OPERATOR
const hobbies = ["Sports", "Cooking"];
const activeHobbies = ["Hiking"];
// '...' <= spread operator
// pull the elements of hobbies and add them as list items to activeHobbies
activeHobbies.push(...hobbies);

const person = {
	firstName: "Tomi",
	age: 26,
};
// copying the pointer at this person object in memory into this copiedPerson instant/variable
// this is NOT a real copy of this object
// const copiedPerson = person;

// creating a new object with the key:value pairs taken from person thus making a perfect copy here
const copiedPerson = { ...person };

// TOPIC REST PARAMETERS
// ...numbers => merge all incoming parameters/the incoming comma separated list of values
// into an array
const add = (...numbers: number[]) => {
	return numbers.reduce((curResult, curValue) => {
		return curResult + curValue;
	}, 0);
};

const addedNumbers = add(5, 10, 2, 3.7);
console.log(addedNumbers);

// TOPIC ARRAY AND OBJECT DESTRUCTURING
// array destructuring
const [hobby1, hobby2, ...remainingHobbies] = hobbies;
console.log(hobbies, hobby1, hobby2);
// object destructuring
const { firstName: userName, age } = person;
console.log(userName, age, person);

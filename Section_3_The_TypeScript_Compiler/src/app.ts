/* let age: number;
age = 26;
const userName = "Tomi";

console.log(userName);
 */

// ! exclamation mark means TSC do not worry we will get a value here
/* const button = document.querySelector("button")!;
button.addEventListener("click", () => {
	console.log("Clicked!");
}); */
let appId = "abc";
const button = document.querySelector("button");

function add(n1: number, n2: number) {
	if (n1 + n2 > 0) {
		return n1 + n2;
	}
	return;
}

function clickHandler(message: string) {
	// let userName = "Tomi";
	console.log("Clicked! " + message);
}

// a comment
if (button) {
	button.addEventListener("click", clickHandler.bind(null, "You're welcome!")); // strict bind call apply
}

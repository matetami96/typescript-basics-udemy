// '!' => means this will never yield null / will always find an element
const button = document.querySelector("button")!;
// 'as HTMLInputElement;' => a syntax called type casting which will let
// TypeScript know what type of element this will be
const input1 = document.getElementById("num1")! as HTMLInputElement;
const input2 = document.getElementById("num2")! as HTMLInputElement;

// ': number' => giving type number to a function parameter
function add(num1: number, num2: number) {
	return num1 + num2;
}

button.addEventListener("click", function () {
	// '+inputX.value' => converting a value of type string to type number
	console.log(add(+input1.value, +input2.value));
});

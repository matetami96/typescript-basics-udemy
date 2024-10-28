// '!' => means this will never yield null / will always find an element
var button = document.querySelector("button");
// 'as HTMLInputElement;' => a syntax called type casting which will let
// TypeScript know what type of element this will be
var input1 = document.getElementById("num1");
var input2 = document.getElementById("num2");
// ': number' => giving type number to a function parameter
function add(num1, num2) {
    return num1 + num2;
}
button.addEventListener("click", function () {
    // '+inputX.value' => converting a value of type string to type number
    console.log(add(+input1.value, +input2.value));
});

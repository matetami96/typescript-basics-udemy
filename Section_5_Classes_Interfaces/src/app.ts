// type AddFn = (a: number, b: number) => number;

// interface as function type
interface AddFn {
	(a: number, b: number): number;
}

let add: AddFn;

add = (n1: number, n2: number) => {
	return n1 + n2;
};

// an interface describes the structure of an object
// only exists in TypeScript not Vanilla JS
interface Named {
	// must only be set once by readonly modifier
	readonly name?: string;
	// propertyName? / myMethod?() this means
	// propertyName/myMethod() could exist but it is not necessary
	outputName?: string;
}

// interface extends other one
interface Greetable extends Named {
	greet(phrase: string): void;
}

// class implementing interface
// classes can implement multiple interfaces but
// can only extend from one parent class
class Person implements Greetable {
	name?: string;
	age = 26;

	constructor(n?: string) {
		if (n) {
			this.name = n;
		}
	}
	// constructor(public name: string, public age: number = 26) {}

	greet(phrase: string) {
		if (this.name) {
			console.log(phrase + " " + this.name);
		} else {
			console.log("Hi!");
		}
	}
}

// custom type(s)
/* type Person = {
	name: string;
	age: number;

	greet(phrase: string): void;
} */

let user1: Greetable;
// Person class is based on Greetable interface because it implements it
user1 = new Person();
// user1 = new Person("Tomi");
// user1.name = "Emocike";

user1.greet("Hello there - I'm");
console.log(user1);

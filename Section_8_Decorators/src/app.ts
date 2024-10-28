// DECORATORS = are functions that you apply to something
// like a class in a certain way
// Decorators execute when your class is DEFINED
// NOT when the class is instantiated
/* function Logger(constructor: Function) {
	console.log("Logging");
	console.log(constructor);
} */
// decorator function execution is from bottom up

// decorator factory
function Logger(logString: string) {
	console.log("LOGGER FACTORY");
	return function (constructor: Function) {
		console.log(logString);
		console.log(constructor);
	};
}
// decorator factory
function WithTemplate(template: string, hookId: string) {
	// giving "_" as a parameter signals TypeScript that
	// the param is there to satisfy the rules but it
	// will not be used at all
	console.log("TEMPLATE FACTORY");
	return function <T extends { new (...args: any[]): { name: string } }>(originalConstructor: T) {
		// returning a new constructor function
		return class extends originalConstructor {
			constructor(..._: any[]) {
				super();
				console.log("Rendering template");
				const hookEl = document.getElementById(hookId);
				if (hookEl) {
					hookEl.innerHTML = template;
					hookEl.querySelector("h1")!.textContent = this.name;
				}
			}
		};
	};
}

// @Logger
// applying as decorator factory
@Logger("LOGGING - PERSON")
@WithTemplate("<h1>My Person Object</h1>", "app")
class Person {
	name = "Tomi";

	constructor() {
		console.log("Creating a person object...");
	}
}

const person = new Person();
console.log(person);

// Property decorators
function Log(target: any, propertyName: string | Symbol) {
	console.log("Property decorator!");
	console.log(target, propertyName);
}

function Log2(target: any, name: string, descriptor: PropertyDescriptor) {
	console.log("Accessor decorator!");
	console.log(target);
	console.log(name);
	console.log(descriptor);
}

function Log3(target: any, name: string | Symbol, descriptor: PropertyDescriptor) {
	console.log("Method decorator!");
	console.log(target);
	console.log(name);
	console.log(descriptor);
}

function Log4(target: any, name: string | Symbol, position: number) {
	console.log("Parameter decorator!");
	console.log(target);
	console.log(name);
	console.log(position);
}

class Product {
	// decorator added to property
	@Log
	title: string;
	private _price: number;

	// decorator added to accessor
	@Log2
	set price(val: number) {
		if (val > 0) {
			this._price = val;
		} else {
			throw new Error("Invalid price should be positive!");
		}
	}

	constructor(t: string, p: number) {
		this.title = t;
		this._price = p;
	}

	// decorators added to method and its parameter
	@Log3
	getPriceWithTax(@Log4 tax: number) {
		return this._price * (1 + tax);
	}
}

const p1 = new Product("Game", 15);
const p2 = new Product("Game 2", 16);

function Autobind(_: any, _2: string, descriptor: PropertyDescriptor) {
	const originalMethod = descriptor.value;
	const adjustedDescriptor: PropertyDescriptor = {
		configurable: true,
		enumerable: false,
		get() {
			// here "this" will refer to whatever is
			// responsible for triggering the "get" method
			// "this" in here will refer to the object on
			// which we originally defined the "get" method
			const boundFunction = originalMethod.bind(this);
			return boundFunction;
		},
	};
	return adjustedDescriptor;
}

class Printer {
	message = "This works!";

	@Autobind
	showMessage() {
		console.log(this.message);
	}
}

const printer = new Printer();
printer.showMessage();

const button = document.querySelector("button")!;
// button.addEventListener("click", printer.showMessage.bind(printer));
button.addEventListener("click", printer.showMessage);

interface ValidatorConfig {
	// index type notation
	[property: string]: {
		[validateableProp: string]: string[]; // ['required', 'positive']
	};
}

const registeredValidators: ValidatorConfig = {};

function Required(target: any, propName: string) {
	// registeredValidators is required to have index notation here
	// because that is how it was defined in the interface.
	registeredValidators[target.constructor.name] = {
		...registeredValidators[target.constructor.name],
		[propName]: [...(registeredValidators[target.constructor.name]?.[propName] ?? []), "required"],
	};
	console.log(`registeredValidators`, registeredValidators);
}

function PositiveNumber(target: any, propName: string) {
	// This next line of code adds all previously registered
	// validators before adding a new one so that there
	// is no loss of validators plus the new validator.
	registeredValidators[target.constructor.name] = {
		...registeredValidators[target.constructor.name],
		[propName]: [...(registeredValidators[target.constructor.name]?.[propName] ?? []), "positive"],
	};
}

//  The input obj is the object that we are validating.
function validate(obj: any) {
	// Because of the prototype chain (inheritance from the base class)
	// we can grab the name of the constructor of the object we are
	// validating and use it as a key to collect the validator configuration.
	const objValidatorConfig = registeredValidators[obj.constructor.name];
	// If the objValidatorConfig does not exist then skip it and mark it
	// as valid with true just so you can exit out and not cause a
	// problem with something that does not exist.
	if (!objValidatorConfig) {
		return true;
	}

	let isValid = true;
	// Start by looping through the object (Course) to get all the properties (title and price).
	// prop = title then prop = price.
	for (const prop in objValidatorConfig) {
		// Next we start looping through all the validators.
		for (const validator of objValidatorConfig[prop]) {
			// validator = 'required' then validator = 'positive';
			// Here we ask if the associated validator for this property
			// is a match with what we have hardcoded as a validator name.
			console.log("prop", prop, "validator", validator);
			switch (validator) {
				case "required":
					// !!obj[prop] (this asks if Course[title] is true or false. !! = this convert to boolean or truthy.)
					isValid = isValid && !!obj[prop];
					break;
				case "positive":
					isValid = isValid && obj[prop] > 0;
					break;
			}
		}
	}

	return isValid;
}

class Course {
	@Required
	title: string;
	@Required
	@PositiveNumber
	price: number;

	constructor(t: string, p: number) {
		this.title = t;
		this.price = p;
	}
}

const courseForm = document.querySelector("form")!;
courseForm.addEventListener("submit", (event) => {
	event.preventDefault();
	const titleElement = document.getElementById("title") as HTMLInputElement;
	const priceElement = document.getElementById("price") as HTMLInputElement;

	const title = titleElement.value;
	const price = +priceElement.value;

	const createdCourse = new Course(title, price);
	if (!validate(createdCourse)) {
		alert("Invalid input please try again!");
		return;
	}
	console.log("createdCourse", createdCourse);
});

type Admin = {
	name: string;
	privileges: string[];
};

type Employee = {
	name: string;
	startDate: Date;
};

// interface ElevatedEmployee extends Employee, Admin

// intersection type
type ElevatedEmployee = Admin & Employee;

const e1: ElevatedEmployee = {
	name: "Tomi",
	privileges: ["create-server"],
	startDate: new Date(),
};

type Combineable = string | number;
type Numeric = number | boolean;
type Universal = Combineable & Numeric;
// function overloading
function add(a: number, b: number): number;
function add(a: string, b: string): string;
function add(a: string, b: number): string;
function add(a: number, b: string): string;
function add(a: Combineable, b: Combineable) {
	// type guard with typeof runs at runtime
	if (typeof a === "string" || typeof b === "string") {
		return a.toString() + b.toString();
	}
	return a + b;
}

const result = add(1, 5);
// const result = add("Tamas", "Mate") as string;
const result2 = add("Tamas", " Mate");
result2.split(" ");

type Job = {
	title?: string;
	description?: string;
};

type UserData = {
	id: string;
	name: string;
	job?: Job;
};

const fetchedUserData: UserData = {
	id: "u1",
	name: "Tomi",
	// job: {},
	job: {
		title: "CEO",
		description: "My own company",
	},
};
// optional chaining operator/Elvis operator
console.log(fetchedUserData?.job?.title);

// nullish coalescing operator => if the value is null or undefined use
// the provided default
const userInput = undefined;
const storedData = userInput ?? "DEFAULT";
console.log(storedData);

type UnknownEmployee = Employee | Admin;

function printEmployeeInformation(emp: UnknownEmployee) {
	console.log("Name: " + emp.name);
	// check if property exists on given object with 'in'
	if ("privileges" in emp) {
		console.log("Privileges: " + emp.privileges);
	}
	if ("startDate" in emp) {
		console.log("Star tDate: " + emp.startDate);
	}
}

printEmployeeInformation(e1);
printEmployeeInformation({
	name: "Mocike",
	startDate: new Date(),
});

class Car {
	drive() {
		console.log("Driving...");
	}
}

class Truck {
	drive() {
		console.log("Driving a truck...");
	}

	loadCargo(amount: number) {
		console.log("Loading cargo ..." + amount);
	}
}

type Vehicle = Car | Truck;

const v1 = new Car();
const v2 = new Truck();

function useVehicle(vehicle: Vehicle) {
	vehicle.drive();
	/* if ("loadCargo" in vehicle) {
		vehicle.loadCargo(1000);
	} */
	// using 'instanceof' to find if vehicle
	// was created based on the Truck constructor
	if (vehicle instanceof Truck) {
		vehicle.loadCargo(1000);
	}
}

useVehicle(v1);
useVehicle(v2);
// discriminated union usage below
interface Bird {
	type: "bird";
	flyingSpeed: number;
}

interface Horse {
	type: "horse";
	runningSpeed: number;
}

type Animal = Bird | Horse;

function moveAnimal(animal: Animal) {
	let speed;
	switch (animal.type) {
		case "bird":
			speed = animal.flyingSpeed;
			break;

		case "horse":
			speed = animal.runningSpeed;
			break;
	}
	console.log("Moving at speed: " + speed);
}

moveAnimal({ type: "bird", flyingSpeed: 10 });

// type casting
// ! => this means the expression before it never yields null
const userInputElement = document.getElementById("user-input");
/* const userInputElement = document.getElementById(
	"user-input"
)! as HTMLInputElement; */
/* const userInputElement = <HTMLInputElement>document.getElementById("user-input")!; */
if (userInputElement) {
	(userInputElement as HTMLInputElement).value = "Hello there!";
}

// index type/property !!!
interface ErrorContainer {
	// { email: 'Not a valid email!', username: 'Must start with a character!' }
	// every property that is added to this object
	// which is based on ErrorContainer must have
	// a property name which can be interpreted as a string
	// and its value must also be a string
	[prop: string]: string;
}

const errorbag: ErrorContainer = {
	username: "Must start with a capital character!",
	email: "Not a valid email!",
};

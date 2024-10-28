// hover over 'person' to see Object type infered by TypeScript
/* const person = {
	name: "Tomi",
	age: 26,
}; */

// '{ key: typeValue; ... }' TypeScript notation of specialized object notation
/* const person: {
	name: string;
	age: number;
} = {
	name: "Tomi",
	age: 26,
}; */

/* const person: {
	name: string;
	age: number;
	hobbies: string[];
	role: readonly [number, string]; // <= this is a 'tuple' type having fixed length and types
	// with 'readonly' pushing will not be allowed nor changing types of already declared Tuples
} = {
	name: "Tomi",
	age: 26,
	hobbies: ["Sports", "Cooking"],
	// role: [2, "gamer"],
	role: [2, "gamer"],
}; */

// const ADMIN = 0;
// const READ_ONLY = 1;
// const AUTHOR = 2;

// enums are 'custom types'
enum Role {
	ADMIN = 5,
	READ_ONLY,
	AUTHOR,
}

const person = {
	name: "Tomi",
	age: 26,
	hobbies: ["Sports", "Cooking"],
	role: Role.ADMIN, // <= 'enum type'
};

// person.role.push("admin"); // <= array.push is not caught by TypeScript
// person.role[1] = 10; // <= this error is caught by TypeScript
// person.role = [0, "admin", "users"]; // <= this error is also caught if defined this way by TypeScript

// type is an array of strings
let favoriteActivities: string[];
favoriteActivities = ["Sports"];

console.log(person.name);

for (const hobby of person.hobbies) {
	console.log(hobby.toUpperCase());
	// console.log(hobby.map()); !!! ERROR !!!
}

if (person.role === Role.AUTHOR) {
	console.log("is author");
}

// Hover over product to see object type in an object type version of inference
/* const product = {
	id: "abc1",
	price: 12.99,
	tags: ["great-offer", "hot-and-new"],
	details: {
		title: "Red Carpet",
		description: "A great carpet - almost brand-new!",
	},
}; */

/* const names: Array<string> = [];
// names[0].split(" ");

const promise: Promise<number> = new Promise((resolve, reject) => {
	setTimeout(() => {
		// resolve("This is done!");
		resolve(10);
	}, 2000);
});

promise.then((data) => {
	// data.split(" ");
});
 */

// custom generic type
function merge<T extends object, U extends object>(objA: T, objB: U) {
	return Object.assign(objA, objB);
}
const mergedObj = merge({ name: "Tomi", hobbies: ["Gaming"] }, { age: 26 });
console.log(mergedObj.age);

interface Lengthy {
	length: number;
}
// here we only care that the function is called with a param that has a length property
function countAndDescribe<T extends Lengthy>(element: T): [T, string] {
	let descriptionText = "Got no value.";
	if (element.length === 1) {
		descriptionText = "Got 1 element.";
	} else if (element.length > 1) {
		descriptionText = "Got " + element.length + " elements.";
	}
	return [element, descriptionText];
}
console.log(countAndDescribe("Hello there!"));
console.log(countAndDescribe(["Sports", "Gaming"]));
console.log(countAndDescribe([]));

// keyof
function extractAndConvert<T extends object, U extends keyof T>(
	obj: T,
	key: U
) {
	return "Value: " + obj[key];
}
extractAndConvert({ name: "Tomi" }, "name");

// generic classes with constraints
class DataStorage<T extends string | number | boolean> {
	private data: T[] = [];

	addItem(item: T) {
		this.data.push(item);
	}

	removeItem(item: T) {
		if (this.data.indexOf(item) === -1) {
			return;
		}
		this.data.splice(this.data.indexOf(item), 1); // -1
	}

	getItems() {
		return [...this.data];
	}
}

const textStorage = new DataStorage<string>();
textStorage.addItem("Tomi");
textStorage.addItem("Emoke");
textStorage.addItem("Alpi");
textStorage.removeItem("Tomi");
console.log(textStorage.getItems());

const numberStorage = new DataStorage<number>();

/* const objStorage = new DataStorage<object>();
const tomObj = { name: "Tomi" };
objStorage.addItem(tomObj);
objStorage.addItem({ name: "Emoke" });
// ...
objStorage.removeItem(tomObj);
console.log(objStorage.getItems()); */

// Partial type built in
interface CourseGoal {
	title: string;
	description: string;
	completeUntil: Date;
}

function createCourseGoal(
	title: string,
	description: string,
	date: Date
): CourseGoal {
	let courseGoal: Partial<CourseGoal> = {};
	courseGoal.title = title;
	courseGoal.description = description;
	courseGoal.completeUntil = date;
	return courseGoal as CourseGoal;
	/* return {
		title: title,
		description: description,
		completeUntil: date,
	}; */
}

// Readonly type built in
const games: Readonly<string[]> = ["KOTOR1", "KOTOR2"];
// games.push("SWTOR");

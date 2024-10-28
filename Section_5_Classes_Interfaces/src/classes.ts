// any field/method marked abstract must be within an abstract class
// abstract classes can't be instantiated themselves
abstract class Department {
	static fiscalYear = 2023;
	// field(s) of a class
	// private access modifier
	// stuff marked with private can only be accessed from within this class

	// private readonly id: string;
	// private name: string;

	// protected access modifier will let other classes
	// that extend this class access it's fields/methods
	protected employees: string[] = [];
	// shorthand initialization
	constructor(protected readonly id: string, public name: string) {
		// this.id = id;
		// this.name = n;
		// console.log(Department.fiscalYear);
	}

	/* fields or methods marked with static
	can NOT be accessed by other methods of the class
	"this" refers to the instance created based on the class
	while "static" fields or methods are detached from instances */

	// method(s) of a class
	// using the static modifier on a method
	static createEmployee(name: string) {
		return { name: name };
	}

	// using the abstract keyword and marking the method
	// that must be implemented by every class that inherits from this
	abstract describe(this: Department): void;

	addEmployee(employee: string) {
		// validation etc.
		// this.id = 'd2';
		this.employees.push(employee);
	}

	printEmployeeInformation() {
		console.log(this.employees.length);
		console.log(this.employees);
	}
}
// TOPIC INHERITANCE, GET/SET(TERS)
class ITDepartment extends Department {
	admins: string[];
	constructor(id: string, admins: string[]) {
		// call parent's constructor
		super(id, "IT");
		this.admins = admins;
	}

	describe() {
		console.log("IT Department - ID: " + this.id);
	}
}

class AccountingDepartment extends Department {
	private lastReport: string;
	private static instance: AccountingDepartment;

	// getter
	get mostRecentReport() {
		if (this.lastReport) {
			return this.lastReport;
		}
		throw new Error("No report found.");
	}
	// setter
	set mostRecentReport(value: string) {
		if (!value) {
			throw new Error("Please pass in a valid value!");
		}
		this.addReport(value);
	}

	// PRIVATE CONSRTUCTOR AND SINGLETON CLASS
	private constructor(id: string, private reports: string[]) {
		// call parent's constructor
		super(id, "Accounting");
		this.lastReport = reports[0];
	}

	static getInstance() {
		if (AccountingDepartment.instance) {
			return this.instance;
		}
		this.instance = new AccountingDepartment("d2", []);
		return this.instance;
	}

	describe() {
		console.log("Accounting Department - ID: " + this.id);
	}

	// override the parent class's method addEmployee
	addEmployee(name: string) {
		if (name === "Alpi") {
			return;
		}
		this.employees.push(name);
	}

	addReport(text: string) {
		this.reports.push(text);
		this.lastReport = text;
	}

	printReports() {
		console.log(this.reports);
	}
}
// calling static method of a class
const employee1 = Department.createEmployee("Isti");
console.log(employee1, Department.fiscalYear);

const it = new ITDepartment("d1", ["Tomi"]);
it.addEmployee("Tomi");
it.addEmployee("Zsolti");
// it.employees[2] = "Mocike";
it.describe();
it.name = "NEW NAME";
it.printEmployeeInformation();
console.log(it);

// const accounting = new AccountingDepartment("d2", []);
const accounting = AccountingDepartment.getInstance();
const accounting2 = AccountingDepartment.getInstance();
console.log(accounting, accounting2);
// calling setter
accounting.mostRecentReport = "Year End Report";
accounting.addReport("Something went wrong...");
// calling getter
console.log(accounting.mostRecentReport);
accounting.addEmployee("Alpi");
accounting.addEmployee("Emoke");
// accounting.printReports();
// accounting.printEmployeeInformation();
accounting.describe();

// const accountingCopy = { name: "DUMMY", describe: accounting.describe };
// accountingCopy.describe();

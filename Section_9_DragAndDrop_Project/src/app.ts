// #region First attempt
/* const formTemplate = document.getElementById(
	"project-input"
)! as HTMLTemplateElement;
const form = formTemplate.content.cloneNode(true);
const app = document.getElementById("app")!;
app.appendChild(form); */
// #endregion

// #region Drag & Drop Interfaces
interface Draggable {
	dragStartHandler(event: DragEvent): void;
	dragEndHandler(event: DragEvent): void;
}

interface DragTarget {
	// the thing you are dragging over is a valid target
	// we need to tell this to JS and the Browser
	// basically check if the item is draggable
	dragOverHandler(event: DragEvent): void;
	// if dragOverHandler permits it then
	// dropHandler will handle the actual drop
	// update data and UI here
	dropHandler(event: DragEvent): void;
	// giving visual feedback to the user
	// when they drag something over the box
	// example => change background color
	// or if the drag event is cancelled we
	// use the dragLeaveHandler to revert the visual update
	dragLeaveHandler(event: DragEvent): void;
}
// #endregion

// #region State management
// Project enum type
enum ProjectStatus {
	Active,
	Finished,
}

// Project type
// Needed for more type safety and auto completion
class Project {
	// shorter version of initializing values
	// in the constructor, these will become
	// fields of the class that can be accessed
	// through instance.property
	constructor(
		public id: string,
		public title: string,
		public description: string,
		public people: number,
		public status: ProjectStatus
	) {}
}

// Listener type that is an anonymus function that
// gets Project type items array but returns nothing
type Listener<T> = (items: T[]) => void;

class State<T> {
	// 'private' fields or methods can not be accessed
	// from outside of the class but through class methods
	protected listeners: Listener<T>[] = [];

	// Here we register listeners that are functions that get arguments when called
	addListener(listenerFunction: Listener<T>) {
		this.listeners.push(listenerFunction);
	}
}

// Project State Management
class ProjectState extends State<Project> {
	private projects: Project[] = [];
	// The following lines of code are responsible
	// for making a singleton object that remains the same
	// in the application, and can be accessed from anywhere
	// via created instance. Also static fields or methods
	// can not be accessed through an instance of a class
	// but by using the class name instead
	private static instance: ProjectState;

	private constructor() {
		super();
	}
	// Here we make sure to create a single instance of our ProjectState
	// and return it anywhere we need it but we do not reproduce it ever
	// as long as the app runs
	static getInstance() {
		if (this.instance) {
			return this.instance;
		}
		this.instance = new ProjectState();
		return this.instance;
	}
	// Here we try to mimic state management like Redux by creating a new project
	// adding it to existing ones (if there are any) and then we go through
	// our listeners and call them with a new copy of our projects array
	// A new copy because of reference types
	addProject(title: string, description: string, numberOfPeople: number) {
		const newProject = new Project(Math.random().toString(), title, description, numberOfPeople, ProjectStatus.Active);
		this.projects.push(newProject);
		this.updatelisteners();
	}
	// change the status of the dragged project
	moveProject(projectId: string, newStatus: ProjectStatus) {
		const project = this.projects.find((project) => project.id === projectId);
		if (project && project.status !== newStatus) {
			project.status = newStatus;
		}
		this.updatelisteners();
	}
	// update the state of the projects
	private updatelisteners() {
		for (const listenerFunction of this.listeners) {
			// Pass a brand new copy of projects to the listenerFunction
			listenerFunction(this.projects.slice());
		}
	}
}
// Global State
// We are guaranteed to work with the exact same object in the whole application
// and we always have only one object of that type (state here) in the app
const projectState = ProjectState.getInstance();
// #endregion

// #region Validation
// An interface for our validation objects that are passed to the validate function
// ? means the value is optional instead of writing it out like | undefined
interface Validateable {
	value: string | number;
	required?: boolean;
	minLength?: number;
	maxLength?: number;
	min?: number;
	max?: number;
}

// Validation function called when submit is clicked
function validate(validatableInput: Validateable) {
	let isValid = true;

	if (validatableInput.required) {
		isValid = isValid && validatableInput.value.toString().trim().length !== 0;
	}

	// != includes null and undefined
	if (validatableInput.minLength != null && typeof validatableInput.value === "string") {
		isValid = isValid && validatableInput.value.length >= validatableInput.minLength;
	}

	if (validatableInput.maxLength != null && typeof validatableInput.value === "string") {
		isValid = isValid && validatableInput.value.length <= validatableInput.maxLength;
	}

	if (validatableInput.min != null && typeof validatableInput.value === "number") {
		isValid = isValid && validatableInput.value >= validatableInput.min;
	}

	if (validatableInput.max != null && typeof validatableInput.value === "number") {
		isValid = isValid && validatableInput.value <= validatableInput.max;
	}

	return isValid;
}
// #endregion

// #region Autobind Decorator
// Decorator usage enabled from tsconfig
// The purpose of this decorator is to bind the method it is attached to
// to the method's class.
// In other words when a method is bound to a click event
// listener for example, then the "this" keyword changes where it is pointing to,
// because of the eventlistener it will refer to the object the listener is added to
// a button/form for example. By binding the method to 'this' in the get accessor
// we make sure that 'this' will refer to the object that 'activated' the get
// accessor in the first place and that is the class the method belongs to
function autobind(_: any, _2: string, descriptor: PropertyDescriptor) {
	// Get the original descriptor of the method 'submitHandler'
	const originalMethod = descriptor.value;
	// Modify its PropertyDescriptor by giving it a new
	// 'get' accessor that binds the method to its class
	const adjustedDescriptor: PropertyDescriptor = {
		configurable: true,
		enumerable: false,
		// gets executed when you try to access the function
		get() {
			const boundFunction = originalMethod.bind(this);
			return boundFunction;
		},
	};
	return adjustedDescriptor;
}
// #endregion

// #region Component Base Class
// Because there are similarities in the code
// this class acts as a base for it
// and others who inherit from this will expand it
// with more functionalities
abstract class Component<T extends HTMLElement, U extends HTMLElement> {
	templateElement: HTMLTemplateElement;
	hostElement: T;
	element: U;

	constructor(templateId: string, hostElementId: string, insertAtStart: boolean, newElementId?: string) {
		// Content that I want to render
		// "!" means it will never yield null
		// as HTMLTemplateElement type casting to let TypeScript know
		// that templateElement's value will be an HTMLTemplateElement
		// <> angle brackets
		this.templateElement = document.getElementById(templateId)! as HTMLTemplateElement;
		// The place I want to render the content from above
		this.hostElement = document.getElementById(hostElementId)! as T;
		// We need a new copy of the template's content only once as Document Fragment
		const importedNode = document.importNode(this.templateElement.content, true);
		// Now we get the actual form html element and its children
		this.element = importedNode.firstElementChild as U;
		if (newElementId) {
			this.element.id = newElementId;
		}
		// Add the content of the template to the app element
		this.attach(insertAtStart);
	}

	private attach(insertAtBeginning: boolean) {
		this.hostElement.insertAdjacentElement(insertAtBeginning ? "afterbegin" : "beforeend", this.element);
	}

	abstract configure(): void;
	abstract renderContent(): void;
}
// #endregion

// #region Project Item Class
class ProjectItem extends Component<HTMLUListElement, HTMLLIElement> implements Draggable {
	private project: Project;

	get persons() {
		if (this.project.people === 1) {
			return "1 person";
		} else {
			return `${this.project.people} persons`;
		}
	}

	constructor(hostId: string, project: Project) {
		super("single-project", hostId, false, project.id);
		this.project = project;

		this.configure();
		this.renderContent();
	}
	// handle drag event start
	@autobind
	dragStartHandler(event: DragEvent) {
		// attach data, the id of the project we are moving so that
		// later we can access it from our state and change it's status as we like
		event.dataTransfer!.setData("text/plain", this.project.id);
		event.dataTransfer!.effectAllowed = "move";
	}
	// handle drag event end
	dragEndHandler(_: DragEvent) {
		console.log("DragEnd");
	}

	// listen for the drag event when an item from the list
	// is dragged by the user
	configure() {
		this.element.addEventListener("dragstart", this.dragStartHandler);
		this.element.addEventListener("dragend", this.dragEndHandler);
	}

	renderContent() {
		this.element.querySelector("h2")!.textContent = this.project.title;
		this.element.querySelector("h3")!.textContent = this.persons + " assigned";
		this.element.querySelector("p")!.textContent = this.project.description;
	}
}
// #endregion

// #region ProjectList Class
// This class is responsible for rendering our project lists and items
class ProjectList extends Component<HTMLDivElement, HTMLElement> implements DragTarget {
	assignedProjects: Project[];

	// Setting up our DOM elements and listeners
	constructor(private type: "active" | "finished") {
		super("project-list", "app", false, `${type}-projects`);
		this.assignedProjects = [];

		this.configure();
		this.renderContent();
	}

	// check if item can be dragged
	@autobind
	dragOverHandler(event: DragEvent) {
		// fires when you enter a dragable area with an item to be dragged
		// is the data attached to our drag event that format ('text/plain')
		if (event.dataTransfer && event.dataTransfer.types[0] === "text/plain") {
			// need to call this otherwise dropping is not allowed
			event.preventDefault();
			const listElement = this.element.querySelector("ul")!;
			listElement.classList.add("droppable");
		}
	}
	// react to the item being dragged and dropped
	@autobind
	dropHandler(event: DragEvent) {
		const projectId = event.dataTransfer!.getData("text/plain");
		projectState.moveProject(projectId, this.type === "active" ? ProjectStatus.Active : ProjectStatus.Finished);
	}
	// give visual feedback or revert it if drag is cancelled
	@autobind
	dragLeaveHandler(_: DragEvent) {
		const listElement = this.element.querySelector("ul")!;
		listElement.classList.remove("droppable");
	}

	// set up listener so when a new project is created it gets added to the list (active/finished)
	configure() {
		// listen for drag and drop events
		this.element.addEventListener("dragover", this.dragOverHandler);
		this.element.addEventListener("drop", this.dropHandler);
		this.element.addEventListener("dragleave", this.dragLeaveHandler);
		// state change listener
		projectState.addListener((projects: Project[]) => {
			const relevantProjects = projects.filter((project) => {
				if (this.type === "active") {
					return project.status === ProjectStatus.Active;
				}
				return project.status === ProjectStatus.Finished;
			});
			this.assignedProjects = relevantProjects;
			this.renderProjects();
		});
	}
	// Show the list
	renderContent() {
		const listId = `${this.type}-projects-list`;
		this.element.querySelector("ul")!.id = listId;
		this.element.querySelector("h2")!.textContent = this.type.toUpperCase() + " PROJECTS";
	}

	// When a project gets added the list should update
	private renderProjects() {
		const listElement = document.getElementById(`${this.type}-projects-list`)! as HTMLUListElement;
		// in a bigger project we should compare which items are duplicates by a certain logic
		// and remove them here we reset the list's content and rerender all list items
		listElement.innerHTML = "";
		for (const projectItem of this.assignedProjects) {
			new ProjectItem(this.element.querySelector("ul")!.id, projectItem);
		}
	}
}
// #endregion

// #region ProjectInput class
class ProjectInput extends Component<HTMLDivElement, HTMLFormElement> {
	titleInputElement: HTMLInputElement;
	descriptionInputElement: HTMLInputElement;
	peopleInputElement: HTMLInputElement;

	constructor() {
		super("project-input", "app", true, "user-input");
		this.titleInputElement = this.element.querySelector("#title") as HTMLInputElement;
		this.descriptionInputElement = this.element.querySelector("#description") as HTMLInputElement;
		this.peopleInputElement = this.element.querySelector("#people") as HTMLInputElement;

		this.configure();
	}

	configure() {
		// add submit event listener
		this.element.addEventListener("submit", this.submitHandler);
	}

	renderContent() {}

	// Return type is tuple which means it will return an array with exactly 3 elements
	private gatherUserInput(): [string, string, number] | void {
		const enteredTitle = this.titleInputElement.value;
		const enteredDescription = this.descriptionInputElement.value;
		const enteredPeople = this.peopleInputElement.value;

		const titleValidatable: Validateable = {
			value: enteredTitle,
			required: true,
		};
		const descriptionValidatable: Validateable = {
			value: enteredDescription,
			required: true,
			minLength: 5,
		};
		const peopleValidatable: Validateable = {
			value: +enteredPeople,
			required: true,
			min: 1,
			max: 5,
		};

		if (!validate(titleValidatable) || !validate(descriptionValidatable) || !validate(peopleValidatable)) {
			alert("Invalid input, please try again!");
			return;
		} else {
			return [enteredTitle, enteredDescription, +enteredPeople];
		}
	}

	private clearInputs() {
		this.titleInputElement.value = "";
		this.descriptionInputElement.value = "";
		this.peopleInputElement.value = "";
	}

	@autobind
	private submitHandler(event: Event) {
		event.preventDefault();
		const userInput = this.gatherUserInput();

		if (Array.isArray(userInput)) {
			const [title, description, people] = userInput;
			projectState.addProject(title, description, people);
			this.clearInputs();
		}
	}
}
// #endregion

const projectInput = new ProjectInput();
const activeProjectsList = new ProjectList("active");
const finishedProjectsList = new ProjectList("finished");

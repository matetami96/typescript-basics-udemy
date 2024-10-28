import { Project, ProjectStatus } from "../models/project";

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
export class ProjectState extends State<Project> {
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

console.log("Running project state once!");
// Global State
// the creation of this constant runs only ONCE when this file is imported by another for the first time
// consecutive imports will not re-run this file
// We are guaranteed to work with the exact same object in the whole application
// and we always have only one object of that type (state here) in the app
export const projectState = ProjectState.getInstance();

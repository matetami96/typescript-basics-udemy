/* // relative import
/// <reference path='base-component.ts'/>
/// <reference path='../decorators/autobind.ts'/>
/// <reference path='../state/project-state.ts'/>
/// <reference path='../models/project.ts'/>
/// <reference path='../models/drag-drop.ts'/>

namespace App {
	// This class is responsible for rendering our project lists and items
	export class ProjectList extends Component<HTMLDivElement, HTMLElement> implements DragTarget {
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
}
 */

import { DragTarget } from "../models/drag-drop.js";
import { Project, ProjectStatus } from "../models/project.js";
import Component from "./base-component.js";
import { autobind } from "../decorators/autobind.js";
import { projectState } from "../state/project-state.js";
import { ProjectItem } from "./project-item.js";

// This class is responsible for rendering our project lists and items
export class ProjectList extends Component<HTMLDivElement, HTMLElement> implements DragTarget {
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

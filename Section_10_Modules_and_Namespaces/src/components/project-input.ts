/* // relative import
/// <reference path='base-component.ts'/>
/// <reference path='../decorators/autobind.ts'/>
/// <reference path='../util/validation.ts'/>
/// <reference path='../state/project-state.ts'/>

namespace App {
	export class ProjectInput extends Component<HTMLDivElement, HTMLFormElement> {
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
}
 */

import Component from "./base-component.js";
// THESE ARE NAMED EXPORTS
// import { Component } from "./base-component.js";
// import { Validateable, validate } from "../util/validation.js";
// module import grouping
import * as Validation from "../util/validation.js";
// using an alias thus renaming the import in this file
import { autobind as Autobind } from "../decorators/autobind.js";
import { projectState } from "../state/project-state.js";

export class ProjectInput extends Component<HTMLDivElement, HTMLFormElement> {
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

		const titleValidatable: Validation.Validateable = {
			value: enteredTitle,
			required: true,
		};
		const descriptionValidatable: Validation.Validateable = {
			value: enteredDescription,
			required: true,
			minLength: 5,
		};
		const peopleValidatable: Validation.Validateable = {
			value: +enteredPeople,
			required: true,
			min: 1,
			max: 5,
		};

		if (
			!Validation.validate(titleValidatable) ||
			!Validation.validate(descriptionValidatable) ||
			!Validation.validate(peopleValidatable)
		) {
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

	@Autobind
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

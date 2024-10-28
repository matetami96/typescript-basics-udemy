/* namespace App {
	// Because there are similarities in the code
	// this class acts as a base for it
	// and others who inherit from this will expand it
	// with more functionalities
	export abstract class Component<T extends HTMLElement, U extends HTMLElement> {
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
} */

// Because there are similarities in the code
// this class acts as a base for it
// and others who inherit from this will expand it
// with more functionalities
// THIS IS NOW A DEFAULT EXPORT
export default abstract class Component<T extends HTMLElement, U extends HTMLElement> {
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

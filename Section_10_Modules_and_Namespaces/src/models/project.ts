/* namespace App {
	// Project enum type
	export enum ProjectStatus {
		Active,
		Finished,
	}

	// Project type
	// Needed for more type safety and auto completion
	export class Project {
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
} */

// Project enum type
export enum ProjectStatus {
	Active,
	Finished,
}

// Project type
// Needed for more type safety and auto completion
export class Project {
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

/* namespace App {
	// An interface for our validation objects that are passed to the validate function
	// ? means the value is optional instead of writing it out like | undefined
	export interface Validateable {
		value: string | number;
		required?: boolean;
		minLength?: number;
		maxLength?: number;
		min?: number;
		max?: number;
	}

	// Validation function called when submit is clicked
	export function validate(validatableInput: Validateable) {
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
} */

// An interface for our validation objects that are passed to the validate function
// ? means the value is optional instead of writing it out like | undefined
export interface Validateable {
	value: string | number;
	required?: boolean;
	minLength?: number;
	maxLength?: number;
	min?: number;
	max?: number;
}

// Validation function called when submit is clicked
export function validate(validatableInput: Validateable) {
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

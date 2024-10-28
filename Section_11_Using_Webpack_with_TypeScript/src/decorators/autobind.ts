// Decorator usage enabled from tsconfig
// The purpose of this decorator is to bind the method it is attached to
// to the method's class.
// In other words when a method is bound to a click event
// listener for example, then the "this" keyword changes where it is pointing to,
// because of the eventlistener it will refer to the object the listener is added to
// a button/form for example. By binding the method to 'this' in the get accessor
// we make sure that 'this' will refer to the object that 'activated' the get
// accessor in the first place and that is the class the method belongs to
export function autobind(_: any, _2: string, descriptor: PropertyDescriptor) {
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

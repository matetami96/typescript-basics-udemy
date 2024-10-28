import { useRef } from "react";

import "./NewTodo.css";

interface NewTodoProps {
	onAddTodo: (todoText: string) => void;
}

const NewTodo = ({ onAddTodo }: NewTodoProps) => {
	// useRef returns a mutable object with a .current property
	const textInputRef = useRef<HTMLInputElement>(null);

	const todoSubmitHandler = (event: React.FormEvent) => {
		event.preventDefault();
		const enteredText = textInputRef.current!.value;
		onAddTodo(enteredText);
		textInputRef.current!.value = "";
	};

	return (
		<form onSubmit={todoSubmitHandler}>
			<div className="form-control">
				<label htmlFor="todo-text">Todo Text</label>
				<input type="text" id="todo-text" ref={textInputRef} />
				<button type="submit">ADD TODO</button>
			</div>
		</form>
	);
};

export default NewTodo;

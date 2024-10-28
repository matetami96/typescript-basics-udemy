import { useState } from "react";

import NewTodo from "./components/NewTodo";
import TodoList from "./components/TodoList";
import { Todo } from "./todo.model";

const App = () => {
	const [todos, setTodos] = useState<Todo[]>([]);

	const todoAddHandler = (text: string) => {
		setTodos((prevTodos) => [
			...prevTodos,
			{
				id: Math.random().toString(),
				text,
			},
		]);
	};

	const todoDeleteHandler = (todoID: string) => {
		setTodos((prevTodos) => {
			return prevTodos.filter((todo) => todo.id !== todoID);
		});
	};

	return (
		<div className="App">
			<NewTodo onAddTodo={todoAddHandler} />
			<TodoList items={todos} onDeleteTodo={todoDeleteHandler} />
		</div>
	);
};

export default App;

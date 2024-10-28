import "./TodoList.css";

interface TodoListProps {
	items: { id: string; text: string }[];
	onDeleteTodo: (id: string) => void;
}

const TodoList = ({ items, onDeleteTodo }: TodoListProps) => {
	return (
		<ul>
			{items.map((item) => (
				<li key={item.id}>
					<span>{item.text}</span>
					<button onClick={() => onDeleteTodo(item.id)}>DELETE</button>
				</li>
			))}
		</ul>
	);
};

export default TodoList;

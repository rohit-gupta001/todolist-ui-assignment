import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface Todo {
	id: string;
	title: string;
	description: string;
	completed: boolean;
	date: Date; // Keep as Date type
}

interface TodoState {
	todos: Todo[];
	selectedDate: Date;
	addTodo: (todo: Omit<Todo, "id">) => void;
	toggleTodo: (id: string) => void;
	deleteTodo: (id: string) => void;
	editTodo: (id: string, todo: Partial<Todo>) => void;
	setSelectedDate: (date: Date) => void;
}

export const useTodoStore = create<TodoState>()(
	persist(
		(set) => ({
			todos: [
				{
					id: "1",
					title: "Meet Jack Sparrow",
					description: "Free him from the prison in Port Royal",
					completed: true,
					date: new Date(), // Changed to Date type
				},
				{
					id: "2",
					title: "Head for Tortuga",
					description: "Assemble a crew there",
					completed: false,
					date: new Date(), // Changed to Date type
				},
				{
					id: "3",
					title: "Chase The Pearl",
					description: "All the way up to Isla de Muerta",
					completed: false,
					date: new Date(), // Changed to Date type
				},
				{
					id: "4",
					title: "Find Elizabeth",
					description: "Prevent Barbossa from hurting her",
					completed: false,
					date: new Date(), // Changed to Date type
				},
				{
					id: "5",
					title: "Shoot Barbossa",
					description:
						"After lifting the curse and depriving him of immortality",
					completed: false,
					date: new Date(), // Changed to Date type
				},
			],
			selectedDate: new Date(),
			addTodo: (todo) =>
				set((state) => ({
					todos: [...state.todos, { ...todo, id: crypto.randomUUID() }],
				})),
			toggleTodo: (id) =>
				set((state) => ({
					todos: state.todos.map((todo) =>
						todo.id === id ? { ...todo, completed: !todo.completed } : todo
					),
				})),
			deleteTodo: (id) =>
				set((state) => ({
					todos: state.todos.filter((todo) => todo.id !== id),
				})),
			editTodo: (id, updatedTodo) =>
				set((state) => ({
					todos: state.todos.map((todo) =>
						todo.id === id ? { ...todo, ...updatedTodo } : todo
					),
				})),
			setSelectedDate: (date) => set({ selectedDate: date }),
		}),
		{
			name: "todo-storage",
		}
	)
);

"use client";

import { format } from "date-fns";
import { Todo, useTodoStore } from "@/lib/store";
import { TodoItem } from "./todo-item";
import { DateFilters } from "./filters/data-filters";
import { motion, AnimatePresence } from "framer-motion";

export function TodoList() {
	const { todos, selectedDate, toggleTodo } = useTodoStore();
	const filteredTodos = todos.filter(
		(todo) =>
			format(new Date(todo.date), "yyyy-MM-dd") ===
			format(selectedDate, "yyyy-MM-dd")
	);

	return (
		<div className='space-y-6 h-full'>
			<div className='bg-white px-4 pt-7 pb-4 rounded-[3rem]'>
				<h1 className='mb-10 font-bold text-4xl'>onday</h1>
				<DateFilters />
			</div>
			<div className='relative px-4 pt-7 pb-4 max-h-[46rem] overflow-auto scroll-smooth'>
				<h2 className='mb-4 font-bold text-2xl'>
					{format(selectedDate, "yyyy-MM-dd") ===
					format(new Date(), "yyyy-MM-dd")
						? "Today"
						: format(selectedDate, "MMMM d, yyyy")}
				</h2>
				<ActualTodoList filteredTodos={filteredTodos} toggleTodo={toggleTodo} />
			</div>
		</div>
	);
}

const ActualTodoList = ({
	filteredTodos,
	toggleTodo,
}: {
	filteredTodos: Todo[];
	toggleTodo: (id: string) => void;
}) => {
	return (
		<div className='relative'>
			<div className='space-y-4'>
				<div className='relative'>
					<AnimatePresence mode='popLayout'>
						<motion.div className='relative space-y-4'>
							{filteredTodos.map((todo) => (
								<TodoItem key={todo.id} todo={todo} onToggle={toggleTodo} />
							))}
							{filteredTodos.length === 0 && (
								<motion.div
									initial={{ opacity: 0, y: 20 }}
									animate={{ opacity: 1, y: 0 }}
									exit={{ opacity: 0, y: -20 }}
									className='py-8 text-center'
								>
									<p className='mb-2 text-gray-500'>No tasks for this day</p>
									<p className='text-gray-400 text-sm'>
										Click the + button to add a new task
									</p>
								</motion.div>
							)}
						</motion.div>
					</AnimatePresence>
				</div>
			</div>
		</div>
	);
};

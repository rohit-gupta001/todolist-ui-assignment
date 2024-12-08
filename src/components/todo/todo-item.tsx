"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Pencil, Trash2 } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Todo, useTodoStore } from "@/lib/store";
import { EditTodoDialog } from "./edit-todo";

interface TodoItemProps {
	todo: Todo;
	onToggle: (id: string) => void;
}

export function TodoItem({ todo, onToggle }: TodoItemProps) {
	const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
	const { deleteTodo, editTodo } = useTodoStore();

	return (
		<>
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				className='flex items-start space-x-4 bg-white p-4 rounded-xl group'
			>
				<Checkbox
					checked={todo.completed}
					onCheckedChange={() => onToggle(todo.id)}
					className='mt-1 rounded-full w-6 h-6'
				/>
				<div className='flex-1'>
					<h3
						className={`font-semibold text-2xl ${
							todo.completed ? "line-through text-gray-400" : ""
						}`}
					>
						{todo.title}
					</h3>
					<p
						className={` text-gray-600  ${
							todo.completed ? "line-through" : ""
						}`}
					>
						{todo.description}
					</p>
				</div>
				<div className='flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity'>
					<Button
						variant='ghost'
						size='icon'
						onClick={() => setIsEditDialogOpen(true)}
					>
						<Pencil className='w-4 h-4' />
					</Button>
					<Button
						variant='ghost'
						size='icon'
						onClick={() => deleteTodo(todo.id)}
					>
						<Trash2 className='w-4 h-4' />
					</Button>
				</div>
			</motion.div>
			<EditTodoDialog
				todo={todo}
				isOpen={isEditDialogOpen}
				onClose={() => setIsEditDialogOpen(false)}
				onSave={editTodo}
			/>
		</>
	);
}

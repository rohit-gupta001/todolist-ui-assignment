"use client";

import { useState } from "react";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Todo } from "@/lib/store";
import { DatePicker } from "../date-picker";

interface EditTodoDialogProps {
	todo: Todo;
	isOpen: boolean;
	onClose: () => void;
	onSave: (id: string, updates: Partial<Todo>) => void;
}

export function EditTodoDialog({
	todo,
	isOpen,
	onClose,
	onSave,
}: EditTodoDialogProps) {
	const [editedTodo, setEditedTodo] = useState({
		title: todo.title,
		description: todo.description,
		date: todo.date,
	});

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (!editedTodo.title.trim()) return;

		onSave(todo.id, editedTodo);
		onClose();
	};

	return (
		<Dialog open={isOpen} onOpenChange={onClose}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Edit Task</DialogTitle>
				</DialogHeader>
				<form onSubmit={handleSubmit} className='space-y-4'>
					<Input
						placeholder='Task title'
						value={editedTodo.title}
						onChange={(e) =>
							setEditedTodo({ ...editedTodo, title: e.target.value })
						}
					/>
					<Textarea
						placeholder='Description'
						value={editedTodo.description}
						onChange={(e) =>
							setEditedTodo({ ...editedTodo, description: e.target.value })
						}
					/>
					<DatePicker
						value={new Date(editedTodo.date)}
						onChange={(date) =>
							setEditedTodo({
								...editedTodo,
								date: date ?? new Date(),
							})
						}
					/>
					<div className='flex justify-end space-x-2'>
						<Button variant='outline' type='button' onClick={onClose}>
							Cancel
						</Button>
						<Button type='submit'>Save Changes</Button>
					</div>
				</form>
			</DialogContent>
		</Dialog>
	);
}

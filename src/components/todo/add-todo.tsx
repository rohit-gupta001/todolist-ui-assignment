"use client";

import { useState, memo, useEffect } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useTodoStore } from "@/lib/store";
import { DatePicker } from "../date-picker";

const AddTodoDialog = () => {
	const { selectedDate } = useTodoStore();
	const [isOpen, setIsOpen] = useState(false);
	const [newTodo, setNewTodo] = useState({
		title: "",
		description: "",
		date: selectedDate,
	});
	const addTodo = useTodoStore((state) => state.addTodo);

	useEffect(() => {
		setNewTodo((prev) => ({
			...prev,
			date: selectedDate,
		}));
	}, [selectedDate]);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (!newTodo.title.trim()) return;

		addTodo({
			title: newTodo.title,
			description: newTodo.description,
			completed: false,
			date: newTodo.date,
		});

		setNewTodo({
			title: "",
			description: "",
			date: selectedDate,
		});
		setIsOpen(false);
	};

	return (
		<Dialog open={isOpen} onOpenChange={setIsOpen}>
			<DialogTrigger asChild>
				<div className='right-0 bottom-8 left-0 fixed flex justify-center'>
					<Button
						className='bg-white hover:bg-gray-100 shadow-lg m-0 p-0 rounded-full w-14 h-14 text-black'
						size='icon'
					>
						<Plus className='w-full h-full font-bold' />
					</Button>
				</div>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Add New Task</DialogTitle>
				</DialogHeader>
				<form onSubmit={handleSubmit} className='space-y-4'>
					<Input
						placeholder='Task title'
						value={newTodo.title}
						onChange={(e) => setNewTodo({ ...newTodo, title: e.target.value })}
					/>
					<Textarea
						placeholder='Description'
						value={newTodo.description}
						onChange={(e) =>
							setNewTodo({ ...newTodo, description: e.target.value })
						}
					/>
					<DatePicker
						value={newTodo.date ?? selectedDate}
						onChange={(date) =>
							setNewTodo({
								...newTodo,
								date: date ?? new Date(),
							})
						}
					/>
					<Button type='submit' className='w-full'>
						Add Task
					</Button>
				</form>
			</DialogContent>
		</Dialog>
	);
};

export default AddTodoDialog;

"use client";

import AddTodoDialog from "@/components/todo/add-todo";
import { TodoList } from "@/components/todo/todo-list";

export default function Home() {
	return (
		<div className='border-[8px] border-gray-500/15 bg-gray-100 mx-auto rounded-[4rem] max-w-lg min-h-screen max-h-[80vh] font-mono'>
			<div className='space-y-8'>
				<TodoList />
				<AddTodoDialog />
			</div>
		</div>
	);
}

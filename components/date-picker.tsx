"use client";

import * as React from "react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";

interface DatePickerProps {
	value: Date;
	onChange: (date: Date | undefined) => void;
}

export function DatePicker({ value, onChange }: DatePickerProps) {
	console.log("value", value);
	return (
		<div className='flex flex-col'>
			<label>Date</label>
			<Popover>
				<PopoverTrigger asChild>
					<div>
						<Button
							variant={"outline"}
							className={cn(
								"w-[240px] pl-3 text-left font-normal",
								!value && "text-muted-foreground"
							)}
						>
							{value ? format(value, "PPP") : <span>Pick a date</span>}
							<CalendarIcon className='opacity-50 ml-auto w-4 h-4' />
						</Button>
					</div>
				</PopoverTrigger>
				<PopoverContent className='p-0 w-auto popover-content' align='start'>
					<Calendar
						mode='single'
						selected={value}
						onSelect={onChange}
						initialFocus
					/>
				</PopoverContent>
			</Popover>
		</div>
	);
}

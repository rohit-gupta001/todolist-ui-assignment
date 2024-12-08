"use client";

import { format, startOfWeek, addDays } from "date-fns";
import { motion } from "framer-motion";
import { useTodoStore } from "@/lib/store";

export function DateFilters() {
	const { selectedDate, setSelectedDate } = useTodoStore();
	const startOfCurrentWeek = startOfWeek(new Date(), { weekStartsOn: 1 });

	return (
		<div className='flex justify-between items-center mb-6'>
			{Array.from({ length: 7 }).map((_, index) => {
				const date = addDays(startOfCurrentWeek, index);
				const isSelected =
					format(selectedDate, "yyyy-MM-dd") === format(date, "yyyy-MM-dd");

				return (
					<motion.button
						key={`${index}-${date}`}
						whileHover={{ scale: 1.05 }}
						whileTap={{ scale: 0.95 }}
						onClick={() => setSelectedDate(date)}
						className={`relative rounded-lg px-3 py-1 transition-colors ${
							isSelected ? "bg-black text-white" : "hover:bg-gray-100"
						}`}
					>
						<div className='font-medium text-sm'>
							{format(date, "EEE").split("")[0]}
						</div>
						<div className='font-bold text-xl'>{format(date, "d")}</div>
						{isSelected && (
							<motion.div
								layoutId='active-date'
								className='-z-10 absolute inset-0 bg-black rounded-lg'
								transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
							/>
						)}
					</motion.button>
				);
			})}
		</div>
	);
}

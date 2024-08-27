import CalendarDays from "@/components/CalendarDays"
import CalendarNavigation from "@/components/CalendarNavigation"
import { CalendarProps } from "@/utils/types"
import React, { useState } from "react"

const Calendar: React.FC<CalendarProps> = ({ onDateChange, selectedDate }) => {
	const [currentDate, setCurrentDate] = useState(new Date())
	const [internalSelectedDate, setInternalSelectedDate] = useState<Date | null>(
		new Date(),
	)
	const [isFutureMonth, setIsFutureMonth] = useState(false)

	const handlePrevMonth = () => {
		const newMonth = currentDate.getMonth() - 1
		const newDate = new Date(currentDate.getFullYear(), newMonth, 1)
		setCurrentDate(newDate)
		setIsFutureMonth(newDate > new Date())
	}

	const handleNextMonth = () => {
		const newMonth = currentDate.getMonth() + 1
		const newDate = new Date(currentDate.getFullYear(), newMonth, 1)
		setCurrentDate(newDate)
		setIsFutureMonth(newDate > new Date())
	}

	const handleYearChange = (newYear: number) => {
		const newDate = new Date(newYear, currentDate.getMonth(), 1)
		setCurrentDate(newDate)
		setIsFutureMonth(newDate > new Date())
	}

	const handleMonthChange = (newMonth: number) => {
		const newDate = new Date(currentDate.getFullYear(), newMonth, 1)
		setCurrentDate(newDate)
		setIsFutureMonth(newDate > new Date())
	}

	const handleDateClick = (date: Date) => {
		if (date <= new Date() && date >= new Date(1900, 0, 1)) {
			setInternalSelectedDate(date)
			onDateChange(date.toISOString().split("T")[0])
		}
	}

	return (
		<div className="flex w-[360px] flex-col items-center rounded-lg border border-zinc-800 bg-black p-4 shadow">
			<CalendarNavigation
				currentDate={currentDate}
				handlePrevMonth={handlePrevMonth}
				handleNextMonth={handleNextMonth}
				handleYearChange={handleYearChange}
				handleMonthChange={handleMonthChange}
			/>
			<CalendarDays
				currentDate={currentDate}
				selectedDate={internalSelectedDate}
				handleDateClick={handleDateClick}
			/>
		</div>
	)
}

export default Calendar

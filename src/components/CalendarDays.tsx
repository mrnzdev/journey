import React from "react"

interface CalendarDaysProps {
	currentDate: Date
	selectedDate: Date | null
	handleDateClick: (date: Date) => void
}

const CalendarDays: React.FC<CalendarDaysProps> = ({
	currentDate,
	selectedDate,
	handleDateClick,
}) => {
	const startOfMonth = new Date(
		currentDate.getFullYear(),
		currentDate.getMonth(),
		1,
	)
	const endOfMonth = new Date(
		currentDate.getFullYear(),
		currentDate.getMonth() + 1,
		0,
	)
	const startDay = startOfMonth.getDay()
	const daysInMonth = endOfMonth.getDate()

	const renderDays = () => {
		const days = []
		const prevMonthEnd = new Date(
			currentDate.getFullYear(),
			currentDate.getMonth(),
			0,
		).getDate()

		// Previous month's days
		for (let i = startDay - 1; i >= 0; i--) {
			const date = new Date(
				currentDate.getFullYear(),
				currentDate.getMonth() - 1,
				prevMonthEnd - i,
			)
			const isOutOfLimit = date < new Date(1924, 0, 1)
			const isSelectedDate =
				selectedDate && selectedDate.toDateString() === date.toDateString()
			days.push(
				<div
					key={`prev-${i}`}
					className={`flex h-10 w-10 items-center justify-center rounded text-sm transition-transform duration-300 ${isSelectedDate ? "bg-white text-black" : "text-zinc-500 hover:scale-105 hover:bg-zinc-800"} ${isOutOfLimit ? "cursor-not-allowed" : "cursor-pointer"}`}
					onClick={() => !isOutOfLimit && handleDateClick(date)}
				>
					{prevMonthEnd - i}
				</div>,
			)
		}

		// Current month's days
		for (let day = 1; day <= daysInMonth; day++) {
			const date = new Date(
				currentDate.getFullYear(),
				currentDate.getMonth(),
				day,
			)
			const isFutureDate = date > new Date()
			const isOutOfLimit = date < new Date(1924, 0, 1)
			const isSelectedDate =
				selectedDate && selectedDate.toDateString() === date.toDateString()
			days.push(
				<div
					key={day}
					className={`flex h-10 w-10 items-center justify-center rounded transition-transform duration-300 hover:scale-105 ${isFutureDate || isOutOfLimit ? "cursor-not-allowed text-zinc-500" : "cursor-pointer"} ${isSelectedDate ? "bg-white text-black" : "hover:bg-zinc-800"}`}
					onClick={() =>
						!isFutureDate && !isOutOfLimit && handleDateClick(date)
					}
				>
					<div className="flex h-full w-full items-center justify-center">
						{day}
					</div>
				</div>,
			)
		}

		// Next month's days
		const nextMonthStartDay = (startDay + daysInMonth) % 7
		for (let i = 1; i <= (7 - nextMonthStartDay) % 7; i++) {
			const date = new Date(
				currentDate.getFullYear(),
				currentDate.getMonth() + 1,
				i,
			)
			const isSelectedDate =
				selectedDate && selectedDate.toDateString() === date.toDateString()
			days.push(
				<div
					key={`next-${i}`}
					className={`flex h-10 w-10 items-center justify-center rounded text-sm transition-transform duration-300 ${isSelectedDate ? "bg-white text-black" : "text-zinc-500 hover:scale-105 hover:bg-zinc-800"} cursor-pointer`}
					onClick={() => handleDateClick(date)}
				>
					{i}
				</div>,
			)
		}

		return days
	}

	return (
		<div className="grid grid-cols-7 gap-2">
			{["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
				<div
					key={day}
					className="flex h-10 w-10 items-center justify-center text-sm font-medium text-zinc-500"
				>
					{day}
				</div>
			))}
			{renderDays()}
		</div>
	)
}

export default CalendarDays

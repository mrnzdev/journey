import CustomSelect from "@/components/CustomSelect"
import React from "react"

interface CalendarNavigationProps {
	currentDate: Date
	handlePrevMonth: () => void
	handleNextMonth: () => void
	handleYearChange: (newYear: number) => void
	handleMonthChange: (newMonth: number) => void
}

const CalendarNavigation: React.FC<CalendarNavigationProps> = ({
	currentDate,
	handlePrevMonth,
	handleNextMonth,
	handleYearChange,
	handleMonthChange,
}) => {
	const renderYearOptions = () => {
		const currentYear = new Date().getFullYear()
		const currentMonth = new Date().getMonth()
		const years = []
		for (let year = currentYear - 124; year <= currentYear; year++) {
			const isFutureYear =
				year > currentYear ||
				(year === currentYear && currentDate.getMonth() > currentMonth)
			years.push({
				value: year,
				label: year.toString(),
				disabled: isFutureYear,
			})
		}
		return years
	}

	const renderMonthOptions = () => {
		const currentYear = new Date().getFullYear()
		const currentMonth = new Date().getMonth()
		const months = []
		for (let month = 0; month < 12; month++) {
			const isFutureMonth =
				currentDate.getFullYear() === currentYear && month > currentMonth
			months.push({
				value: month,
				label: new Date(0, month).toLocaleString("default", { month: "long" }),
				disabled: isFutureMonth,
			})
		}
		return months
	}

	return (
		<div className="mb-4 flex w-full items-center justify-between">
			<div className="flex items-center">
				<button
					onClick={handlePrevMonth}
					disabled={
						currentDate.getMonth() === 0 &&
						currentDate.getFullYear() === new Date().getFullYear() - 100
					}
					className={`flex h-10 w-10 items-center justify-center rounded hover:bg-zinc-800 disabled:opacity-50 ${currentDate.getMonth() === 0 && currentDate.getFullYear() === new Date().getFullYear() - 100 ? "cursor-not-allowed" : ""}`}
				>
					{"<"}
				</button>
			</div>
			<span className="flex w-full items-center justify-around gap-2">
				<CustomSelect
					value={currentDate.getMonth()}
					onChange={handleMonthChange}
					options={renderMonthOptions()}
				/>
				<CustomSelect
					value={currentDate.getFullYear()}
					onChange={handleYearChange}
					options={renderYearOptions()}
				/>
			</span>
			<div className="flex items-center">
				<button
					onClick={handleNextMonth}
					disabled={
						new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1) >
						new Date()
					}
					className={`flex h-10 w-10 items-center justify-center rounded hover:bg-zinc-800 disabled:opacity-50 ${new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1) > new Date() ? "cursor-not-allowed" : ""}`}
				>
					{">"}
				</button>
			</div>
		</div>
	)
}

export default CalendarNavigation

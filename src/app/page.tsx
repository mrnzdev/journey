"use client"

import Calendar from "@/components/Calendar"
import CalendarIcon from "@/components/CalendarIcon"
import { useEffect, useMemo, useState } from "react"

export default function Home() {
	const [date, setDate] = useState(() => new Date().toISOString().split("T")[0])
	const [weeks, setWeeks] = useState(0)
	const [isCalendarVisible, setIsCalendarVisible] = useState(false)

	useEffect(() => {
		const currentDate = new Date().toISOString().split("T")[0]
		setDate(currentDate)
	}, [])

	const handleDateChange = (selectedDate: string) => {
		setDate(selectedDate)

		const selectedDateObj = new Date(selectedDate)
		const currentDate = new Date()
		const diffInTime = Math.abs(
			currentDate.getTime() - selectedDateObj.getTime(),
		)
		const diffInWeeks = Math.floor(diffInTime / (1000 * 60 * 60 * 24 * 7))
		setWeeks(diffInWeeks)
	}

	const currentDate = new Date()
	const startDate = new Date(1900, 0, 1)
	const millisecondsInAWeek = 1000 * 60 * 60 * 24 * 7

	const totalWeeks = Math.floor(
		(currentDate.getTime() - startDate.getTime()) / millisecondsInAWeek,
	)

	const weeksArray = useMemo(
		() => Array.from({ length: totalWeeks }),
		[totalWeeks],
	)

	const formattedDate = new Date(date).toLocaleDateString("en-US", {
		day: "2-digit",
		month: "short",
		year: "numeric",
	})

	return (
		<>
			<header className="pb-12 text-center">
				<h1 className="text-base">Journey</h1>
			</header>
			<main className="flex flex-col items-center justify-center gap-12">
				<div className="relative">
					<button
						className="flex h-10 cursor-pointer items-center gap-2 rounded border border-zinc-800 bg-black px-4 py-2 text-sm text-white hover:bg-zinc-800"
						onClick={() => setIsCalendarVisible(!isCalendarVisible)}
					>
						<CalendarIcon
							width="16"
							height="16"
						/>
						{formattedDate}
					</button>
					{isCalendarVisible && (
						<div className="absolute left-1/2 z-10 mt-2 -translate-x-1/2 transform">
							<Calendar
								onDateChange={handleDateChange}
								selectedDate={date}
							/>
						</div>
					)}
				</div>
				<div className="flex flex-wrap gap-8">
					{weeksArray
						.map((_, i) => (
							<div
								key={i}
								className={`h-4 w-4 rounded border-2 transition-transform duration-300 ${
									i < weeks
										? "scale-110 border-white bg-white"
										: "border-zinc-500 bg-black"
								}`}
							></div>
						))
						.reduce<JSX.Element[][]>((acc, curr, index) => {
							if (index % 12 === 0) {
								acc.push([])
							}
							acc[acc.length - 1].push(curr)
							return acc
						}, [])
						.map((group, index) => (
							<div
								key={index}
								className="grid grid-cols-3 gap-2"
							>
								{group}
							</div>
						))}
				</div>
			</main>
		</>
	)
}

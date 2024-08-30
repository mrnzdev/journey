"use client"

import Calendar from "@/components/Calendar"
import CalendarIcon from "@/components/CalendarIcon"
import { useEffect, useMemo, useState } from "react"

export default function Home() {
	const [date, setDate] = useState(() => {
		const now = new Date()
		now.setMinutes(now.getMinutes() - now.getTimezoneOffset())
		return now.toISOString().split("T")[0]
	})
	const [weeks, setWeeks] = useState(0)
	const [isCalendarVisible, setIsCalendarVisible] = useState(false)

	useEffect(() => {
		const now = new Date()
		now.setMinutes(now.getMinutes() - now.getTimezoneOffset())
		const currentDate = now.toISOString().split("T")[0]
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

	const totalWeeks = 5200

	const weeksArray = useMemo(
		() => Array.from({ length: totalWeeks }),
		[totalWeeks],
	)

	const formattedDate = new Date(date).toLocaleDateString("en-US", {
		day: "2-digit",
		month: "short",
		year: "numeric",
		timeZone: "UTC",
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
				<div className="flex flex-col gap-8">
					{weeksArray
						.reduce<JSX.Element[][]>((acc, curr, index) => {
							if (index % 520 === 0) {
								acc.push([])
							}
							acc[acc.length - 1].push(
								<div
									key={index}
									className={`h-2 w-2 border-2 transition-transform duration-300 ${
										index < weeks
											? "border-white bg-white"
											: "border-zinc-500 bg-black"
									}`}
								></div>,
							)
							return acc
						}, [])
						.map((group, index) => (
							<div
								key={index}
								className="flex items-start gap-2"
							>
								<div className="text-sm leading-none text-white">
									{index * 10}
								</div>
								<div className="grid grid-cols-52 gap-2">{group}</div>
							</div>
						))}
				</div>
			</main>
		</>
	)
}

export interface CalendarProps {
	onDateChange: (date: string) => void
	selectedDate: string
}

export interface CustomSelectProps {
	value: number
	onChange: (value: number) => void
	options: { value: number; label: string; disabled?: boolean }[]
}

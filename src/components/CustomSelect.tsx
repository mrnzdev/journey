import { CustomSelectProps } from "@/utils/types"
import React, { useEffect, useRef, useState } from "react"

const CustomSelect: React.FC<CustomSelectProps> = ({
	value,
	onChange,
	options,
}) => {
	const [isOpen, setIsOpen] = useState(false)
	const dropdownRef = useRef<HTMLDivElement>(null)

	const handleSelect = (value: number) => {
		onChange(value)
		setIsOpen(false)
	}

	useEffect(() => {
		if (isOpen && dropdownRef.current) {
			const year2000Index = options.findIndex((option) => option.value === 2000)
			if (year2000Index !== -1) {
				const optionHeight = 36
				dropdownRef.current.scrollTop = year2000Index * optionHeight
			}
		}
	}, [isOpen, options])

	return (
		<div className="relative w-2/5">
			<button
				className="h-10 w-full cursor-pointer rounded bg-black p-2 text-sm text-white hover:bg-zinc-800"
				onClick={() => setIsOpen(!isOpen)}
			>
				{options.find((option) => option.value === value)?.label}
			</button>
			{isOpen && (
				<div
					ref={dropdownRef}
					className="no-scrollbar absolute z-10 mt-1 max-h-[292px] w-full overflow-y-auto rounded border border-zinc-800 bg-black shadow"
				>
					{options.map((option) => (
						<div
							key={option.value}
							className={`p-2 text-center text-sm text-white hover:bg-zinc-800 ${option.disabled ? "cursor-not-allowed text-zinc-500" : "cursor-pointer"}`}
							onClick={() => !option.disabled && handleSelect(option.value)}
						>
							{option.label}
						</div>
					))}
				</div>
			)}
		</div>
	)
}

export default CustomSelect

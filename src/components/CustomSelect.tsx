import { CustomSelectProps } from "@/utils/types"
import React, { useState } from "react"

const CustomSelect: React.FC<CustomSelectProps> = ({
	value,
	onChange,
	options,
}) => {
	const [isOpen, setIsOpen] = useState(false)

	const handleSelect = (value: number) => {
		onChange(value)
		setIsOpen(false)
	}

	return (
		<div className="relative w-2/5">
			<button
				className="h-10 w-full cursor-pointer rounded bg-black p-2 text-sm text-white hover:bg-zinc-800"
				onClick={() => setIsOpen(!isOpen)}
			>
				{options.find((option) => option.value === value)?.label}
			</button>
			{isOpen && (
				<div className="no-scrollbar absolute z-10 mt-1 max-h-[292px] w-full overflow-y-auto rounded border border-zinc-800 bg-black shadow">
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

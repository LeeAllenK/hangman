export function PickLetterBtn({ onClick, value, disabled,className}) {
	return (
		<button
			className={className}
			onClick={onClick}
			disabled={disabled}
		>{value}</button>
	)
}
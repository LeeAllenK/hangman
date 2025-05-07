import React from 'react';

export function PickLetterBtn({ onClick, value, disabled}) {

	return (
		<button
			className='text-7xl font-extrabold border-2 w-30 h-30 cursor-pointer'
			onClick={onClick}
			disabled={disabled}

		>
			{value}
			</button>
	)
}
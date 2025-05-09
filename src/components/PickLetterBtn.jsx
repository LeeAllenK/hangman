import React from 'react';

export function PickLetterBtn({ onClick, value, disabled}) {
	return (
		<button
			className='text-7xl text-white bg-black font-extrabold border-2 w-30 h-30 rounded-xl cursor-pointer'
			onClick={onClick}
			disabled={disabled}
		>{value}</button>
	)
}
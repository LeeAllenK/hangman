import React from 'react';

export function PickLetterBtn({ element, onClick, value, disabled}) {

	return (
		<button
			className='btn'
			onClick={onClick}
			disabled={disabled}
			style={{ fontSize: 30, fontWeight: 'bolder' }}
		
		>
			{value}
			</button>
	)
}
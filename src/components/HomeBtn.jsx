import React from 'react';

export function HomeBtn({onHomeClick, value}){

	return(
		<button
		className='homeBtn'
		onClick={onHomeClick}	
		>	
		{value}
		</button>
	)
}
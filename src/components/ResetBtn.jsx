import React from 'react';

export function ResetBtn({onClick , style}){

	return(
		<button
		onClick={onClick}
		style={style}	
		>	
		Reset
		</button>
	)
}
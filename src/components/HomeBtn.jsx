import React from 'react';

export function HomeBtn({onHomeClick, value}){

	return(

		<button className='text-5xl font-extrabold border-2 border-r-6 border-b-7 cursor-pointer w-50 rounded-2xl'onClick={onHomeClick}>{value}</button>
	)
}
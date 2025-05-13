export function HomeBtn({onHomeClick, value}){
	return(
		<button className='flex justify-center items-center text-3xl text-white border-black font-extrabold border-2 border-r-6 border-b-7 cursor-pointer lg:w-50 md:w-50 sm:w-full lg:h-10 md:h-full sm:h-full h-full w-full rounded-2xl  hover:bg-white hover:text-black active:translate-y-0.5 'onClick={onHomeClick}>{value}</button>
	)
}
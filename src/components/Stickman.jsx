export function Stickman({errors}) {
	return (
		<div className="flex flex-col items-center relative w-32 h-45">
			<div className="w-1 h-43 bg-black absolute top-2 left-0"></div>
			<div className="w-15 h-1 bg-black absolute top-5 left-0"></div>
			<div className={`w-12 h-12 rounded-full bg-black border-black absolute top-6 ${errors >= 1 ? 'opacity-100' : 'opacity-0'}`}></div>
			<div className={`w-1 h-20 border-3 bg-black absolute top-17 ${errors >= 2 ? 'opacity-100' : 'opacity-0'}`}></div>
			<div className={`w-10 h-1 border-3 bg-black absolute top-23 left-[27px] rotate-[-30deg] ${errors >= 3 ? 'opacity-100' : 'opacity-0'}`}></div>
			<div className={`w-10 h-1 border-3 bg-black absolute top-23 right-[27px] -rotate-[-30deg] ${errors >= 4 ? 'opacity-100' : 'opacity-0'}`}></div>
			<div className={`w-10 h-1 border-3 bg-black absolute top-39 left-[29px] rotate-[-45deg] ${errors >= 5 ? 'opacity-100' : 'opacity-0'}`}></div>
			<div className={`w-10 h-1 border-3 bg-black absolute top-39 right-[29px] -rotate-[-45deg] ${errors >= 6 ? 'opacity-100' : 'opacity-0'}`}></div>
		</div>
	);
}

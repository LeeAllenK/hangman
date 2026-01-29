import {useContext} from 'react';
import {ErrorContext, ActivecategoryContext,StopclockContext, GamewonContext, GamelostContext, IsActiveContext} from '../context/GameContext';

export function Stickman() {
	const isActive = useContext(IsActiveContext)
	const errors = useContext(ErrorContext);
	const stop = useContext(StopclockContext)
	const gameWon = useContext(GamewonContext);
	const gameLost = useContext(GamelostContext);
	return (
		<div className="flex flex-col place-items-center  relative w-32 h-45">
			<h3 className='flex place-items-center text-5xl w-screen h-full'>
				{stop && <p className='w-full text-red-500 animate-bounce'>Times Up!</p>}
				{gameWon && <p className="w-full text-green-500 animate-bounce">You Win!</p>}
				{gameLost && <p className="w-full text-red-500 animate-bounce">You Lose!</p>}
			</h3>
			<div className="w-1 h-43 bg-black absolute top-2 left-0"></div>
			<div className="w-15 h-1 bg-black absolute top-5 left-0"></div>
			<div className={`w-12 h-12 rounded-full bg-black border-black absolute top-6 ${errors >= 1 || !isActive  ? 'opacity-100' : 'opacity-0'}`}></div> 
			<div className={`w-1 h-20 border-3 bg-black absolute top-17 ${errors >= 2 || !isActive ? 'opacity-100' : 'opacity-0'}`}></div>
			<div className={`w-10 h-1 border-3 bg-black absolute top-23 left-[27px] rotate-[-30deg] ${errors >= 3 || !isActive  ? 'opacity-100' : 'opacity-0'}`}></div>
			<div className={`w-10 h-1 border-3 bg-black absolute top-23 right-[27px] -rotate-[-30deg] ${errors >= 4 || !isActive ? 'opacity-100' : 'opacity-0'}`}></div>
			<div className={`w-10 h-1 border-3 bg-black absolute top-39 left-[29px] rotate-[-45deg] ${errors >= 5 || !isActive ? 'opacity-100' : 'opacity-0'}`}></div>
			<div className={`w-10 h-1 border-3 bg-black absolute top-39 right-[29px] -rotate-[-45deg] ${errors >= 6 || !isActive  ? 'opacity-100' : 'opacity-0'}`}></div>
		</div>
	);
}

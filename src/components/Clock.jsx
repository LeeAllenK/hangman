import { useState, useEffect, useRef,useContext } from 'react';
import {StopclockContext, DispatchContext,DisabledContext,ResetContext,ErrorContext,GamewonContext, GamelostContext} from '../context/GameContext';

export const Clock = () => {
	const [minutes, setMinutes] = useState(0);
	const [seconds, setSeconds] = useState(0);
	const timerRef = useRef(null);
	const stopDispatch = useContext(DispatchContext);
	const stop = useContext(StopclockContext);
	const reset = useContext(ResetContext);
	const error = useContext(ErrorContext);
	const gameWon = useContext(GamewonContext);
	const gameLost = useContext(GamelostContext);
	useEffect(() => {	
//clear the interval
		clearInterval(timerRef.current);
		if(stop || gameWon || gameLost)return;
		timerRef.current = setInterval(() => {
			setSeconds((s) => {
				if(s === 59) {
					setMinutes((m) => m + 1);
					return 0;
				}
				return s + 1;
			});
		}, 1000);
		return () => clearInterval(timerRef.current);
	}, [stop, gameWon, gameLost]);
	useEffect(() => {
		if(minutes === 0 && seconds === 59) {
			stopDispatch({ type: 'Stop-Timer', stop: true, isDisabled: true });
			clearInterval(timerRef.current);
		}
	}, [minutes, seconds]);
	useEffect(() => {
		if(reset) {
			clearInterval(timerRef.current);
			setMinutes(0);
			setSeconds(0);
			stopDispatch({type:'Reset-Clock',stop:false,isDisabled:false,error:error})
		}
	}, [reset]);

	return <h2 className='text-white font-bold text-6xl'>{`${minutes}:${seconds < 10 ? '0' + seconds : seconds}`}</h2>;
};

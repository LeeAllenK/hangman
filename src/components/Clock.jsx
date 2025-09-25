import { useState, useEffect, useRef,useContext } from 'react';
import {StopclockContext, StopDispatchContext,DisabledContext,ResetContext} from '../context/GameContext';

export const Clock = ({ gameWon, gameLost,error }) => {
	const [minutes, setMinutes] = useState(0);
	const [seconds, setSeconds] = useState(0);
	const timerRef = useRef(null);
	const stopDispatch = useContext(StopDispatchContext);
	const stop = useContext(StopclockContext);
	const reset = useContext(ResetContext);
	useEffect(() => {
		if(stop || gameWon() || gameLost()) {
			clearInterval(timerRef.current);
			return;
		}
//clear the interval
		clearInterval(timerRef.current);
		timerRef.current = setInterval(() => {
			setSeconds((s) => {
				if(s === 59) {
					setMinutes((m) => m + 1);
					return 0;
				}
				return s + 1;
			});
		}, 1000);
		if(minutes === 0 && seconds === 10) {
			stopDispatch({type:'Stop-Timer',stop:true,isDisabled:true})
			clearInterval(timerRef.current);
		}
		return () => clearInterval(timerRef.current);
	}, [stop, gameWon, gameLost,seconds,minutes]);

	useEffect(() => {
		if(reset) {
			clearInterval(timerRef.current);
			setMinutes(0);
			setSeconds(0);
			stopDispatch({type:'Reset-Clock',stop:false,isDisabled:false,error:error})
		}
	}, [reset]);

	return <h2 className='text-white'>{`${minutes}:${seconds < 10 ? '0' + seconds : seconds}`}</h2>;
};

import { useState, useEffect, useRef,useContext } from 'react';
import {StopclockContext, StopDispatchContext,DisabledContext,ResetContext} from '../context/GameContext';

export const Clock = ({ gameWon, gameLost }) => {
	const [minutes, setMinutes] = useState(0);
	const [seconds, setSeconds] = useState(0);
	const timerRef = useRef(null);
	const stopDispatch = useContext(StopDispatchContext);
	const stop = useContext(StopclockContext);
	const reset = useContext(ResetContext);
	const isDisabled = useContext(DisabledContext)
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
		if(minutes === 0 && seconds === 1) {
			// setIsDisabled(true);
			// setStop(true);
			stopDispatch({type:'Stop-Timer',stop:true,isDisabled:true})
			console.log('STOPNOW',stop)
			clearInterval(timerRef.current);
		}
		return () => clearInterval(timerRef.current);
	}, [stop, gameWon, gameLost,seconds,minutes]);

	useEffect(() => {
		if(reset) {
			clearInterval(timerRef.current);
			setMinutes(0);
			setSeconds(0);
			// setIsDisabled(false);
			// setStop(false);
			stopDispatch({type:'Reset-Clock',stop:false,isDisabled:false})
			
			console.log('Reset')
		
		}
	}, [reset]);

	return <h2 className='text-white'>{`${minutes}:${seconds < 10 ? '0' + seconds : seconds}`}</h2>;
};

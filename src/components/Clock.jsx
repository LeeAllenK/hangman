import { useState, useEffect, useRef,useContext } from 'react';
import {StopclockContext, DispatchContext,ResetContext,ErrorContext,GamewonContext, GamelostContext, StartTimerContext} from '../context/GameContext';

export const Clock = ({dispatch}) => {
	const [minutes, setMinutes] = useState(0);
	const [seconds, setSeconds] = useState(0);
	const timerRef = useRef(null);
	const stopDispatch = useContext(DispatchContext);
	const stop = useContext(StopclockContext);
	const reset = useContext(ResetContext);
	const error = useContext(ErrorContext);
	const gameWon = useContext(GamewonContext);
	const gameLost = useContext(GamelostContext);
	const startTimer = useContext(StartTimerContext);
	useEffect(() => {	
//clear the interval
		clearInterval(timerRef.current);
		if(stop || gameWon || gameLost)return;
		if(startTimer){
		timerRef.current = setInterval(() => {
			setSeconds((s) => {
				if(s === 59) {
					setMinutes((m) => m + 1);
					return 0;
				}
				return s + 1;
			});
		}, 1000);
		}
		return () => clearInterval(timerRef.current);
	}, [stop, gameWon, gameLost, startTimer]);
	useEffect(() => {
		if(minutes === 2 && seconds === 0) {
			stopDispatch({ type: 'Stop-Timer', stop: true, isDisabled: true });
			clearInterval(timerRef.current);
		}
	}, [minutes, seconds]);
	useEffect(() => {
		if(reset) {
			setMinutes(0);
			setSeconds(0);
			stopDispatch({type:'Reset-Clock',stop:false,isDisabled:false,error:error,startTimer:false})
		}
	}, [reset]);
	return <h2 className='text-white font-bold text-3xl'>{`${minutes}:${seconds < 10 ? '0' + seconds : seconds}`}</h2>;
};

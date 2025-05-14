import { useState, useEffect, useRef } from 'react';

export const Clock = ({ setIsDisabled, reset, setStop, stop, gameWon, gameLost }) => {
	const [minutes, setMinutes] = useState(0);
	const [seconds, setSeconds] = useState(0);
	const timerRef = useRef(null);

	useEffect(() => {
		if(stop || gameWon() || gameLost()) {
			clearInterval(timerRef.current);
			return;
		}
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
		if(minutes === 99 && seconds === 59) {
			setIsDisabled(true);
			setStop(true);
			clearInterval(timerRef.current);
		}
		return () => clearInterval(timerRef.current);
	}, [stop, gameWon, gameLost,seconds,minutes]);

	useEffect(() => {
		if(reset) {
			// Stop current timer before resetting
			clearInterval(timerRef.current);
			setMinutes(0);
			setSeconds(0);
			setIsDisabled(false);
			setStop(false);
		}
	}, [reset]);

	return <h2 className='text-white'>{`${minutes}:${seconds < 10 ? '0' + seconds : seconds}`}</h2>;
};

import {useState , useEffect} from 'react';


export const Clock = ({ onDisable, reset, stop })=>{
	const [minutes , setMinutes] = useState(0);
	const [seconds , setSeconds] = useState(0);

	useEffect(() => {
		const timer = setInterval(() => {
			setSeconds(s => s + 1)
			if(seconds === 59){
				setSeconds(0);
				setMinutes(+1);
			}
		} ,1000)
			if(minutes === 1 && seconds === 0 ){
				onDisable(true);
			 clearInterval(timer);
			}

			if(stop) {
			clearInterval(timer)
			};
		return () =>{
			clearInterval(timer);
		};
	} , [seconds, minutes, onDisable, stop])
	useEffect(() => {
		if(reset) {
			setMinutes(0);
			 setSeconds(0);
			 onDisable(false); 
			} 
		}, [reset, onDisable]);
	return(
		<>
		<div className='text-white text-3xl ' >{`${minutes}: ${seconds < 10 ? '0' + seconds : seconds}`}</div>
			{minutes === 1 && <p style={{color: 'white' , fontSize: 1.5 + 'em' , fontWeight: 'bolder'}}>Time's Up Loser</p>}
		</>
	)
}
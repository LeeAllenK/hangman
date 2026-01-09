export function AppReducer(state,action){
	switch(action.type){
		case 'home': 
			
		return{
			...state,
			activeCategory: null, startTimer: action.startTimer
		}
		case 'start-Game':
			console.log('startGame')
		return{
			...state,
			activeCategory: action.activeCategory, isActive:action.isActive, startTimer:action.startTimer
		}
		case'Stop-Timer':
		return{
			...state,
			stop:action.stop,
			isDisabled:action.isDisabled
		}
		case 'Reset-Clock':
		return{
			...state,
			stop: action.stop,
			isDisabled:action.isDisabled,
			reset: action.reset,	
			startTimer:action.startTimer
		}
		case 'restartClock':
		return{...state, startTimer:action.startTimer}
		case 'reset':
		return {
			...state,
			guessedLetters: [],
			showHint: '',
			show: action.show,
			error: 0,
			reset: action.reset,
			word: state.word,
			startTimer: action.startTimer,
		}
		case 'setGuessedLetters':
		return{
			...state,
			guessedLetters: action.guessedLetters
		}
		case 'setError':{
				return{...state, error:action.error}	
		}
		case  'getHint':
			if(action.cat === 'Remove-hint'){
				console.log('remove')
				return{...state, show:action.show}
			}else{
				return {...state,show: action.show}
			}
		default: return  state;
	}
}
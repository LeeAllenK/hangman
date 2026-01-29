export function AppReducer(state,action){
	switch(action.type){
	//Home Btn
		case 'home': 
		return{...state, activeCategory: null, startTimer: action.startTimer}
	//Start Game once a category is selected
		case 'start-Game':
		return{...state,activeCategory: action.activeCategory, isActive:action.isActive, startTimer:action.startTimer}
	//Stops clock
		case'Stop-Timer':
		return{...state, stop: action.stop, isDisabled:action.isDisabled}
	//Reset clock
		case 'Reset-Clock':
		return{...state,
				stop: action.stop, 
				isDisabled:action.isDisabled, 
				reset: action.reset, 
				startTimer: action.startTimer
		}
	//Resets entire game
		case 'reset':
			console.log('reducer REset',action.reset)
			return {...state,
				guessedLetters: [],
				showHint: '',
				show: action.show,
				error: 0,
				reset: action.reset,
				word: state.word,
				startTimer: action.startTimer,
			}
	//Selected letters that may be a match or not
		case 'setGuessedLetters':
			return{...state, guessedLetters: action.guessedLetters}
	//Keeps track of error
		case 'setError':
			return{...state, error:action.error}	
		case  'getHint':
			if(action.cat === 'Remove-hint'){
				return{...state, show:action.show}
			}else{
				return {...state,show: action.show}
			}
		default: return state;
	}
}
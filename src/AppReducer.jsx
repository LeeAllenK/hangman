export function AppReducer(state,action){
	switch(action.type){
		case 'home': 
		return{
			...state,
			activeCategory: null
		}
		case 'setCategory':
		return{
			...state,
			activeCategory: action.activeCategory
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
			isDisabled:action.isDisabled
		}
		case 'reset':
		return {
			...state,
			guessedLetters: [],
			showHint: '',
			show: action.show,
			error: 0,
			reset: action.reset,
			word: state.word
		}
		case 'setGuessedLetters':
		return{
			...state,
			guessedLetters: action.guessedLetters
		}
		case 'setError':
		return{
			...state,
			error: action.error
		}
		case 'removeError':
		return{
			...state,
			error: action.error	
		}
		case  'getHint':
			console.log('hint')
		return {
			...state,
			show: action.show
		}
		default: return  state;
	}
}
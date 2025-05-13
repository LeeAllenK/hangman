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
		case 'reset':
		return {
			...state,
			guessedLetters: [],
			showHint: '',
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
		case  'getHint':
		return {
			...state,
			showHint: action.showHint
		}
		default: return  state;
	}
}
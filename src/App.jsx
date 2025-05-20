import { useState,useReducer } from 'react';
import { PickLetterBtn } from './components/PickLetterBtn';
import { ResetBtn } from './components/ResetBtn';
import { HomeBtn } from './components/HomeBtn';
import { Clock } from './components/Clock';
import { Stickman } from './components/Stickman';
import {AppReducer} from './AppReducer'

const categories = {
  car: ['mustang', 'ford', 'dodge'],
  food: ['pizza', 'wings', 'fries'],
  phones: ['apple', 'android', 'google']
};
const hints = {
  mustang: 'ponies',
  ford: 'car inventor',
  dodge: 'evade',
  pizza: 'stuffed crusted',
  wings: 'hot or mild',
  fries: 'potato slices',
  apple: 'not an orange',
  android: '18',
  google: 'browse'
};

const getRandomItem = (category) => {
  return categories[category][Math.floor(Math.random() * categories[category].length)];
};
const initialState = {
  guessedLetters:[],
  error: 0,
  showHint: '',
  reset: false,
  activeCategory:null,
}
function Category({ isActive, category, onHomeClick }) {
  const [word, setWord] = useState(getRandomItem(category));
  const [isDisabled, setIsDisabled] = useState(false);
  const [stop, setStop] = useState(false);
  const [state, dispatch] = useReducer(AppReducer,initialState)
  const alpha = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

  const handleClick = (letter) => {
    if(!state.guessedLetters.includes(letter)) {
      dispatch({type: 'setGuessedLetters', guessedLetters: [...state.guessedLetters,letter]})
      if(!word.includes(letter.toLowerCase())) {
        dispatch({type:'setError', error: state.error + 1})
      }
    }
  };
  const resetGame = () => {
    dispatch({
      type: 'reset',
      guessedLetters: state.guessedLetters,
      showHint: state.showHint,
      setError: state.error,
      reset: setTimeout(() => !state.reset,0)
    })
    if(state.reset){
      setWord(getRandomItem(category))
     }
  };
  const getHint = () => {
    dispatch({ type: 'getHint', showHint: hints[word] || '' })
  };
  const gameWon = () => {
    return word.split('').every((letter) => state.guessedLetters.includes(letter.toUpperCase()));
  };
  const gameLost = () => {
    return state.error >= 6;
  };
  return (
    <div>
      {isActive && (
        <div className="grid grid-cols-1 w-screen h-screen place-items-center font-extrabold">
          <Stickman errors={state.error} />
          <section className="grid grid-cols-3 lg:w-full sm:w-[98%] w-full place-items-center items-center text-5xl lg:mb-5 md:mb-2 sm:mb-3 mb-3 gap-1">
            <Clock setIsDisabled={setIsDisabled} reset={state.reset} setReset={setReset} stop={stop} setStop={setStop} gameWon={gameWon} gameLost={gameLost}  />
            <h2 className='flex justify-center w-full h-full gap-1' >
              {word.split('').map((e, i) => (
                <span className='lg:text-6xl md:text-6xl sm:text-5xl text-5xl ' key={i} style={{ color: state.guessedLetters.includes(e.toUpperCase()) ? 'white' : 'black' }}>
                  {state.guessedLetters.includes(e.toUpperCase()) ? e.toUpperCase() : '_'}
                </span>
              ))}
            </h2>
            <h3 className='lg:text-5xl md:text-5xl sm:text-4xl text-5xl '>
              {gameWon() && <p className="text-green-500 animate-bounce">You Win!</p> }
              {gameLost() && <p className="text-red-500 animate-bounce">You Lose!</p>}
              {stop && <p className='text-white animate-bounce'>Times Up!</p>}
             </h3>
          </section>
          <section className="grid w-full h-fit place-items-center  ">
            <h2 className="grid grid-cols-4 justify-around place-items-center text-7xl font-extrabold lg:w-full sm:w-full w-full sm:gap-1 gap-1 h-fit">
              <HomeBtn onHomeClick={onHomeClick} value="Home" />
              <ResetBtn onClick={resetGame} />
              {state.showHint.length > 0 ? <p className='opacity-100 lg:text-4xl md:text-5xl sm:text-4xl text-3xl text-white'>{state.showHint.charAt(0).toUpperCase() + state.showHint.slice(1)}</p> : <p className=' lg:text-4xl md:text-5xl sm:text-4xl text-3xl opacity-0'>Stuffed crusted</p>} 
              <button className="flex justify-center items-center text-3xl text-white border-black font-extrabold border-2 border-r-6 border-b-7 cursor-pointer lg:w-50 md:w-50 sm:w-full lg:h-10 md:h-full sm:h-full h-full w-full rounded-2xl  hover:bg-white hover:text-black active:translate-y-0.5 " onClick={getHint} disabled={gameWon() || gameLost() || stop}>Hint</button>
            </h2>
          </section>
          <section className="flex flex-wrap place-content-start lg:w-[80%] md:w-full sm:w-full w-full lg:h-full md:h-full sm:h-full h-full rounded-xl justify-center items-center ">
            {alpha.split('').map((e, i) => (
              <PickLetterBtn className='text-7xl text-white bg-black border-b-6 border-r-6  font-extrabold border-2 lg:w-30 md:w-30 sm:w-30 lg:h-30 md:h-30 sm:h-30 w-25 h-25  rounded-xl cursor-pointer active:translate-y-0.5 m-0.5' key={i} value={e} onClick={() => handleClick(e)} disabled={isDisabled|| gameWon() || gameLost()} />
            ))}
          </section>
        </div>
      )}
    </div>
  );
}
export default function App() {
  const [state, dispatch] = useReducer(AppReducer,initialState)
  const categoriesList = [
    { name: 'Cars', type: 'car' },
    { name: 'Food', type: 'food' },
    { name: 'Phones', type: 'phones' }
  ];
  return (
    <div className="grid grid-rows-2 place-items-center w-screen h-screen">
      {!state.activeCategory ? (
        <>
          <section className='grid grid-rows-2  h-full'>
            <h1 className="grid justify-center items-center text-blue-300 text-7xl font-extrabold  w-full h-full">Hangman</h1>
            <h2 className="grid justify-center items-center text-blue-300 text-5xl  font-bold w-full h-full">Categories</h2>
          </section>
          <section className="grid grid-cols-3 gap-2 h-full w-[98%]">
            {categoriesList.map(({ name, type }) => (
              <button
                key={type}
                className="font-extrabold text-4xl border-3 w-full h-fit py-4 rounded-lg bg-blue-300 text-black border-black cursor-pointer hover:text-white active:translate-y-0.5"
                onClick={() => dispatch({ type: 'setCategory', activeCategory: type })}
              >
                {name}
              </button>
            ))}
          </section>
        </>
      ) : (
        <div className="grid place-items-center w-full max-h-full h-auto">
            <Category isActive={true} category={state.activeCategory} onHomeClick={() => dispatch({ type:'home', activeCategory: state.activeCategory })} />
        </div>
      )}
    </div>
  );
}

import { useState,useReducer,useMemo,useEffect,useContext } from 'react';
import { PickLetterBtn } from './components/PickLetterBtn';
import { ResetBtn } from './components/ResetBtn';
import { HomeBtn } from './components/HomeBtn';
import { Clock } from './components/Clock';
import { Stickman } from './components/Stickman';
import {AppReducer} from './AppReducer'
import {getRandomItem, initialState,categories} from './data/hangmanData';
import {ResetContext,DisabledContext, StopclockContext,DispatchContext,ErrorContext, GamewonContext, GamelostContext, ActiveCategoryContext, StartTimerContext, IsActiveContext} from './context/GameContext';

function Category({ onHomeClick }) {
  const category = useContext(ActiveCategoryContext)
  const [word, setWord] = useState(getRandomItem(category));
  const [state, dispatch] = useReducer(AppReducer,initialState)
  const w = word.map(w => w.name)
  const wordLetters = [...new Set(w.join('').toUpperCase().split(''))];
  const alpha = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const shuffledAlpha = useMemo(() => shuffleArray(alpha.split('')),[] );
  const startTimer = useContext(StartTimerContext);
  const isActive = useContext(IsActiveContext);
  const handleClick = (letter) => {
    if(!state.guessedLetters?.includes(letter)) {
      const guessedUpdatedLetters = [...(state.guessedLetters || []), letter]
      dispatch({ type: 'setGuessedLetters', guessedLetters: guessedUpdatedLetters})
      if(!wordLetters.includes(letter.toUpperCase())) {
        dispatch({type:'setError', error: state.error + 1})
      }
    }
  };
//RESET BUTTON BUG
  const resetGame = () => {
  //RESET ERRROR BUG
    dispatch({ type: 'reset',
      guessedLetters: state.guessedLetters,
      showHint: state.showHint,
      error: state.error,
      show: false,
      reset: setTimeout(() => !state.reset,0),
      startTimer: false
    })
    if(state.reset){
      setWord(getRandomItem(category));
     }
  };
  const getHint = () => {
      dispatch({ type: 'getHint', show: !state.show})
  };
  const gameWon = () => {
    if(!w) return false;
    const won = w.map(word => word.split('').every(letter=> state.guessedLetters?.includes(letter.toUpperCase())));
    return won.every(Boolean);
  };

  const gameLost = () => { return state.error >= 6;};

  return (
    <div className="m-1">
        <section className="flex flex-row justify-around">
            <StartTimerContext.Provider value={startTimer}>
            <StopclockContext.Provider value={state.stop}>
              <ResetContext.Provider value={state.reset}>
                <DisabledContext.Provider value={state.isDisabled}>
                  <ErrorContext.Provider value={state.error}>
                    <DispatchContext.Provider value={dispatch}>
                      <GamewonContext.Provider value={gameWon()}>
                        <GamelostContext.Provider value={gameLost()}>
                          <Clock/>
                        </GamelostContext.Provider>
                      </GamewonContext.Provider>
                    </DispatchContext.Provider>
                  </ErrorContext.Provider>
                </DisabledContext.Provider>
              </ResetContext.Provider>
            </StopclockContext.Provider>
            </StartTimerContext.Provider>
              <HomeBtn onHomeClick={onHomeClick} value="Home" />
              <ResetBtn onClick={resetGame} />
              <button className="flex justify-center items-center text-3xl text-white border-black font-extrabold border-2 border-r-6 border-b-7 cursor-pointer lg:w-50 md:w-50 sm:w-full lg:h-10 md:h-full sm:h-full h-full w-full rounded-2xl  hover:bg-white hover:text-black active:translate-y-0.5 " onClick={getHint} disabled={gameWon() || gameLost() || state.stop }>Hint</button>
        </section>
      {isActive && (
        <div className="grid grid-cols-1 w-screen h-screen place-items-center font-extrabold">
          <ErrorContext.Provider value={state.error}>
          <ActiveCategoryContext.Provider value={state.activeCategory}> 
          <StopclockContext.Provider value={state.stop}>
          <GamewonContext.Provider value={gameWon()}>
          <GamelostContext.Provider value={gameLost()}>
            <Stickman isActive={isActive}/>
          </GamelostContext.Provider>
          </GamewonContext.Provider>
          </StopclockContext.Provider>
          </ActiveCategoryContext.Provider>
          </ErrorContext.Provider>
          <section className="flex flex-wrap place-content-start lg:w-[80%] md:w-full sm:w-full w-full lg:h-full md:h-full sm:h-full h-full rounded-xl justify-center items-center ">
            {shuffledAlpha.map((e, i) => (
              <PickLetterBtn className='lg:text-7xl text-3xl text-white bg-black border-b-6 border-r-6  font-extrabold border-2 lg:w-20 md:w-25 sm:w-20 lg:h-20 md:h-25 sm:h-20 w-25 h-25  rounded-xl cursor-pointer active:translate-y-0.5 m-0.5' key={i} value={e} onClick={() => handleClick(e)} disabled={state.isDisabled|| gameWon() || gameLost()} />
            ))}
          </section>
          <section className="grid grid-rows-1 h-full w-full place-items-center items-center text-5xl lg:mb-5 md:mb-2 sm:mb-3 mb-3 gap-1">
            <h2 className='flex flex-col place-content-center place-items-center w-full h-full gap-`'>
              {word.map((wo, wordIndex) => (
                <div key={wordIndex} className='flex w-full place-items-center gap-2'>
                  <div className='grid grid-flow-col w-full gap-3 place-content-center place-items-end'>
                    {wo.name.split('').map((char, charIndex) => (
                      <span
                        key={charIndex}
                        className='lg:text-6xl md:text-6xl sm:text-6xl text-xl gap-4 w-full'
                        style={{
                          color: state.guessedLetters?.includes(char.toUpperCase()) ? 'white' : 'black',
                        }}
                      >
                        {state.guessedLetters?.includes(char.toUpperCase()) ? char.toUpperCase() : '_'}
                      </span>

                    ))}
                {state.show && !gameWon() ?
                  <p className='text-5xl text-white opacity-100'>
                    {wo.hint}
                  </p>
                  :
                  <p className=' lg:text-4xl md:text-5xl sm:text-4xl text-3xl text-white opacity-0'>
                    {wo.hint}
                  </p>
                }
                  </div>
                </div>
              ))}
            </h2>
          </section>
          <section className="grid w-full h-fit place-items-center  ">
            <h2 className="grid grid-cols-3 justify-around place-items-center text-7xl font-extrabold lg:w-full sm:w-full w-full sm:gap-1 gap-1 h-fit">
            </h2>
          </section>
        </div>
      )}
    </div>
  );
}
export default function App() {
  const [state, dispatch] = useReducer(AppReducer,initialState);

  return (
    <div className="grid grid-rows-2 place-items-center w-screen h-screen gap-3">
      {!state.activeCategory ? (
        <>
          <section className='grid grid-rows-1 place-items-center place-content-center h-full w-full  '>
            <h1 className="grid justify-center items-center text-blue-300 text-7xl font-extrabold  w-full h-fit">Hangman</h1>
              <Stickman/>
          </section>
          <section className="grid place-items-center place-content-between  gap-2 h-full w-[98%]">
            <section className='grid grid-cols-3 w-screen h-fit'>
            {categories.map(({type }) => (
              <button
                key={type}
                className="font-extrabold text-4xl border-3 w-full h-fit py-4 rounded-lg bg-blue-300 text-black border-black cursor-pointer hover:text-white active:translate-y-0.5"
                onClick={() => dispatch({ type: 'start-Game', activeCategory: type, isActive:true,startTimer:true })}
              >
                {type}
              </button>
            ))}
            </section>
          </section>
        </>
      ) : (
        <div className="grid place-items-center w-full max-h-full h-auto">
            <StartTimerContext.Provider value={state.startTimer}>
            <ActiveCategoryContext.Provider value={state.activeCategory}>
            <IsActiveContext.Provider value={state.isActive}>
              <Category  onHomeClick={() => dispatch({ type:'home', activeCategory: state.activeCategory, startTimer:false })} />
            </IsActiveContext.Provider>
            </ActiveCategoryContext.Provider>
            </StartTimerContext.Provider>
        </div>
      )}
    </div>
  );
}
function shuffleArray(arr) {
  return [...new Set(arr)].sort(() => Math.random() - 0.5);
}

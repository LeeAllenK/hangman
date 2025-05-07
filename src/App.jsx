import { useState } from 'react';
import { PickLetterBtn } from './components/PickLetterBtn';
import { ResetBtn } from './components/ResetBtn';
import { HomeBtn } from './components/HomeBtn';
import { Clock } from './components/Clock';

const categories = {
  car: ['mustang', 'ford', 'dodge'],
  food: ['pizza', 'wings', 'fries'],
  phones: ['apple', 'android', 'google'],
  carHints: { mustang: 'ponies', ford: 'car inventor', dodge: 'evade' },
  foodHints: { pizza: 'stuffed crusted', wings: 'hot or mild', fries: 'potato slices' },
  phoneHints: { apple: 'not an orange', android: '18', google: 'browse' }
};

const getRandomItem = (category) => {
  return categories[category][Math.floor(Math.random() * categories[category].length)].split('');
};

function Category({ onShow, children, isActive, isShowing = 0 }) {
  const [word, setWord] = useState(() => getRandomItem(Object.keys(categories)[isShowing - 1]));
  const [guessedLetters, setGuessedLetters] = useState([]);
  const [error, setError] = useState(0);
  const [showHint, setShowHint] = useState('');
  const [isDisabled, setIsDisabled] = useState(false);
  const [reset, setReset] = useState(false);
  const [stop, setStop] = useState(false);
  const alpha = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

  const handleClick = (letter) => {
    if(!guessedLetters.includes(letter)) {
      setGuessedLetters([...guessedLetters, letter]);
      if(!word.includes(letter.toLowerCase())) {
        setError(error + 1);
        updateStickMan(error + 1);
      }
    }
  };

  const gameWon = () => word.every((e) => guessedLetters.includes(e.toUpperCase()));

  const gameLost = () => {
    if(error === 6) {
      return <p style={{ fontSize: '2em', color: 'white' }}>Loser! The answer was {word.join('').toUpperCase()}</p>;
    }
    return null;
  };

  const updateStickMan = (errors) => {
    const parts = ['head', 'body', 'left-arm', 'right-arm', 'left-leg', 'right-leg'];
    parts.forEach((part, index) => {
      const element = document.querySelector(`.${part}`);
      element.style.display = index < errors ? 'block' : 'none';
    });
  };

  const resetGame = () => {
    setWord(getRandomItem(Object.keys(categories)[isShowing - 1]));
    setGuessedLetters([]);
    setError(0);
    setShowHint('');
    updateStickMan(0);
    setReset(true);
    setTimeout(() => setReset(false), 0);
    setStop(false);
  };

  const getHint = () => {
    const hints = { 1: categories.carHints, 2: categories.foodHints, 3: categories.phoneHints };
    setShowHint(hints[isShowing]?.[word.join('')] || '');
  };

  return (
    <div>
      {isActive ? (
        <div className=' w-screen h-screen place-items-center place-content-center'>
          <Clock onDisable={setIsDisabled} reset={reset} stop={stop} />
          <div className="hangman">
            <div className="base"></div>
            <div className="pole"></div>
            <div className="beam"></div>
            <div className="rope"></div>
            <div className="head"></div>
            <div className="body"></div>
            <div className="left-arm"></div>
            <div className="right-arm"></div>
            <div className="left-leg"></div>
            <div className="right-leg"></div>
          </div>
          <section className='grid grid-cols-16 items-center place-content-center h-screen w-full '>
          {alpha.split('').map((e, i) => (
            <PickLetterBtn  key={i} value={e} onClick={() => handleClick(e)} disabled={gameWon() || gameLost() || isDisabled} />
          ))}
          </section>
          <div className="text-6xl" style={{ fontWeight: 'bolder', color: 'white' }}>
            {showHint.charAt(0).toUpperCase() + showHint.slice(1)}
          </div>
          <div className="wordDisplay" style={{ fontSize: 50, fontWeight: 'bolder' }}>
            {word.map((e, i) => (
              <span key={i} style={{ color: guessedLetters.includes(e.toUpperCase()) ? 'white' : 'black' }}>
                {guessedLetters.includes(e.toUpperCase()) ? e.toUpperCase() : '_'}
              </span>
            ))}
          </div>
          {gameWon() && <p style={{ fontSize: '2em', color: 'white' }}>YOU WIN!</p>}
          {gameLost()}
          <ResetBtn onClick={resetGame} />
          <button className="showHint" onClick={getHint}>Hint</button>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

export default function App() {
  const [activeIndex, setActiveIndex] = useState(0);
  const categoriesList = [
    { id: 1, name: 'Cars', type: 'car' },
    { id: 2, name: 'Food', type: 'food' },
    { id: 3, name: 'Phones', type: 'phones' }
  ];

  const categoryName = () => categoriesList.find(c => c.id === activeIndex)?.name || 'Category';

  return (
     <div className=" w-screen h-screen">
      {activeIndex === 0 && 
        <>
         <h1 className='grid justify-center items-center w-full h-full'>
           {activeIndex === 0 && <p className="text-black text-7xl font-extrabold text-center">{categoryName()}</p>} 
         </h1>
          <section className='grid place-items-center place-content-start grid-cols-3 w-[98%] h-full gap-1'>
          {activeIndex === 0 &&
            categoriesList.map(({ id, name }) => (
              <button
                key={id}
                className="w-full font-bold text-4xl border-3 border-b-7 border-r-7 w-50 h-15 rounded-lg bg-blue-600 text-black border-black hover:transition hover:duration-350 hover:ease-in-out hover:text-white active:translate-y-0.5 cursor-pointer"
                onClick={() => setActiveIndex(id)}
              >
                {name}
              </button>
            ))}
          </section>
        </>
      }
    {activeIndex > 0 && 
      <div className=" justify-center w-full h-full place-items-center">
        {activeIndex > 0 && 
        <>
        <HomeBtn onHomeClick={() => setActiveIndex(0)} value="Home"/>
        <Category isActive={true} isShowing={activeIndex} />
        </>
        }
      </div>
    }
    </div>
  );
}

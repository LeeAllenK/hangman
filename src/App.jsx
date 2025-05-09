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

const hintsArray = [
  { id: 1, hints: categories.carHints },
  { id: 2, hints: categories.foodHints },
  { id: 3, hints: categories.phoneHints }
];

const getRandomItem = (category) => {
  return categories[category][Math.floor(Math.random() * categories[category].length)].split('');
};

function Category({ isActive, isShowing = 0 }) {
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
  const gameLost = () => (error === 6 ? <p>Loser! The answer was {word.join('').toUpperCase()}</p> : null);

  const updateStickMan = (errors) => {
    const parts = ['head', 'body', 'left-arm', 'right-arm', 'left-leg', 'right-leg'];
    parts.forEach((part, index) => {
      const element = document.querySelector(`.${part}`);
      if(element) {
        element.classList.toggle('hidden', index >= errors);
      } else {
        console.warn(`Element for ${part} not found`);
      }
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
    const hintCategory = hintsArray.find(item => item.id === isShowing);
    setShowHint(hintCategory?.hints?.[word.join('')] || '');
  };
  return (
    <div>
      {isActive && (
        <div className="grid grid-cols-1 w-screen h-screen place-items-center">
          <section className="grid w-full h-fit">
            <Clock onDisable={setIsDisabled} reset={reset} stop={stop} />
          </section>
          <section className="flex flex-wrap justify-center w-[50%]">
            {alpha.split('').map((e, i) => (
              <PickLetterBtn key={i} value={e} onClick={() => handleClick(e)} disabled={gameWon() || gameLost() || isDisabled} />
            ))}
          </section>
          <div className="grid grid-cols-2 justify-center border-3 w-full h-full text-center text-4xl">
            <div className="flex flex-row justify-center items-center">
              {showHint && <p>{showHint.charAt(0).toUpperCase() + showHint.slice(1)}</p>}
              {word.map((e, i) => (
                <span key={i} style={{ color: guessedLetters.includes(e.toUpperCase()) ? 'white' : 'black' }}>
                  {guessedLetters.includes(e.toUpperCase()) ? e.toUpperCase() : '_'}
                </span>
              ))}
            </div>
            <section className="flex flex-col justify-center gap-4">
              <ResetBtn onClick={resetGame} />
              <button className="showHint" onClick={getHint}>
                Hint
              </button>
            </section>
          </div>
          {gameWon() && <p className="text-6xl text-green-500">YOU WIN!</p>}
          {gameLost()}
        </div>
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
  return (
    <div className="grid place-items-center w-screen h-screen p-4">
      {activeIndex === 0 && (
        <>
          <h1 className="text-black text-7xl font-extrabold text-center">{categoriesList.find(c => c.id === activeIndex)?.name || 'Category'}</h1>
          <section className="grid grid-cols-3 gap-2 w-full">
            {categoriesList.map(({ id, name }) => (
              <button
                key={id}
                className="font-bold text-4xl border-3 w-full py-4 rounded-lg bg-blue-600 text-black border-black hover:text-white active:translate-y-0.5"
                onClick={() => setActiveIndex(id)}
              >
                {name}
              </button>
            ))}
          </section>
        </>
      )}
      {activeIndex > 0 && (
        <div className="grid place-items-center w-full h-full">
          <HomeBtn onHomeClick={() => setActiveIndex(0)} value="Home" />
          <Category isActive={true} isShowing={activeIndex} />
        </div>
      )}
    </div>
  );
}

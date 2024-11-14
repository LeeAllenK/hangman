import { useState , useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

let cat = {
    car: ["mustang" , "ford"],
    
 }

let c = cat.car
  let random
  for(let i = 0; i <= c.length; i++){
     random = Math.floor(Math.random() * c.length )
  }
 let letters = cat.car[random].split('');

let alpha = 'abcdefghijklmnopqrstuvwxyz'

function Button({onClick , value , disabled}){

  return (
      <button
      className='btn'
      onClick={onClick}
      disabled={disabled}
      >{value}</button>
    )
}
function Game(){
const [letter , setLetter] = useState(letters);
const [guessedLetters, setGuessedLetters] = useState([]);
const [error, setError] = useState(0)

  const handleClick = (item, i) => {
    if(!guessedLetters.includes(item)){
       setGuessedLetters([...guessedLetters , item])
      }

      if(!letters.includes(item)){
          setError(error + 1)
      }
      

    }

  useEffect(() => {
    resetGame();
  }, []);

    const randomWord = () => {
      let c = cat.car
      let random
        random = Math.floor(Math.random() * c.length)
        return cat.car[random].split('');
      
  }
      
    const gameWon = () => {
        return letters.every(e => guessedLetters.includes(e.toLowerCase()));

    }

    const gameLost = () => {
     return error >= 7
    }

  const resetGame = () =>{
    setLetter(randomWord)
    setGuessedLetters([]);
    setError(0);
   
  }
  return(
    <div>
      {alpha.split('').map((e, i) => {
        return (
          <Button
            key={i}
            value={e}
            onClick={() => handleClick(e, i)}
            disabled={guessedLetters.includes(e) || gameWon() }
          />
        )
      })}
   
      <div className='wordDisplay'>
        
        {letter.map((e) => {
          return(
          <span key={e}>
            {guessedLetters.includes(e.toLowerCase()) ? e : '_'
            
            }
          </span>
          )
        })}
      </div>
      {gameWon() && <p>You win</p>}
      {gameLost() && <p>You Lose! answer was {letters}</p>}
        <button
          onClick={() => resetGame()}  
        >
          
        </button>
    </div>
  )
}

function App() {


return (
    <div className='App'>
        <div className='gameBorder'>  
          <Game/>
        </div>
       
    </div>
  );
}

export default App

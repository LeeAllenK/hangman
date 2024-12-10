import {useState} from 'react'

import {PickLetterBtn} from './components/Buttons.jsx/PickLetterBtn'
import {ResetBtn} from './components/Buttons.jsx/ResetBtn'
import {HomeBtn} from './components/Buttons.jsx/HomeBtn'
import './App.css'

let categories = {
    car: ["mustang" , "ford" , "dodge"],
    food: ["pizza" , "wings", "fries"],
    phones: ["apple" , "android" , "google"],
    carHints: {
      mustang:"ponies",
      ford:"car inventor",
      dodge:"evade",
    },
    foodHints: {
      pizza: 'stuffed crusted',
      wings: 'hot or mild',
      fries: 'potatoe slices'
    },
    phoneHints: {
      apple: 'not an orange',
      android: '18',
      google: 'browse'
    }
 }

let c = categories.car

let randomC = Math.floor(Math.random() * categories.car.length )
let randomF = Math.floor(Math.random() * categories.car.length )
let randomT = Math.floor(Math.random() * categories.car.length )

let Cars = categories.car[randomC].split('');
let Food = categories.food[randomF].split('');
let Tech = categories.phones[randomT].split('');

let alpha = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

function Category({
  onShow, 
  children,
  isActive, 
  isShowing = 0 

  }){

  const [cars, setCars] = useState(Cars);
  const [food, setFood] = useState(Food);
  const [tech, setTech] = useState(Tech);
  const [guessedLetters, setGuessedLetters] = useState([]);
  const [error, setError] = useState(0);
  const [showHint , setShowHint] = useState('');

  const randomCar = () => {
    let car = categories.car;
    let random = Math.floor(Math.random() * car.length);
    return categories.car[random].split('');

  }
  const randomFood = () => {
    let food = categories.food;
    let random = Math.floor(Math.random() * food.length);
    return categories.food[random].split('');

  }
  const randomTech= () => {
    let tech = categories.phones;
    let random = Math.floor(Math.random() * tech.length);
    return categories.phones[random].split('');

  }
  const handleClick = (item, i) => {
    if(!guessedLetters.includes(item)) {
      setGuessedLetters([...guessedLetters, item]);
     
    }

    if(guessedLetters.includes(item)) {
      setError(error + 1);
    }
    console.log(error)
  }
  const gameWon = () => {
    if(isShowing === 1){
      return cars.every(e => guessedLetters.includes(e.toUpperCase()));
    }
    if(isShowing === 2){
      return food.every(e => guessedLetters.includes(e.toUpperCase()));
    }

    if(isShowing === 3){
      return tech.every(e => guessedLetters.includes(e.toUpperCase()));
    }
  
  }
  const gameLost = () => {
 
   if(error === 7 && isShowing === 1){
      return(
        <p style={{ fontSize: 2 + 'em', color: 'white' }}>Loser! The answer was {cars.join('').toUpperCase()}</p>
      )
    }
   if(error === 7 && isShowing === 2  ){
      return(
        <p style={{ fontSize: 2 + 'em', color: 'white' }}>Loser! The answer was {food.join('').toUpperCase()}</p>
      )
    }
   if(error === 7 && isShowing === 3 ){
      return(
        <p style={{ fontSize: 2 + 'em', color: 'white' }}>Loser! The answer was {tech.join('').toUpperCase()}</p>
      )
    }
  }

 const resetGame = () =>{

  if(isShowing === 1) setCars(randomCar);
  if(isShowing === 2) setFood(randomFood);
  if(isShowing === 3) setTech(randomTech);
  setGuessedLetters([]);
  setError(0);   
  setShowHint('');
  }
  const getHint = () => { 
    let carHints = categories.carHints
    let foodHints = categories.foodHints
    let phoneHints = categories.phoneHints
  
    if(isShowing === 1){
      switch(cars.join('')){
        case 'mustang':
        setShowHint(carHints.mustang)
        break;
        case 'ford':
        setShowHint(carHints.ford)
        break;
        case 'dodge':
        setShowHint(carHints.dodge)
        break;
        default: setShowHint('')
      }
    }
    if(isShowing === 2){
      switch(food.join('')){
        case 'pizza':
        setShowHint(foodHints.pizza)
        break;
        case 'wings':
        setShowHint(foodHints.wings)
        break;
        case 'fries':
        setShowHint(foodHints.fries)
        break;
        default: setShowHint('')
      }
    }
    if(isShowing === 3){
      switch(tech.join('')){
        case 'apple':
        setShowHint(phoneHints.apple)
        break;
        case 'android':
        setShowHint(phoneHints.android)
        break;
        case 'google':
        setShowHint(phoneHints.google)
        break;
        default: setShowHint('')
      }
    }
  }
   return(
    <div>
      <>
      {isActive ? (
        <div>
          {alpha.split('').map((e , i) => {
            return(
              <PickLetterBtn
                key={i}  
                value={e}
                onClick={
                () => handleClick(e ,i)
                }
                disabled={gameWon() || gameLost()}
              >
              </PickLetterBtn>
            )
          })}
        <br/><br/>
        <div 
        className='hint'
        style={{fontSize: 2 + 'em', fontWeight: 'bolder', color: 'white'}}  
        >
        {showHint.charAt(0).toUpperCase() + showHint.slice(1)}
        </div>
        <div className='wordDisplay'
        style={{fontSize: 50, fontWeight: 'bolder'}}
      >   
      {isShowing === 1 && 
        <>
        {cars.map((e, i) => {
          return(
          <span 
          key={i}
          >
           {guessedLetters.includes(e.toUpperCase()) ? e.toUpperCase() : '_' }
          </span>
          )
        })}
        </>
      }
          {isShowing === 2 && 
              <>
               {food.map((e, i) => {
                 return (
                   <span
                     key={i}
                   >
                     {guessedLetters.includes(e.toUpperCase()) ? e.toUpperCase() : '_'}
                   </span>
                 )
               })}
              </>
          }
          {isShowing === 3 && 
              <>
               {tech.map((e, i) => {
                 return (
                   <span
                     key={i}
                   >
                     {guessedLetters.includes(e.toUpperCase()) ? e.toUpperCase() : '_'}
                   </span>
                 )
               })}
              </>
          }
      </div>
        {gameWon() && <p style={{fontSize: 2 + 'em', color: 'white'}}>YOU WIN!</p>}
        {gameLost()}
        <ResetBtn
          onClick={(e) => resetGame()}
        />
        <button
        className='showHint'
        onClick={getHint}  
        >
          Hint
        </button>
        </div>
      ) : (
        <button onClick={onShow}>{children}</button>
        ) }
      </>
    </div>
  )
}
export default function App(){

   const [activeIndex, setActiveIndex] = useState(0);
    const randomCar = () => {
    let car = categories.car
    let random = Math.floor(Math.random() * car.length)
    setActiveIndex(1)
    return categories.car[random].split('');
    }
    const randomFood = () => {
      let food = categories.food
      let random = Math.floor(Math.random() * food.length)
      setActiveIndex(2)
      return categories.food[random].split('');  
    }
    const randomTech = () => {
      let tech = categories.phones
      let random = Math.floor(Math.random() * tech.length)
      setActiveIndex(3)
      return categories.phones[random].split('');
    }
    const category = () =>{
      if(activeIndex === 1) return 'Cars';
      if(activeIndex === 2) return 'Food';
      if(activeIndex === 3) return 'Phones';
    }
    const goHome = () => {
        setActiveIndex(0)
    }
  return (
      <div className='App'>
    {activeIndex == 0 && 
      <p
        className='categoryHead'
          style={{ fontSize: 3 + 'em', fontWeight: 'bolder' , color: 'white'}}
      >Category</p>
    }
            <h2 
            className='categoryTitle'
            style={{fontSize: 3 + 'em', color: 'white'}}    
          >{category()}</h2>
          <div className='gameBorder'>     
          {activeIndex === 0 || activeIndex === 1 ? (
            <Category
              isActive={activeIndex === 1}
              isShowing={1}
              onShow={() => randomCar()}  
            >
              Cars
            </Category>
          ) : (
           <p></p>
            )}
         {activeIndex === 0  || activeIndex === 2 ? (
            <Category
              isActive={activeIndex === 2}
              isShowing={2}
              onShow={() => randomFood()}
            >
              Food
            </Category>
          ) : (
            <p></p>
          )}
         {activeIndex === 0 || activeIndex === 3 ? (
            <Category
              isActive={activeIndex === 3}
              isShowing={3}
              onShow={() => randomTech()}  
            >
              Phones
           </Category>
        ) : (
           <p></p>
        )}
      {activeIndex > 0 && 
        <HomeBtn
          onHomeClick={() => goHome()}
          value='Home'
        />
      }
          </div>     
      </div>
    );
}

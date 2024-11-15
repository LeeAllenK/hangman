import { useState , useEffect } from 'react'

import {PickLetterBtn} from './components/PickLetterBtn'
import {ResetBtn} from './components/ResetBtn'
import {FoodBtn} from './components/FoodBtn'
import './App.css'

let categories = {
    car: ["mustang" , "ford"],
    food: ["pizza" , "wings"],
    phones: ['apple' , 'android' , 'google']
 }

let c = categories.car
  
let randomC = Math.floor(Math.random() * categories.car.length )
let randomF = Math.floor(Math.random() * categories.car.length )
let randomT = Math.floor(Math.random() * categories.car.length )
  
 let Cars = categories.car[randomC].split('');
 let Food = categories.food[randomF].split('');
 let Tech = categories.phones[randomT].split('');

let alpha = 'abcdefghijklmnopqrstuvwxyz';


function Category({onShow , title,  children ,isActive ,disabled , isShowing = 0 , }){

  const [cars, setCars] = useState(Cars);
  const [food, setFood] = useState(Food);
  const [tech, setTech] = useState(Tech);
  const [guessedLetters, setGuessedLetters] = useState([]);
  const [error, setError] = useState(0);

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

    if(!cars.includes(item)) {
      setError(error + 1);
    }
  }
  const gameWon = () => {
    if(isShowing === 1){
      return cars.every(e => guessedLetters.includes(e.toLowerCase()));
    }
    if(isShowing === 2){
      return food.every(e => guessedLetters.includes(e.toLowerCase()));
    }

    if(isShowing === 3){
      return tech.every(e => guessedLetters.includes(e.toLowerCase()));
    }
  
  }

  const gameLost = () => {
   if(error >= 7 && isShowing === 1){
      return(
        <p>Loser the answer was {cars}</p>
      )
    }
   if(error >= 7 &&isShowing === 2  ){
      return(
        <p>Loser the answer was {food}</p>
      )
    }
   if(error >= 7 && isShowing === 3 ){
      return(
        <p>Loser the answer was {tech}</p>
      )
    }
  }

 const resetGame = (e) =>{
  if(isShowing === 1) setCars(randomCar)
  if(isShowing === 2) setFood(randomFood)
  if(isShowing === 3) setTech(randomTech)
  setGuessedLetters([]);
  setError(0);   
  }
   return(
    <div>
        <>{title}</><br/>
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
              >
              </PickLetterBtn>
            )
          })}
        <div 
        className='wordDisplay'
        style={{fontSize: 50, fontWeight: 'bolder'}}
      >
      {isShowing === 1 && 
        <>
        {cars.map((e, i) => {
          return(
          <span 
          key={i}
          >
           {guessedLetters.includes(e.toLowerCase()) ? e : '_' }
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
                     {guessedLetters.includes(e.toLowerCase()) ? e : '_'}
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
                     {guessedLetters.includes(e.toLowerCase()) ? e : '_'}
                   </span>
                 )
               })}
              </>
          }
      </div>
        {gameWon() && <p>YOU WIN</p>}
        {gameLost()}
        <ResetBtn
          onClick={(e) => resetGame()}
        />
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
  let index = 0;

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
    const changeView = () => {
      setShow(show + 1)
    }

  return (
      <div className='App'>
          <div className='gameBorder'>
            <Category
              title="Cars"
              isActive={activeIndex === 1}
              isShowing={1 }
              onShow={() => randomCar()}  
            >
               Cars
            </Category>
            <Category
              title="Food"
              isActive={activeIndex === 2}
              isShowing={2}
              onShow={() => randomFood()}
            >
              Food
            </Category>
            <Category
              title="Phones"
              isActive={activeIndex === 3}
              isShowing={3}
              onShow={() => randomTech()}  
            >
              Phones
           </Category>
          </div>     
      </div>
    );
}

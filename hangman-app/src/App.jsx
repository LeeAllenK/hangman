import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

  const items = ['ford', 'chevy'];

const Game = () => {
  const [letter, setLetter] = useState('');

  const handleChange = (e) => {
    setLetter(e.target.value);
  };

  const filteredItems = items.filter(item =>
    item.indexOf(letter) == 0
  );

  return (
    <div>
      <input
        type="text"
        value={letter}
        onChange={handleChange}
        placeholder="Type Letter"
      />
    
    </div>
  );
};





// let cat = {
//     car: ["Mustang" , "Ford"],
    
//  }

// let c = cat.car
//   let random
//   for(let i = 0; i <= c.length; i++){
//      random = Math.floor(Math.random() * c.length )
//   }
//  let letters = cat.car[random].split('');

// function LetterSquare({value}){
//   const [letter , setLetter] = useState({ res: '' });
//   const [searchTerm, setSearchTerm] = useState('');

//     const handleChange = (e , i) =>{
//       setSearchTerm(e.target.value);
    
//   }
//       const filteredItems = letters.filter(item =>
//         item.indexOf(searchTerm) !== -1
//       );

//   return(
//     <div>
//       <input
//       className='letter'
//       type='text'  
//       value={searchTerm}
//       onChange={handleChange}
//       style={{fontSize: 50, fontWeight:'bolder'}}
//       letter={letter.res}
//       />
//       <ul>
//         {filteredItems.map((item, index) => (
//           <li key={index}>{item}</li>
//         ))}
//       </ul>

//     </div>
//   )
// }

function App() {
    
      
  return (
    <div className='App'>
      <h1>Hangman</h1>
        <div className='gameBorder'>

          {items.map((e , index) => {
            return (
              <Game
                key={index}
                value={e}
              />
            )
          })}
        </div>
    </div>
  );
}

export default App

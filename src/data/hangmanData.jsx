export const categories = [
  {
    type: 'car',
    items: [
      { name: 'MUSTANG', hint: 'ponies' },
      { name: 'FORD', hint: 'car inventor' },
      { name: 'DODGE', hint: 'evade' },
      { name: 'TESLA', hint: 'electric vibes' },
      { name: 'CHEVY', hint: 'bowtie brand' }
    ]
  },
  {
    type: 'food',
    items: [
      { name: 'PIZZA', hint: 'stuffed crusted' },
      { name: 'WINGS', hint: 'hot or mild' },
      { name: 'FRIES', hint: 'potato slices' },
      { name: 'BURGER', hint: 'stacked delight' },
      { name: 'SUSHI', hint: 'rolled rice' }
    ]
  },
  {
    type: 'phones',
    items: [
      { name: 'APPLE', hint: 'not an orange' },
      { name: 'ANDROID', hint: '18' },
      { name: 'GOOGLE', hint: 'browse' },
      { name: 'SAMSUNG', hint: 'Galaxy maker' },
      { name: 'NOKIA', hint: 'indestructible' }
    ]
  },
  {
    type: 'animals',
    items: [
      { name: 'ELEPHANT', hint: 'big ears' },
      { name: 'TIGER', hint: 'striped predator' },
      { name: 'PENGUIN', hint: 'waddles in tux' },
      { name: 'KOALA', hint: 'eucalyptus muncher' },
      { name: 'DOLPHIN', hint: 'smart swimmer' }
    ]
  },
  {
    type: 'sports',
    items: [
      { name: 'SOCCER', hint: 'goal!' },
      { name: 'BASKETBALL', hint: 'slam dunk' },
      { name: 'BASEBALL', hint: 'home run' },
      { name: 'TENNIS', hint: 'love means zero' },
      { name: 'GOLF', hint: 'hole in one' }
    ]
  }
];

export const getRandomItem = (categoryType, count = 4) => {
	const categoryObj = categories.find(cat => cat.type === categoryType);
	if(!categoryObj || !categoryObj.items?.length) return [];
	const shuffled = [...categoryObj.items];
  // console.log('shuffeld',shuffled)
	return shuffled.slice(0, count);
};
export const initialState = {
	guessedLetters: [],
  partRemove: [],
	error: 0,
	showHint: '',
  show: false,
	reset: false,
	activeCategory: null,
	stop: false,
	isDisabled: false,
  
}
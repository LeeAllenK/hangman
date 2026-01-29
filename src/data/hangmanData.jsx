export const categories = [
  {
    type: 'cars',
    items: [
      { name: 'MUSTANG', hint: 'pony' },
      { name: 'FORD', hint: 'car inventor' },
      { name: 'DODGE', hint: 'evade' },
      { name: 'TESLA', hint: 'electric' },
      { name: 'CHEVY', hint: 'bowtie brand' }
    ]
  },
  {
    type: 'food',
    items: [
      { name: 'PIZZA', hint: 'stuffed crusted' },
      { name: 'WINGS', hint: 'hot or mild' },
      { name: 'FRIES', hint: 'potato slices' },
      { name: 'BURGER', hint: 'double stacked' },
      { name: 'SUSHI', hint: 'rolled rice' }
    ]
  },
  {
    type: 'phones',
    items: [
      { name: 'APPLE', hint: 'not an orange' },
      { name: 'ANDROID', hint: '18' },
      { name: 'GOOGLE', hint: 'browser' },
      { name: 'SAMSUNG', hint: 'Galaxy' },
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
      { name: 'TENNIS', hint: 'Serina Williams' },
      { name: 'GOLF', hint: 'hole in one' }
    ]
  }
];
export const getRandomItem = (categoryType, count = 3) => {
  const categoryObj = categories.find(cat => cat.type === categoryType);
  if(!categoryObj || !categoryObj.items?.length) return [];
  // Fisher–Yates shuffle used to randomize words of each category
  const shuffled = [...categoryObj.items];
  for(let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
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
  isActive: false,
	stop: false,
	isDisabled: false,
  startTimer: false,
}
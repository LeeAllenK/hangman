export const categories = [
  {
    type: 'car',
    items: [
      { name: 'MUSTANG', hint: 'ponies' },
      { name: 'FORD', hint: 'car inventor' },
      { name: 'DODGE', hint: 'evade' }
    ]
  },
  {
    type: 'food',
    items: [
      { name: 'PIZZA', hint: 'stuffed crusted' },
      { name: 'WINGS', hint: 'hot or mild' },
      { name: 'FRIES', hint: 'potato slices' }
    ]
  },
  {
    type: 'phones',
    items: [
      { name: 'APPLE', hint: 'not an orange' },
      { name: 'ANDROID', hint: '18' },
      { name: 'GOOGLE', hint: 'browse' }
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
	error: 0,
	showHint: '',
	reset: false,
	activeCategory: null,
	stop: false,
	isDisabled: false,
}
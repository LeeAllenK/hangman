
export const categories = [
  {
    type: 'car',
    items: [
      { name: 'mustang', hint: 'ponies' },
      { name: 'ford', hint: 'car inventor' },
      { name: 'dodge', hint: 'evade' }
    ]
  },
  {
    type: 'food',
    items: [
      { name: 'pizza', hint: 'stuffed crusted' },
      { name: 'wings', hint: 'hot or mild' },
      { name: 'fries', hint: 'potato slices' }
    ]
  },
  {
    type: 'phones',
    items: [
      { name: 'apple', hint: 'not an orange' },
      { name: 'android', hint: '18' },
      { name: 'google', hint: 'browse' }
    ]
  }
];
export const getRandomItem = (categoryType, count = 4) => {
	const categoryObj = categories.find(cat => cat.type === categoryType);
	if(!categoryObj || !categoryObj.items?.length) return [];
	const shuffled = [...categoryObj.items].sort(() => 0.5 - Math.random());
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
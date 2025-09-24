export const categories = {
	car: ['mustang', 'ford', 'dodge'],
	food: ['pizza', 'wings', 'fries'],
	phones: ['apple', 'android', 'google']
};
export const hints = {
	mustang: 'ponies',
	ford: 'car inventor',
	dodge: 'evade',
	pizza: 'stuffed crusted',
	wings: 'hot or mild',
	fries: 'potato slices',
	apple: 'not an orange',
	android: '18',
	google: 'browse'
};

export const getRandomItem = (category) => {
	return categories[category][Math.floor(Math.random() * categories[category].length)];
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
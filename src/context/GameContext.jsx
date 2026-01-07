//setIsDisabled, reset, setStop, stop, gameWon, gameLost 
import {createContext} from 'react';

export const ResetContext = createContext(false);
export const StopclockContext = createContext(false);
export const DisabledContext = createContext(false);
export const ErrorContext = createContext(0);
export const GamewonContext = createContext(null);
export const GamelostContext = createContext(null);
export const DispatchContext = createContext(null);
export const ActivecategoryContext = createContext(false);
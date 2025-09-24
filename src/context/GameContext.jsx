//setIsDisabled, reset, setStop, stop, gameWon, gameLost 
import {createContext} from 'react';

export const ResetContext = createContext(false);
export const StopclockContext = createContext(false);
export const DisabledContext = createContext(false);
export const StopDispatchContext = createContext(null);
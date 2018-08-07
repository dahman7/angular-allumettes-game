import {combineReducers} from 'redux';

import {IAllumettesState, ALLUMETTES_INITIAL_STATE ,allumettesReducer} from "./allumettes/allumettes.store";

export interface IAppState {
    allumettes?: IAllumettesState
}

export const IAPP_INITIAL_STATE: IAppState = {
    allumettes: ALLUMETTES_INITIAL_STATE
}
// I'm using combineReducers to have always the possibility to extend the rootReducer
export const rootReducer = combineReducers({
    allumettes: allumettesReducer
});
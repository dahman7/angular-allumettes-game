import { tassign } from 'tassign';

import {ALLUMETTES_ACTIONS} from "./allumettes.actions";


export interface IAllumettesState {
    allumettesNb ?: number,
    player ?: string,
    numberMove ?: number,
    currentAllumettesRemoved ?: number,
    isFinished ?: boolean
}
export const ALLUMETTES_INITIAL_STATE: IAllumettesState = {
    allumettesNb : 21 ,
    player : 'user',
    numberMove : 0,
    currentAllumettesRemoved: 0,
    isFinished: false
}

export function allumettesReducer(state: IAllumettesState = ALLUMETTES_INITIAL_STATE , action): IAllumettesState {
    let isFinished:boolean = false;
    switch (action.type) {
        case  ALLUMETTES_ACTIONS.LOADALLUMETTES:
            return Object.assign({}, state, ALLUMETTES_INITIAL_STATE);
        case  ALLUMETTES_ACTIONS.REMOVEALLUMETTESUSER:
            let allumettesNb:number = state.allumettesNb - action.numberAllumettesRemoved;
            if(allumettesNb <= 0) {
                isFinished = true;
            }
            return Object.assign({}, state , {
                allumettesNb: allumettesNb,
                numberMove : state.numberMove + 1 ,
                player : 'user',
                currentAllumettesRemoved: action.numberAllumettesRemoved,
                isFinished: isFinished
            });
        case  ALLUMETTES_ACTIONS.REMOVEALLUMETTESCPU:
            const p = 3;
            let nall:number = Math.floor(state.allumettesNb/(p+1))*(p+1);
            // On calcule le modulo � 4 (il faut toujours laisser une allumette de plus
            // que le maximum autoris� afin de pouvoir gagner donc 4 (p+1)
            let currentMoveNumber = state.allumettesNb - nall; // ou Nall = N % 4
            // Si ce modulo est �gal � z�ro, on tire au hasard entre 1 et 3 allumettes
            if(currentMoveNumber==0){currentMoveNumber=1+Math.floor(Math.random()*p);}

            if(nall <= 0) {
                isFinished = true;
            }
            // S'il n'y a plus d'allumettes, l'ordinateur a gagné
            return Object.assign({}, state , {
                allumettesNb: nall,
                numberMove : state.numberMove + 1 ,
                player : 'cpu',
                currentAllumettesRemoved: currentMoveNumber,
                isFinished: isFinished
            });
    }
    return state;
}
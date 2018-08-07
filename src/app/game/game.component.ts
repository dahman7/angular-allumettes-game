import {Component, OnInit} from '@angular/core';
import {NgRedux, select} from '@angular-redux/store';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable} from 'rxjs/Observable';

import * as _ from 'lodash';

import { NotificationService } from '../services/notification.service';

import {ALLUMETTES_ACTIONS} from "../redux/allumettes/allumettes.actions";

@Component({
    selector: 'app-game',
    templateUrl: './game.component.html',
    styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
    @select(s => s.allumettes) allumettes;
    @select(s => s.allumettes.player) currentPlayer;
    lodash = _;
    allumettesNb: number = 21;
    @select(s => s.allumettes.isFinished) gameOver;
    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private notificationService: NotificationService,
        private ngRedux: NgRedux<any>
    ) {
    }

    ngOnInit() {

    }
    /**
     * Reset the game
     * @method resetGame
     * @return void
     */
    resetGame (){
        this.allumettesNb = 21;
        this.ngRedux.dispatch({type: ALLUMETTES_ACTIONS.LOADALLUMETTES});
    }
    /**
     * user play
     * @method userPlay
     * @return void
     */
    userPlay(numberAllumettesRemoved: number) {
        this.ngRedux.dispatch({type: ALLUMETTES_ACTIONS.REMOVEALLUMETTESUSER, numberAllumettesRemoved});
        let currentState = this.ngRedux.getState().allumettes;
        console.log('currentState User',currentState);
        this.cpuPlay();
    }
    /**
     * the computer game IA
     * @method cpuPlay
     * @return void
     */
    cpuPlay()
    {
        this.ngRedux.dispatch({type: ALLUMETTES_ACTIONS.REMOVEALLUMETTESCPU});
        let currentState = this.ngRedux.getState().allumettes;
        console.log('currentState Cpu',currentState);
        this.allumettesNb = currentState.allumettesNb;
        if(currentState.isFinished){
            console.log('Finitooo');
        }else{
            this.notificationService.clearNotification();
            this.notificationService.sendNotification('info', currentState , false);
        }
    }
    /**
     * back to home page
     * @method backToHome
     * @return void
     */
    backToHome () {
        this.router.navigate(['/']);
    }
}

import { BrowserModule } from '@angular/platform-browser';
import {NgModule, isDevMode} from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {RouterModule} from '@angular/router';
import {NgRedux, NgReduxModule, DevToolsExtension} from '@angular-redux/store';

import { AppComponent } from './app.component';
import { GameComponent } from './game/game.component';
import { HomeComponent } from './home/home.component';
import { IntroComponent } from './intro/intro.component';
import { NotificationComponent } from './notification/notification.component';

//redux
import {IAppState, IAPP_INITIAL_STATE, rootReducer} from './redux/app.store';

//services
import { NotificationService } from './services/notification.service';

@NgModule({
  declarations: [
    AppComponent,
    GameComponent,
    HomeComponent,
    IntroComponent,
    NotificationComponent
  ],
  imports: [
      BrowserModule,
      NgbModule,
      NgbModule.forRoot(),
      NgReduxModule,
      RouterModule.forRoot([
          {
              path: '', component: HomeComponent
          },
          {
              path: 'game', component: GameComponent
          },
          {
              path: 'introduction', component: IntroComponent
          },
          {
              path: '**', component: HomeComponent
          }
      ])
  ],
  providers: [NotificationService],
  bootstrap: [AppComponent]
})
export class AppModule {
    constructor(ngRedux: NgRedux<IAppState>, devTools: DevToolsExtension) {
        var enhancers = isDevMode() ? [] : []; //devTools.enhancer()
        ngRedux.configureStore(rootReducer, IAPP_INITIAL_STATE, [], enhancers);
    }
}

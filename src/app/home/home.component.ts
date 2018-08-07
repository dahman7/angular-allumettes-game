import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(  private route: ActivatedRoute,
                private router: Router) { }

  ngOnInit() {
  }
    goToGame (){
        this.router.navigate(['/game']);
    }
    GoToDocumentation (){
        this.router.navigate(['/introduction']);
    }
}

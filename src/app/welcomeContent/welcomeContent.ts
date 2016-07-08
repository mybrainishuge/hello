import { Component, Input, OnInit } from '@angular/core';
import { AppState } from '../app.service';
import { RouterActive } from '../router-active';
import { AuthService } from '../auth.service';
import { WelcomeStateService } from '../welcomeState/welcomeState.service';
import { Router } from '@angular/router';

@Component({
  selector: 'welcomeContent',
  directives: [ RouterActive ],
  template: require('./welcomeContent.html'),
  styles: [ require('./welcomeContent.css') ]
})

export class WelcomeContent implements OnInit {

  @Input() url;
  constructor(
    public appState: AppState,
    public authService: AuthService,
    private ws: WelcomeStateService,
    private router: Router) { }

  ngOnInit() {
    // console.log('this is the welcomeContents componenet', this.appState._state);
    // console.log('input', this.url);
  }

  routeToLearn() {
    this.appState.set('learn', true);
    this.appState.set('learnPage', true);
    var state = this.appState._state;
    this.router.navigate(['/learn']);
    window.history.pushState(state, null, 'learn');
  }

}

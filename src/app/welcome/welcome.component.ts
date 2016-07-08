import { Component, Input, OnInit } from '@angular/core';
import { WelcomeContent } from '../welcomeContent/welcomeContent.ts';
import { Signup } from '../signup/signup.ts';
import { Login } from '../login/login.ts';
import { Profile } from '../profile/profile.component';
import { Learn } from '../learn/learn.component';
import { AppState } from '../app.service';
import { LoginService } from '../login.service';
import { SignupService } from '../signup/signup.service';
// import { ROUTER_PROVIDERS } from '@angular/router-deprecated';
import { AuthService } from '../auth.service';
import { NgSwitch, NgSwitchDefault, NgSwitchWhen } from '@angular/common';
// import { Router } from '@angular/router-deprecated';
import { WelcomeStateService } from '../welcomeState/welcomeState.service';

@Component({
  selector: 'welcome',
  directives: [ WelcomeContent, Signup, Login, NgSwitch, NgSwitchDefault, NgSwitchWhen, Profile, Learn ],
  // providers: [ LoginService, SignupService, ROUTER_PROVIDERS, AuthService, AppState, WelcomeStateService],
  providers: [ LoginService, SignupService, AuthService, AppState, WelcomeStateService],
  template: require('./welcome.component.html'),
  styles: [ require('./welcome.component.css') ]
})

export class Welcome implements OnInit {

  hands: string = 'assets/img/hands.png'
  bg: string = 'assets/img/bg.png'

  constructor(
    private appState: AppState,
    private authService: AuthService,
    private ws: WelcomeStateService) { }

  ngOnInit() {
    // console.log('Welcome component loaded:', this.appState._state);
    // this.authService.authenticate();
  }

}

const _ = require('underscore');

import { Injectable } from '@angular/core';
import { AppState } from './app.service';
import { Router } from '@angular/router';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { envVars } from './env';

@Injectable()

export class AuthService {

  constructor(
    private appState: AppState,
    private router: Router,
    private http: Http) { }

  authenticate (page) {
    // get token

    let exp: Date = new Date(localStorage.getItem('exp'));
    let currentDate: Date = new Date();
    let tkn: string = localStorage.getItem('tkn')
    let url: string = `${envVars.url}logins?access_token=${tkn}`;

    if (tkn) {
      this.http.get(url).forEach(response => {
        let tempState = window.history.state;

        let a = response.json();
        if (a.data[0] !== 'Authorized') {
          this.appState.set('authenticated', true);
          this.appState.set('learn', true);
          this.router.navigate(['/welcome']);
          window.history.replaceState(undefined, undefined, '');
        } else {
          this.appState.set('authenticated', true);
          this.appState.set('isDisabled', false);
          this.router.navigate([`/${page}`]);
          tempState = _.extend(tempState, this.appState._state);
          window.history.pushState(tempState, undefined, page);
        }
      }).catch(err => console.log('ERROR:', err));
    } else {
      this.router.navigate(['/welcome']);
      window.history.replaceState(undefined, undefined, '');
    }


    // if(tkn && exp > currentDate) {
    //   //logged in
    //   this.appState.set('authenticated', true);
    //   // this.appState.learn =true;
    //   this.router.navigate(['/'+page]);
    //   window.history.pushState(undefined, undefined, page);
    //   // this.appState.landing = 'profile';
    //   return true;
    // } else {
    //   this.router.navigate(['/welcome']);
    //   window.history.replaceState(undefined, undefined, '');

    //   return false;
    // }
  }

  logout() {
    let tkn: string = localStorage.getItem('tkn')
    let url: string = `${envVars.url}access_tokens?access_token=${tkn}`;

    localStorage.clear();
    sessionStorage.clear();
    this.appState.set('authenticated', false);
    this.http.get(url).forEach(x => console.log('logged out')).catch(err => console.log(err));
    this.router.navigate(['/welcome']);
    window.history.pushState(this.appState._state, undefined, '');
  }

  // learnRoute() {
    // this.appState.learn=true;
    // this.appState.isDisabled=true;
    // this.appState.landing='learn'
    // this.appState.authenticated=true;
    // this.router.navigate(['Learn']);
  // }

}

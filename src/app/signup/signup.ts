var _ = require('underscore');

import { Component, OnInit } from '@angular/core';
import { AppState } from '../app.service';
import { FormBuilder, Validators, FORM_DIRECTIVES, ControlGroup } from '@angular/common';
import { WelcomeStateService } from '../welcomeState/welcomeState.service';
import { SignupService } from './signup.service';
import { Observable } from 'rxjs/Observable';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';

@Component({
  selector: 'signup',
  directives: [ FORM_DIRECTIVES ],
  template: require('./signup.html'),
  styles: [require('./signup.css')]
})

export class Signup implements OnInit {
  signupForm: ControlGroup;

  constructor(
    public signupService: SignupService,
    public appState: AppState,
    public fb: FormBuilder,
    private ws: WelcomeStateService,
    private http: Http,
    private router: Router) {
    this.signupForm = fb.group({
      'email': [],
      'password': [],
      'confirm': []
    })
  }
  ngOnInit() { }

  onSubmit(form: any) {
    if ( form.password !== form.confirm || !form.password || !form.email) {
       //do something else here to handle the error
       //make sure to handle the form fields
      // console.log('no match');
      return;
    }
    this.signupService.saveUser(form)
        .subscribe(
          result => {
            // console.log('signupService result:', result)
            localStorage.setItem('tkn', result[0].access_token);
            localStorage.setItem('exp', result[0].expires_at);
            this.appState.set('authenticated', true);
            this.appState.set('isDisabled', false);
            window.history.state.email = form.email;
            var temp = this.appState._state;
            temp = _.extend(window.history.state, temp);
            window.history.pushState(temp, null, 'profile')
            this.router.navigate(['/profile']);
            // window.history.pushState(this.appState._state, null, 'profile');
          },
          error => console.log('signupService error:', error));
  }

  googleSignIn() {
    // this.http.get('http://localhost:8080/auth/google')
    //   .then(r => console.log('r', r))
    //   .catch(e => console.log('e:', e));
  }

  parseData(res: Response) {
    let body = res.json();
    return body.data || {};
  }
  //<a href="http://localhost:8080/auth/google">
}

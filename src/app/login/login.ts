import { Component, OnInit } from '@angular/core';
import { AppState } from '../app.service';
import { FormBuilder, Validators, FORM_DIRECTIVES, ControlGroup } from '@angular/common';
import { LoginService } from '../login.service';
import { Router } from '@angular/router';
import { WelcomeStateService } from '../welcomeState/welcomeState.service';

@Component({
  selector: 'login',
  directives: [FORM_DIRECTIVES],
  template: require('./login.html'),
  styles: [require('./login.css')],
  providers: [AppState]
})

export class Login implements OnInit {
  myForm: ControlGroup;

  constructor(
    private loginService: LoginService,
    private router: Router,
    private fb: FormBuilder,
    private appState: AppState,
    private ws: WelcomeStateService) {
    this.myForm = fb.group({
      'email': [],
      'password': []
    })
  }

  ngOnInit() { }

  onSubmit(form: any): void {
    // console.log('submitting')
    this.loginService.login(form)
        .subscribe(
          result => {
            localStorage.setItem('tkn', result[0].access_token);
            localStorage.setItem('exp', result[0].expires_at);
            this.appState.set('authenticated', true);
            this.appState.set('learn', true);
            this.appState.set('isDisabled', false);
            this.appState.set('email', result[0].email);
            // console.log('navigating to profile page now...', this.appState.get('authenticated'));
            this.router.navigate(['/profile']);
            window.history.pushState(this.appState._state, null, 'profile');
          },
          error => console.log(error));
  }
}

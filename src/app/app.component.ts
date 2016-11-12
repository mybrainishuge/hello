/*
 * Angular 2 decorators and services
 */
import { Component, ViewEncapsulation } from '@angular/core';
// import { RouteConfig } from '@angular/router-deprecated';
import { ROUTER_DIRECTIVES, Router } from '@angular/router';
import { AppState } from './app.service';
import { Profile } from './profile';
import { Welcome } from './welcome';
import { Learn } from './learn';
import { Spell } from './spell';
import { Play } from './play';
import { Create } from './create';
// import { RouterActive } from './router-active';
import { AuthService } from './auth.service';
import './rxjs-operators';
import { WelcomeStateService } from './welcomeState/welcomeState.service';
/*
 * App Component
 * Top Level Component
 */

@Component({
  selector: 'app',
  pipes: [ ],
  providers: [ AuthService, AppState, WelcomeStateService ],
  // directives: [ ROUTER_DIRECTIVES, Welcome, Profile, Learn, Spell, Play, Create ],
  directives: [ ROUTER_DIRECTIVES, Welcome, Profile, Learn, Spell, Create ],
  encapsulation: ViewEncapsulation.None,
  styles: [
    require('normalize.css'),
    require('./app.css')
  ],
  template: require('./app.html')
})

export class App {
  private digitalkLogo: string = 'assets/img/asl-d.png';
  private loading: boolean = true;
  private name: string = 'hello.';
  private url: string = 'https://github.com/digi-talk/hello';
  private bg: string = 'assets/img/bg.png';
  private authenticated: boolean;
  private isDisabled: boolean;
  private navOptions: string[] = ['Profile', 'Learn', 'Spell', 'Play', 'Create'];
  private learnPage: boolean;

  constructor(
    public appState: AppState,
    public authService: AuthService,
    private router: Router,
    private ws: WelcomeStateService
    ) { }

  ngDoCheck() {
    if (window.history.state) {
      this.learnPage = window.history.state.learnPage;
      this.authenticated = window.history.state.authenticated;
      this.isDisabled = window.history.state.isDisabled;
      this.name = window.history.state.email;
    }
 }

  navToPage(page) {
    page = page.toLowerCase();
    this.router.navigate([`/${page}`]);
    window.history.pushState(undefined, undefined, page);
  }

  ngOnInit() { }

  routeToWelcome() {
    this.appState.set('welcome', true);
    this.appState.set('welcomePage', true);
    let state = this.appState._state;
    this.router.navigate(['/welcome']);
    window.history.pushState(state, undefined, '/');
    // this.ws.set('landing', 'login');
    // this.ws.changeView('signup');
  }

  // logout() {
  //   this.appState.set('authenticated', false);
  //   sessionStorage.clear();
  // }

}

/*
 * Please review the https://github.com/AngularClass/angular2-examples/ repo for
 * more angular app examples that you may copy/paste
 * (The examples may not be updated as quickly. Please open an issue on github for us to update it)
 * For help or questions please contact us at @AngularClass on twitter
 * or our chat on Slack at https://AngularClass.com/slack-join
 */

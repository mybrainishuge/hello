/*
 * Angular 2 decorators and services
 */
import { Component, ViewEncapsulation } from '@angular/core';
import { RouteConfig, Router } from '@angular/router-deprecated';

import { AppState } from './app.service';
import { Profile } from './profile';
import { Home } from './home';
import { Welcome } from './welcome';
import { Learn } from './learn';
import { Spell } from './spell';
import { Play } from './play';
import { Create } from './create';
import { RouterActive } from './router-active';

/*
 * App Component
 * Top Level Component
 */
@Component({
  selector: 'app',
  pipes: [ ],
  providers: [ ],
  directives: [ RouterActive, Welcome, Home, Profile, Learn, Spell, Play, Create ],
  encapsulation: ViewEncapsulation.None,
  styles: [
    require('normalize.css'),
    require('./app.css')
  ],
  template: require('./app.html')
})

@RouteConfig([
  { path: '/',        name: 'Welcome', loader: () => require('es6-promise!./welcome')('Welcome') },
  { path: '/profile', name: 'Profile', component: Profile, useAsDefault: true },
  // { path: '/home',    name: 'Home',    component: Home },
  // Async load a component using Webpack's require with es6-promise-loader and webpack `require`
  // { path: '/about', name: 'About', loader: () => require('es6-promise!./about')('About') },
  { path: '/learn',   name: 'Learn',   loader: () => require('es6-promise!./learn')('Learn') },
  { path: '/spell',   name: 'Spell',   loader: () => require('es6-promise!./spell')('Spell') },
  { path: '/play',    name: 'Play',    loader: () => require('es6-promise!./play')('Play') },
  { path: '/create',  name: 'Create',  loader: () => require('es6-promise!./create')('Create') }
])

export class App {
  angularclassLogo = 'assets/img/asl-d.png';
  loading = true;
  name = 'hello.';
  url = 'https://github.com/digi-talk/hello';

  constructor(public appState: AppState) { }

  ngOnInit() {
    // console.log('Initial App State', this.appState.state);
    this.loading = false;
  }

  logout() {
    this.appState.authenticated = false;
    sessionStorage.clear();
  }

}

/*
 * Please review the https://github.com/AngularClass/angular2-examples/ repo for
 * more angular app examples that you may copy/paste
 * (The examples may not be updated as quickly. Please open an issue on github for us to update it)
 * For help or questions please contact us at @AngularClass on twitter
 * or our chat on Slack at https://AngularClass.com/slack-join
 */

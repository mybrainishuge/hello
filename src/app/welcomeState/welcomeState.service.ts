import { Injectable } from '@angular/core';
import { AppState } from '../app.service';

@Injectable()

export class WelcomeStateService {

  _state = {
    landing: 'welcome'
  };

  constructor() { }

  get state() {
    return this._state = this._clone(this._state);
  }
  // never allow mutation
  set state(value) {
    throw new Error('do not mutate the `.state` directly');
  }

  changeView(view) {
    this.set('landing', view);
  }

  get(prop?: any) {
    // use our state getter for the clone
    const state = this._state;
    return state[prop] !== undefined ? state[prop] : state;
  }

  set(prop: string, value: any) {
    // internally mutate our state
    return this._state[prop] = value;
  }

  _clone(object) {
    // simple object clone
    return JSON.parse(JSON.stringify( object ));
  }

}

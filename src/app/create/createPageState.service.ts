import { Injectable } from '@angular/core';
import { AppState } from '../app.service';

@Injectable()

export class CreatePageState {

  _state = {
    gestureNameInput: '',
    selectedGesture: '',
    gestureList: {},
    gestureListKeys: [],
    gestureData: [],
    recognizedGesture: '',
    trainingComplete: false,
    displayGestureOptions: false, 
    countdown: null,
    recordingLeft: 2,
    testingHit: null,
    showTestingMessage: false,
    testingMessage: 'unknown',
    currentlyTesting: false
  };

  constructor(private appState: AppState) { }

  get state() {
    return this._state = this._clone(this._state);
  }
  // never allow mutation
  set state(value) {
    throw new Error('do not mutate the `.state` directly');
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

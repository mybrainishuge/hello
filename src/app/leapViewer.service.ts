import { Injectable } from '@angular/core';
import { HmrState } from 'angular2-hmr';
import { AppState } from './app.service';

@Injectable()
export class LeapViewer {

  _state = {
    gestureNameInput: '',
    gestureName: '',
    gestureList: {},
    gestureListKeys: [],
    recognizedGesture: '',
    trainingComplete: false
  };

  constructor(private appState: AppState) { }

}

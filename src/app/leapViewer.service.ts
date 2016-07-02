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

  Leap = require('leapjs');
  controller = new this.Leap.Controller();

  _initLeapHand() {
    this.appState._initLeapController();

    //connect ctrl at the end of logic
    this.controller.use('riggedHand')
      .connect()
      .on('connect', () => console.log('controller connected'));
  }

}

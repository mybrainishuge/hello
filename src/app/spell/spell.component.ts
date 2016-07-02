import { Component, OnInit } from '@angular/core';
import { LeapViewer } from '../leapViewer.service';
import { AppState } from '../app.service';

@Component({
  selector: 'spell',
  template: require('./spell.component.html'),
  styles: [require('./spell.component.css')],
  providers: [AppState, LeapViewer]
})

export class Spell implements OnInit {

  state = this.leapViewer._state;
  controller;
  constructor(
    private appState: AppState,
    private leapViewer: LeapViewer) {
    // this.leapViewer._initLeapHand();
    this.controller = this.appState._initLeapController();
    this.controller.connect();
  }

  ngOnInit() { }

}

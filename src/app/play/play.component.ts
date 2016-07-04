import { Component, OnInit } from '@angular/core';
import { LeapViewer } from '../leapViewer.service';
import { AppState } from '../app.service';

@Component({
  selector: 'play',
  template: require('./play.component.html'),
  styles: [require('./play.component.css')],
  providers: [AppState, LeapViewer]
})

export class Play implements OnInit {

  state = this.leapViewer._state;

  constructor(
    private appState: AppState,
    private leapViewer: LeapViewer) {
    this.appState._initLeapController();
  }

  ngOnInit() { }

}

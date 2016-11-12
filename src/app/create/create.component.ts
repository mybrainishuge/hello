const _ = require('underscore');

import { Component, OnInit } from '@angular/core';
import { LeapTrainerService } from './services/leapTrainer.service';
import { AppState } from '../app.service';
import { AuthService} from '../auth.service';
import { CreatePageState } from './createPageState.service';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { envVars } from '../env';

@Component({
  selector: 'create',
  template: require('./create.component.html'),
  styles: [require('./create.component.css')],
  providers: [ LeapTrainerService, AppState, CreatePageState ]
})

export class Create implements OnInit {

  state = this.createPageState._state;
  delete_icon = 'assets/img/delete-icon.png';

  constructor(
    private leapTrainerService: LeapTrainerService,
    private appState: AppState,
    private createPageState: CreatePageState,
    private authService: AuthService,
    private http: Http) {
    this.leapTrainerService._initLeapTrainer();
  }

  ngOnInit() {
   this.authService.authenticate('create');
  }

  ngOnDestroy() {
    this.leapTrainerService.trainerCtrl.disconnect();
  }

  ngAfterViewInit() {
    document.dispatchEvent(new Event('ltContainerAdded'));
  }

  setActiveGesture(gestureName) {
    return this.state.selectedGesture === gestureName ? 'primary' : undefined;
  }

  recordGesture(gestureName) {
    // stop listening for gesture matching
    this.leapTrainerService.trainer.listening = false;
    // initialize Recording trainer
    this.leapTrainerService._initLeapTrainerRecord();
    if (gestureName) {
      this.leapTrainerService.trainer.create(gestureName.toUpperCase());
    }
    // TODO: implement UI/X message for no input
  }

  stopRecording(gestureName) {
    this.leapTrainerService.trainer.stop();
  }

  savedMessage = false;

  resetSavedMessage() {
    var fn = _.debounce(() => {
      this.savedMessage = false;
    }, 3000);
    fn();
  }

  save(gestureName): Observable<Response> {
    var tkn = localStorage.getItem('tkn');
    var url = `${envVars.url}gestures?access_token=${tkn}`;
    var gesture = this.leapTrainerService.trainer.gestures[gestureName];
    //TODO: add playback json to data object
    let body = JSON.stringify({
      data: {name: gestureName, gestureData: gesture},
      grant_type: 'password'
    });

    let headers = new Headers({'Content-type': 'application/json'});
    let options = new RequestOptions({headers: headers});
    // TODO: handle UI for success and error responses
    this.http.post(url, body, options)
    .forEach(r => {
      //TODO: Handle UI for save successful
      this.savedMessage = true;
      this.resetSavedMessage();
    })
    .catch(e => console.log('error', e));
    return;
  }

  showOptions(gestureName) {
    return gestureName === this.createPageState.get('selectedGesture');
  }

  playback(gestureName) {
    let selection = this.createPageState.get('selectedGesture');

    this.createPageState.set('showTestingMessage', false);

    if (selection === gestureName) {
      this.createPageState.set('selectedGesture', '');
    }
  }


  test(gestureName) {
    //signal to Trainer that we are now listening to test a gesture
    this.leapTrainerService._initLeapTrainerWatch();
    this.leapTrainerService.trainer.listening = true;
    this.createPageState.set('currentlyTesting', true);
  }

  update(gestureName) {
    var gesture = this.createPageState.get('gestureData');
    //only one gesture is being saved so change property to reflect this
    // -- allows the 'training complete' event to fire when expected (default is after 3 samples saved)
    this.leapTrainerService.trainer.trainingGestures = 1;
    this.leapTrainerService.trainer.updateTrainingData(gestureName, gesture);
    // TODO: handle UI message for currently made gesture to be updated to saved DB -- improves ML
  }

  reset(gestureName) {
    this.leapTrainerService._initLeapTrainerRecord();
    this.leapTrainerService.trainer.retrain(gestureName);
  }

  delete(gestureName) {
    //TODO: remove from gesture list
    var gestureListKeys = this.createPageState.get('gestureListKeys');
    var idx = gestureListKeys.indexOf(gestureName);
    gestureListKeys.splice(idx, 1);
    this.createPageState.set('gestureListKeys', gestureListKeys);
  }

}

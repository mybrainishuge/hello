var _ = require('underscore');

import { Component, OnInit } from '@angular/core';
import { LeapTrainerService } from './services/leapTrainer.service';
import { AppState } from '../app.service';
import { AuthService} from '../auth.service'
import { CreatePageState } from './createPageState.service';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';


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
    // console.log('disconnecting leap controller ')
    this.leapTrainerService.trainerCtrl.disconnect();
  }

  ngAfterViewInit() {
    // var event = new Event('ltContainerAdded');
    document.dispatchEvent(new Event('ltContainerAdded'));
  }

  setActiveGesture(gestureName) {
    return this.state.selectedGesture === gestureName ? 'primary' : null;
  }

  recordGesture(gestureName) {
    //stop listening for gesture matching
    this.leapTrainerService.trainer.listening = false;
    //initialize Recording trainer
    this.leapTrainerService._initLeapTrainerRecord();
    if (gestureName) {
      // console.log(gestureName);
      this.leapTrainerService.trainer.create(gestureName.toUpperCase());
    }
    //TODO: implement UI/X message for no input
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
    console.log('resetting to ...', this.savedMessage);

  }
  save(gestureName): Observable<Response> {
    var tkn = localStorage.getItem('tkn');
    var url = `http://52.205.170.83:3333/gestures?access_token=${tkn}`;
    var gesture = this.leapTrainerService.trainer.gestures[gestureName];
    //TODO: add playback json to data object
    let body = JSON.stringify({
      data: {name: gestureName, gestureData: gesture},
      grant_type: 'password'
    });

    let headers = new Headers({'Content-type': 'application/json'});
    let options = new RequestOptions({headers: headers});
    //TODO: handle UI for success and error responses
    this.http.post(url, body, options)
    .forEach(r => {
      console.log('response back: ', r);
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
      return;
    }

    this.createPageState.set('selectedGesture', gestureName);
    //TODO: add more options
    //display options for : ['Test', ...options]

    // this.createPageState.set('displayGestureOptions', !bool);

  }


  test(gestureName) {
    //signal to Trainer that we are now listening to test a gesture
    // console.log('gestures', this.leapTrainerService.trainer.gestures);
    this.leapTrainerService._initLeapTrainerWatch();
    this.leapTrainerService.trainer.listening = true;
    this.createPageState.set('currentlyTesting', true);
  }

  update(gestureName) {
    var gesture = this.createPageState.get('gestureData');
    // console.log("Ok, one sec! Let me see if I can understand this one better");
    // //only one gesture is being saved so change property to reflect this
    //-- allows the 'training complete' event to fire when expected (default is after 3 samples saved)
    this.leapTrainerService.trainer.trainingGestures = 1;
    this.leapTrainerService.trainer.updateTrainingData(gestureName, gesture);
    // //TODO: handle UI message for currently made gesture to be updated to saved DB -- improves ML
  }

  reset(gestureName) {
    // console.log('Attempting to reset value...');
    this.leapTrainerService._initLeapTrainerRecord();
    this.leapTrainerService.trainer.retrain(gestureName);
  }

  delete(gestureName) {
    //TODO: remove from gesture list
    // console.log('deleting...');
    var gestureListKeys = this.createPageState.get('gestureListKeys');
    var idx = gestureListKeys.indexOf(gestureName);
    gestureListKeys.splice(idx, 1);
    this.createPageState.set('gestureListKeys', gestureListKeys);
  }

}

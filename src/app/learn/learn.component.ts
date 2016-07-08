import { Component, OnInit } from '@angular/core';
import { AlphabetCaptureCheck } from './AlphabetCaptureCheck.service';
import { AuthService } from '../auth.service';
import { AppState } from '../app.service';
import { LetterCheckingService } from '../LetterCheckingService.service';

@Component({
  selector: 'learn',
  template: require('./learn.component.html'),
  styles: [require('./learn.component.css')],
  providers: [ AlphabetCaptureCheck, AppState, LetterCheckingService ]
})

export class Learn implements OnInit {
  private localState = {gestures: {}};
  private ltrCtrlConnected: boolean = false;
  private riggedHand: boolean = false;
  private imageUrl: string = '';
  private clickedLtr: string;
  private _ = require('underscore');
  private startTimer: boolean = false;
  private sec: number = 4;
  private interval;
  private color: string = 'warn';
  private mastered = [];
  private gestureNames: string[] = [];
  private gColor = {};
  private letters = [
    {val: 'A', color:'primary', count: 0},
    {val: 'B', color:'primary', count: 0},
    {val: 'C', color:'primary', count: 0},
    {val: 'D', color:'primary', count: 0},
    {val: 'E', color:'primary', count: 0},
    {val: 'F', color:'primary', count: 0},
    {val: 'G', color:'primary', count: 0},
    {val: 'H', color:'primary', count: 0},
    {val: 'I', color:'primary', count: 0},
    {val: 'J', color:'primary', count: 0},
    {val: 'K', color:'primary', count: 0},
    {val: 'L', color:'primary', count: 0},
    {val: 'M', color:'primary', count: 0},
    {val: 'N', color:'primary', count: 0},
    {val: 'O', color:'primary', count: 0},
    {val: 'P', color:'primary', count: 0},
    {val: 'Q', color:'primary', count: 0},
    {val: 'R', color:'primary', count: 0},
    {val: 'S', color:'primary', count: 0},
    {val: 'T', color:'primary', count: 0},
    {val: 'U', color:'primary', count: 0},
    {val: 'V', color:'primary', count: 0},
    {val: 'W', color:'primary', count: 0},
    {val: 'X', color:'primary', count: 0},
    {val: 'Y', color:'primary', count: 0},
    {val: 'Z', color:'primary', count: 0}
  ];

  constructor(
    private alphabetCaptureCheck: AlphabetCaptureCheck,
    private authService: AuthService,
    private appState: AppState,
    private letterCheckingService: LetterCheckingService) {

    this.appState.retreiveGestures().subscribe(result => {
      var gest = {}
      for (var name in result) {
        gest[name] = result[name];
      }
      let names = [];
      for (var n in gest) {
        names.push(n);
      }
      this.gestureNames = names;
      this.localState.gestures = gest;
      this.gestureNames.forEach(name => {
        this.gColor[name] = 'primary'
      });
    });

  //  this.mastered = JSON.parse(sessionStorage.getItem('mastered')) || [];

  }

  ngOnInit() {}

  clicked(ltr) {
    ltr = ltr.toLowerCase();
    this.ltrChecked = false;
    // this.GestureRecCtrl.disconnect();
    if (this.GestureRecCtrl) {
      this.GestureRecCtrl.disconnect();
      this.gestureCtrlConnected = false;
    }

    this.imageUrl = `assets/img/${ltr}.png`;
    this.clickedGesture = '';
    this.clickedLtr = ltr;
    this.riggedHand = false;
  }

  checkLetter() {
    let idx = this.clickedLtr.charCodeAt(0) - 97;
    const letter = this.letters[idx];
    this.letterCheckingService.target = letter.val;
    let isCorrectLetter;
  }

  timer() {
    this.startTimer = true;
    console.log('timer is at = ', this.sec);
    if (this.sec > 0) {
      this.sec--;
      setTimeout(() => {
        this.timer();
      }, 1000);
    } else {
      this.startTimer = false;
      this.sec = 4;
      this.changeLetterColor();
    }
  }

  private ltrChecked = false;

  retryLtr() {
    this.ltrChecked = false;
    this.showRiggedHandLtr();
  } 

  changeLetterColor() {
    let isCorrectLetter = this.letterCheckingService.getIsLetter();
    // console.log('isCorrectLetter = ', isCorrectLetter);

     let idx = this.clickedLtr.charCodeAt(0) - 97;
     const letter = this.letters[idx];

    if (isCorrectLetter) {
      // console.log('letter found');
      letter.count += 1;
      letter.color = 'white';
    } else {
      letter.color = 'warn';
    }

    //stop listening have a retry button that starts listening again
    this.ltrChecked = true;

    sessionStorage.setItem(letter.val, letter.color);
    if (letter.count > 1) {
      this.mastered.push(letter.val);
    }
//    sessionStorage.setItem('mastered', JSON.stringify(this.mastered));
  }


  showRiggedHandLtr() {
    this.riggedHand = true;

    if (!this.ltrCtrlConnected) {
      // !!this.GestureRecCtrl && this.GestureRecCtrl.disconnect();
      this.letterCheckingService._initCheckingService();
      this.ltrCtrlConnected = true;
    }
    this.timer();

    setTimeout(function() {
      document.dispatchEvent(new Event('ltContainerAdded'));
    }, 0);
    
    this.checkLetter();
  }

   //logic for gesture recognition below
  private clickedGesture = '';
  startGestureRecognition(gestureName) {
    this.showRecFinalMessage = false;
    this.ltrChecked = false;
    this.clickedLtr = '';
    this.riggedHand = false;
    //disconnect ltrCtrl
    this.letterCheckingService.controller.disconnect();
    this.ltrCtrlConnected = false;
    //TODO: playback plugin...
      //.....
     // this.GestureRecCtrl.use('playback');
     //  document.getElementById('connect-leap').remove();
     console.log('this is gesturename', gestureName);
    this.clickedGesture = gestureName;
  }

  showRiggedHandGest() {
    this.riggedHand = true;
    
    this.initGCtrl();

    setTimeout(function() {
      document.dispatchEvent(new Event('ltContainerAdded'));
    }, 0);

  }

  private gestureCtrlConnected = false;
  initGCtrl() {
    if (!this.gestureCtrlConnected) {
      this._initGestureRecognition();
      this.gestureCtrlConnected = true;
    }
    this.trainer.listening = true;

  }

  private GestureRecCtrl;
  private trainer;
  private LeapTrainer = require('../lib/leap-trainer.js');
  private connected = false;
   deviceStopped_CB() {
      // console.log('device has stopped streaming');
      this.connected = false;
      //TODO: handle UI 
    }

    deviceStreaming_CB() {
      // console.log('device has started streaming');
      this.connected = true;
      //TODO: handle UI 
    }

  _initGestureRecognition() {
    this.GestureRecCtrl = this.appState._initLeapController(this.deviceStopped_CB.bind(this), this.deviceStreaming_CB.bind(this));
    this.GestureRecCtrl.connect();
    this.GestureRecCtrl.on('disconnect', () => {
      this.trainer.listening = false;
      // console.log('disconnecting g ctrl!!!!!!...');
    })

    // console.log('testing...');


    // console.log(this.localState.gestures);
    var poses = {};
    this.gestureNames.forEach(name => {
      poses[name] = false;
    })
    // console.log(poses, 'poses');
    this.trainer = new this.LeapTrainer.Controller({
      controller: this.GestureRecCtrl,
      gestures: this.localState.gestures,
      poses: poses,
      listening: true
    })

    this.trainer.on('gesture-unknown', (allHits, gesture) => {
      /*TODO: check to see what hit percentage is for clicked gesture
      ...if it is < 50% send message to user accordingly. ie: 'Not quite...'
      ...if it is <65% send message to user accordingly. ie: 'Almost...'
      */
      this.trainer.listening = false;
      this.gColor[this.clickedGesture] = 'warn';
      this.showRecFinalMessage = true;
      this.recMessageToShow = 'incorrect';
      let percentage = allHits[this.clickedGesture];
      if (percentage <= 0.5) {
        // console.log('Not quite', this.clickedGesture,'...', allHits)
      } else {
        // console.log('Almost', this.clickedGesture,'...', allHits)
      }

    });

    this.trainer.on('gesture-recognized', (bestHit, closestGestureName, allHits) => {
      /*TODO: check to see if recognized gesture is the gesture clicked
      ...if so, then send message to user accordingly. ie: 'Congratulations!' or '{Gesture Name}!'
      */
      this.trainer.listening = false;
      this.showRecFinalMessage = true;
      if (closestGestureName === this.clickedGesture) {
        // console.log(this.clickedGesture + '!');
        this.gColor[this.clickedGesture] = 'white';
        this.recMessageToShow = 'correct';
      } else {
        this.recMessageToShow = 'incorrect';
        // console.log('Not quite...', this.clickedGesture)
        // console.log('That\'s more like ', closestGestureName);
      }
    });
  }
  showRecFinalMessage = false;
  recMessageToShow = 'incorrect';

  ngOnDestroy() {
    !!this.letterCheckingService.controller && this.letterCheckingService.controller.disconnect();
    this.letterCheckingService.target = '';
    !!this.GestureRecCtrl && this.GestureRecCtrl.disconnect();
  }
}
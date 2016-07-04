import { Component, OnInit } from '@angular/core';
import { AlphabetCaptureCheck } from './AlphabetCaptureCheck.service'
import { AppState } from '../app.service';

@Component({
  selector: 'learn',
  template: require('./learn.component.html'),
  styles: [require('./learn.component.css')],
  providers: [AlphabetCaptureCheck, AppState]
})

export class Learn implements OnInit {

  private riggedHand: boolean = false;
  private imageUrl:string = '';
  private clickedLtr:string;
  private showImgDiv:boolean = false;
  private showCaptureDiv:boolean = false;
  private color:string = 'warn';
  private mastered = [];
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
    private appState: AppState) { }

  ngOnInit() {
    this.letters.forEach( letter => {
      if (sessionStorage.getItem(letter.val)) {
        letter.color = sessionStorage.getItem(letter.val);
      }
    });
    this.mastered = JSON.parse(sessionStorage.getItem('mastered')) || [];
  }

  changeLetterColor() {
    let idx = this.clickedLtr.charCodeAt(0) - 97;
    const letter = this.letters[idx];
    if (this.alphabetCaptureCheck.getResult()) {
      letter.count += 1;
      letter.color = 'white';
    } else {
      letter.color = 'warn';
    }
    sessionStorage.setItem(letter.val, letter.color);
    // console.log(sessionStorage.getItem(letter.val));
    if (letter.count > 1) {
      this.mastered.push(letter.val);
      // console.log(this.mastered);
    }
    sessionStorage.setItem('mastered', JSON.stringify(this.mastered));
  }

  clicked(ltr) {
    ltr = ltr.toLowerCase();
    this.imageUrl = `assets/img/${ltr}.png`;
    this.clickedLtr = ltr;
    this.showCaptureDiv = false;
    this.showImgDiv = true;
    this.riggedHand = false;
  }

  hideImgDiv() {
    this.showImgDiv = false;
    this.showCaptureDiv = true;
  }

  hideCaptureDiv() {
    this.showCaptureDiv = false;
    this.changeLetterColor();
  }

  showRiggedHand() {
    this.riggedHand = true;
    this.appState._initLeapController();
    // document.getElementById('ltContainer').appendChild(document.riggedElement);
  }

}

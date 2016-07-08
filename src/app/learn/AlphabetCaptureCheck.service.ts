import { Injectable } from '@angular/core';

@Injectable()
export class AlphabetCaptureCheck {

  constructor() { }

  getResult() {
    return Math.random() > 0.5 ? true : false;
  }

}

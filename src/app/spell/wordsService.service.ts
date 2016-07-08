import { Injectable } from '@angular/core';

@Injectable()

export class WordsService {

  private words = ['Loud', 'Would', 'Seed', 'Feed', 'Fade', 'Leaf', 'Deal', 'Seal', 'Bulb', 'Loaf', 'Bowl', 'Soul', 'Loose', 'Fuse', 'Sold', 'Face', 'Safe'];
  // a,b,c,d,e,f,(gh),l,o,s,u,w.
  private used = [];

  constructor() { }

  returnRandomWord() {
    let random = this.getRandomIndex();
    let word = this.words[random];
    while (this.used.indexOf(word) >= 0) {
      random = this.getRandomIndex();
      word = this.words[random];
    }
    this.used.push(word);
    return word;
  }

  getRandomIndex() {
    return Math.floor(Math.random() * 16);
  }
}

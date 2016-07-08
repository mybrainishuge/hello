/* tslint:disable:no-unused-variable */

import { By }           from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import {
  beforeEach, beforeEachProviders,
  describe, xdescribe,
  expect, it, xit,
  async, inject
} from '@angular/core/testing';

import { LearnComponent } from './learn.component';

describe('Component: Learn', () => {
  it('should create an instance', () => {
    let component = new LearnComponent();
    expect(component).toBeTruthy();
  });
});

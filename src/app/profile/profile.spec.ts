import { Component } from '@angular/core';
import {
  beforeEachProviders,
  describe,
  inject,
  injectAsync,
  it
} from '@angular/core/testing';
import { BaseRequestOptions, Http } from '@angular/http';
import { MockBackend } from '@angular/http/testing';

// Load the implementations that should be tested
import { AppState } from '../app.service';
import { Profile } from './profile.component';
import { Title } from './title';

describe('Profile', () => {
  // provide our implementations or mocks to the dependency injector
  beforeEachProviders(() => [
    BaseRequestOptions,
    MockBackend,
    {
      provide: Http,
      useFactory: function(backend, defaultOptions) {
        return new Http(backend, defaultOptions);
      },
      deps: [MockBackend, BaseRequestOptions]
    },

    AppState,
    Title,
    Profile
  ]);

  it('should have default data', inject([ Profile ], (profile) => {
    expect(profile.localState).toEqual({ value: '' });
  }));

  it('should have a title', inject([ Profile ], (profile) => {
    expect(!!profile.title).toEqual(true);
  }));

  it('should log ngOnInit', inject([ Profile ], (profile) => {
    spyOn(console, 'log');
    expect(console.log).not.toHaveBeenCalled();

    profile.ngOnInit();
    expect(console.log).toHaveBeenCalled();
  }));

});

import { Component } from '@angular/core';
import { AuthService} from '../auth.service'
import { AppState } from '../app.service';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { envVars } from '../env';

@Component({
  selector: 'profile',
  providers: [ AppState ],
  directives: [ ],
  pipes: [ ],
  styles: [ require('./profile.css') ],
  template: require('./profile.html')
})

export class Profile {

  localState = { email1: '', email2: '', password1: '', password2: '', name: '', userId: ''};
  public url: string = envVars.url + 'users?email=';

  constructor(
    // public appState: AppState,
    private authService: AuthService,
    private http: Http) {


  }

  ngOnInit() {
    // console.log('Profile component loaded.');
    // this.title.getData().subscribe(data => this.data = data);

    this.authService.authenticate('profile');
  }


  submitEmail(email1, email2) {
    // console.log('submitState', value);
    //get the user id

    this.localState.email1 = email1;
    this.localState.email2 = email2;
    let url = this.url + this.localState.name;
    // console.log('url', url);
    if (this.localState.email1 === this.localState.email2 && this.localState.email1.length) {
      this.http.get(url).forEach(response => {
        let r = response.json();
        this.localState.userId = r[0].id;
      }).catch(error => console.log(error));

      //left off here --- need to add the url plus id to make the put
     // let putUrl = this.url +

    } else {
      alert('Both fields must match.');
    }
  }

  updatePassword(pw1, pw2) {
    // console.log('updateState', value);
    this.localState.password1 = pw1;
    this.localState.password2 = pw2;
    if (this.localState.password1 === this.localState.password2) {
      if (this.localState.password1.length > 7) {
        // this.appState.set('password', pw1);
        alert('Password must be at least eight characters long.');
      }
    } else {
      alert('Both fields must match.');
    }
  }

  // updateTitle(title) {
  //   console.log(this.appState._state.title);
  //   this.appState._state.title = title;
  //   console.log(this.appState._state.title);
  // }

}

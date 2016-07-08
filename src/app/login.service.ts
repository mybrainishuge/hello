import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Login } from './login/login.ts';

@Injectable()

export class LoginService {

  constructor(private http: Http) { }

  public email: string;
  //deployed URL
  // urls = `${process.env.NODE_URL}access_tokens`;

  urls = 'http://52.205.170.83:3333/access_tokens';
  
  //local docker machine
  // urls = 'http://192.168.99.100:3333/access_tokens';
  //local host
  // urls = 'http://127.0.0.1:3333/access_tokens';
  public url: string = this.urls; 
 
  login(data: any): Observable<Response> {
    let body = JSON.stringify({
      grant_type: 'password',
      email: data.email,
      password: data.password
    });

    let headers = new Headers({'Content-type': 'application/json'});
    let options = new RequestOptions({headers: headers});
    return this.http.post(this.url, body, options).map(this.parseData).catch(this.handleError);
  }

  private parseData(res: Response) {
    let body = res.json();
    return body.data ||  { };
  }

  private handleError(error: any) {
    let errMsg = (error.message) ? error.message : error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg);
    return Observable.throw(errMsg);
  }
}

import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Login } from './login/login.ts';
import { envVars } from './env';
@Injectable()

export class LoginService {

  constructor(private http: Http) { }

  public email: string;
  public url: string = envVars.url + 'access_tokens';
 
  login(data: any): Observable<Response> {
    console.log(this.url);
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

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Router} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  // tslint:disable-next-line:variable-name
   // public backend = 'http://localhost:3000/';
   public backend = 'https://jf58ricebook.herokuapp.com/';
  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  isRegistered(accountName, password): Observable<any> {
    const body = {username: accountName, password};
    return this.http.post(this.backend + 'login', body, {withCredentials: true});
  }
  loginbyFB() {
    document.location.href = this.backend + 'login/facebook';
  }
}

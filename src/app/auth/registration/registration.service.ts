import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Router} from '@angular/router';
import { Observable } from 'rxjs';
import {observableToBeFn} from 'rxjs/internal/testing/TestScheduler';
@Injectable({
  providedIn: 'root'
})
export class RegistrationService {
  // public backend = 'http://localhost:3000/';
  public backend = 'https://jf58ricebook.herokuapp.com/';
  constructor(
    private http: HttpClient,
  ) { }
  newRegister(userModel): Observable <any> {
    const body = {username: userModel.account,
      email: userModel.email,
      dob: userModel.birth,
      zipcode: userModel.Zip,
      password: userModel.pwd,
    };
    return this.http.post(this.backend + 'register', body, {withCredentials: true});
}
}

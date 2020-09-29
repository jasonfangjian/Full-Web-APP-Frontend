import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Router} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MainService {
   // public backend = 'http://localhost:3000/';
   public backend = 'https://jf58ricebook.herokuapp.com/';
  constructor(
    private http: HttpClient,
    private router: Router
  ) { }
  logout()  {
    // console.log('test');
    return this.http.put(this.backend + 'logout', {}, {withCredentials: true});
  }
  getName(): Observable<any> {
    // console.log(username);
    return this.http.get(this.backend + 'headline', { withCredentials: true});
  }
}

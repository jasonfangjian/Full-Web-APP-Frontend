import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Router} from '@angular/router';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class FollowingService {

   public domain = 'https://jsonplaceholder.typicode.com/users';
  public backend = 'https://jf58ricebook.herokuapp.com/';
  // public backend = 'http://localhost:3000/';
  constructor(
    public http: HttpClient
  ) { }
    find() {return new Promise((resolve, reject) => { this.http.get(this.domain).subscribe((response) => { resolve(response); }); }); }
  getHeadline(username): Observable<any> {
    // console.log(username);
    return this.http.get(this.backend + 'headline/' + username, { withCredentials: true});
  }
  getName(): Observable<any> {
    // console.log(username);
    return this.http.get(this.backend + 'headline', { withCredentials: true});
  }
  updateHeadline(headline) {
      return this.http.put(this.backend + 'headline', { headline}, { withCredentials: true});
  }
  getFollowList(username): Observable<any> {
    return this.http.get(this.backend + 'following/' + username, {withCredentials: true});
  }

  addFollow(username): Observable<any> {
    return this.http.put(this.backend + 'following/' + username, {}, {withCredentials: true});
  }
  unFollow(username): Observable<any> {
    return this.http.delete(this.backend + 'following/' + username, { withCredentials: true});
  }
  getArticles(): Observable<any> {
    return this.http.get(this.backend + 'articles', {withCredentials: true});
  }
  getImg(img): Observable<any> {
    return this.http.get(this.backend + 'avatar/' + img, { withCredentials: true});
  }
}


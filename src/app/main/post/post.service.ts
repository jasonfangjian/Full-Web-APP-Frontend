import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Router} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  public domain = 'https://jsonplaceholder.typicode.com/posts';
  // public backend = 'http://localhost:3000/';
  public backend = 'https://jf58ricebook.herokuapp.com/';
  constructor(
    public http: HttpClient
  ) { }

  get() {return new Promise((resolve, reject) => { this.http.get(this.domain).subscribe((response) => { resolve(response); }); }); }
  getFeed(): Observable<any> {
    return this.http.get(this.backend + 'articles', {withCredentials: true});
  }
  getName(): Observable<any> {
    // console.log(username);
    return this.http.get(this.backend + 'headline', { withCredentials: true});
  }
  postArticle(text, file): Observable<any> {
    const fd = new FormData();
    fd.append('text', text);
    console.log(text);
    if (file) {
      console.log(file);
      fd.append('image', file);
    }
    return this.http.post(this.backend + 'article', fd, {withCredentials: true});
  }
  updateArticle(text, textId): Observable<any> {
    return this.http.put(this.backend + 'articles/' + textId, { text}, {withCredentials: true});
  }
  updateComments(text, textid, commentId): Observable<any> {
    return this.http.put(this.backend + 'articles/' + textid, { text, commentId}, {withCredentials: true});
  }
}

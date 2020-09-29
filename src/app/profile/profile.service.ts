import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Router} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  // public backend = 'http://localhost:3000/';
  public backend = 'https://jf58ricebook.herokuapp.com/';
  constructor(
    private http: HttpClient,
    private router: Router
  ) { }
getEmail(username): Observable<any> {
    return this.http.get(this.backend + 'email/' + username, {withCredentials: true});
}

getZip(username): Observable<any> {
    return this.http.get(this.backend + 'zipcode/' + username, {withCredentials: true});
  }
  getdob(): Observable<any> {
    return this.http.get(this.backend + 'dob', {withCredentials: true});
  }
  updateEmail(email): Observable<any> {
    return this.http.put(this.backend + 'email', { email}, {withCredentials: true});
  }
  updateZipcode(zip): Observable<any> {
    return this.http.put(this.backend + 'zipcode', {zipcode: zip}, {withCredentials: true});
  }
  updatePwd(pass): Observable<any> {
    return this.http.put(this.backend + 'password', {password: pass}, {withCredentials: true});
  }
  getImg(img): Observable<any> {
    return this.http.get(this.backend + 'avatar/' + img, { withCredentials: true});
  }
  changeImg(file) {
    // const file    = ( <HTMLInputElement> document.getElementById('addImg') as HTMLInputElement).files[0];
      const fd = new FormData();
      fd.append('image', file);
      return this.http.put(this.backend + 'avatar', fd, { withCredentials: true });
  }
  loginbyFB() {
    document.location.href = this.backend + 'login/facebook';
  }
  getName(): Observable<any> {
    // console.log(username);
    return this.http.get(this.backend + 'headline', { withCredentials: true});
  }
  unlink(): Observable<any> {
    return this.http.post(this.backend + 'unlink', { company: 'facebook'} , { withCredentials: true});
  }
  merge(username, paw): Observable<any> {
    return this.http.post(this.backend + 'merge', {Username: username, Password: paw}, {withCredentials: true});
  }
}

import { Component, OnInit } from '@angular/core';
import { UserLogin} from '../../user-login';
import { ActivatedRoute, Router } from '@angular/router';
import {LoginService} from './login.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginModel = new UserLogin();
  public list: any [] = [];
  public msg: string;
  constructor(private router: Router,
              public loginservice: LoginService
  ) { }

  ngOnInit( ) {
  }
log_in() {
  this.loginservice.isRegistered(this.loginModel.accountName, this.loginModel.pwd).subscribe(data => {
    if (data.result === 'success') {
      localStorage.setItem('currentUser', this.loginModel.accountName);
      this.router.navigate(['/main', data.username]);
    }
  }, error => {
    alert(error.error);
  });
}
logFB() {
  this.loginservice.loginbyFB();
}
}

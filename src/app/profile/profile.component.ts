import { Component, OnInit } from '@angular/core';
import {UserProfile} from '../user-profile';
import {FollowingService} from '../main/following/following.service';
import { ActivatedRoute, Router } from '@angular/router';
import {ProfileService} from './profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  public source: any;
  public username: any;
  public email: any;
  public phone: any;
  public zipcode: any;
  public psw: any;
  public displayPsw: string;
public index: any;
public isShow: boolean;
public linkuser = '';
public linkpsw  = '';
  // tslint:disable-next-line:variable-name
  public user_Profile: any = new UserProfile();
  constructor(public followingservice: FollowingService,
              public profileservice: ProfileService,
              public route: ActivatedRoute
  ) { }

  ngOnInit() {
    // this.route.params.subscribe(data => this.index = data.index);
    // this.route.paramMap.subscribe(pmap => { this.index = pmap.get('username'); });
    this.profileservice.getName().subscribe(data => {
      this.username = data.headlines[0].username;
      this.profileservice.getEmail(this.username).subscribe(res => {
        this.email = res.email;
      });
      this.profileservice.getZip(this.username).subscribe(res => {
        this.zipcode = res.zipcode;
      });
      this.profileservice.getdob().subscribe(res => {
        this.displayPsw = res.dob;
      });
      this.profileservice.getImg(this.username).subscribe( res => {
        // console.log(res);
        if (res.avatars[0].avatar === null) {
          this.source = '../../assets/harden.jpg';
        } else {
          this.source = res.avatars[0].avatar;
        }
      });
    });
    // this.username = this.index;
    // this.profileservice.getEmail(this.username).subscribe(res => {
    //   this.email = res.email;
    // });
    // this.profileservice.getZip(this.username).subscribe(res => {
    //   this.zipcode = res.zipcode;
    // });
    // this.profileservice.getdob().subscribe(res => {
    //   this.displayPsw = res.dob;
    // });
    // this.profileservice.getImg(this.username).subscribe( res => {
    //   // console.log(res);
    //   if (res.avatars[0].avatar === null) {
    //     this.source = '../../assets/harden.jpg';
    //   } else {
    //     this.source = res.avatars[0].avatar;
    //   }
    // });
   // console.log(this.index);
   //  if ( this.index < 0 /*!localStorage.getItem('Index')*/) {
   //    this.username = localStorage.getItem('Username');
   //    this.email = localStorage.getItem('Email');
   //    this.phone = localStorage.getItem('Phone');
   //    this.zipcode = localStorage.getItem('Zip');
   //    this.psw = localStorage.getItem('Pass');
   //    this.displayPsw = this.psw.replace(/./g, '*');
   //  } else {
   //    // console.log(this.index);
   //  // tslint:disable-next-line:radix
   //  // this.index = parseInt(localStorage.getItem('Index'));
   //    this.followingservice.find().then((response: any) => {
   //   // console.log('sb');
   //    this.username = response[this.index].username;
   //    // console.log(this.username);
   //    this.email = response[this.index].email;
   //    this.phone = response[this.index].phone;
   //    this.zipcode = response[this.index].address.zipcode;
   //    this.psw = response[this.index].address.street;
   //    this.displayPsw = this.psw.replace(/./g, '*');
   //  }); }
  }

  submit_change() {
    // tslint:disable-next-line:triple-equals
// @ts-ignore
// tslint:disable-next-line:max-line-length
if ( ( ! this.user_Profile.psw || this.user_Profile.psw.length === 0) && (! this.user_Profile.confirm1 || this.user_Profile.confirm1.length === 0 ) || (this.user_Profile.psw === this.user_Profile.confirm1)) {
if ( ! (! this.user_Profile.username || this.user_Profile.username.length === 0)) {
// this.username = this.user_Profile.username;

this.user_Profile.username = '';
}
if ( ! (! this.user_Profile.email || this.user_Profile.email.length === 0)) {
    this.profileservice.updateEmail(this.user_Profile.email).subscribe();
    this.email = this.user_Profile.email;
    this.user_Profile.email = '';
  }
if ( ! (! this.user_Profile.phonenum || this.user_Profile.phonenum.length === 0)) {
    // this.phone = this.user_Profile.phonenum;
    this.user_Profile.phonenum = '';
  }
if ( ! (! this.user_Profile.zipcode || this.user_Profile.zipcode.length === 0)) {
    this.zipcode = this.user_Profile.zipcode;
    this.profileservice.updateZipcode(this.user_Profile.zipcode).subscribe();
    this.user_Profile.zipcode = '';
  }
if ( ! (! this.user_Profile.psw || this.user_Profile.psw.length === 0)) {
    this.profileservice.updatePwd(this.user_Profile.psw).subscribe( res => {
      this.psw = this.user_Profile.psw;
      // this.displayPsw = this.psw.replace(/./g, '*');
      this.user_Profile.psw = '';
      this.user_Profile.confirm1 = '';
    }, error => {
      alert(error.error);
      this.user_Profile.psw = '';
      this.user_Profile.confirm1 = '';
    });
    this.psw = this.user_Profile.psw;
    this.displayPsw = this.psw.replace(/./g, '*');
    this.user_Profile.psw = '';
    this.user_Profile.confirm1 = '';
  }
    } else {
  alert( 'Two inconsistent passwords');
  this.user_Profile.psw = '';
  this.user_Profile.confirm1 = '';
}

// tslint:disable-next-line:no-non-null-assertion
/*if ( !(this.user_Profile.psw  === this.user_Profile.confirm1)) {
  this.info = true;
  console.log(this.info);
} else {
  this.info = false;
}
*/

  }
  ConfirmImg() {
    const file    = ( <HTMLInputElement> document.getElementById('addImg') as HTMLInputElement).files[0];
    if (file) {
      this.profileservice.changeImg(file).subscribe( res => {
        this.profileservice.getImg(this.username).subscribe( r => {
          // console.log(r);
          if (r.avatars[0].avatar === null) {
            this.source = '../../assets/harden.jpg';
          } else {
            this.source = r.avatars[0].avatar;
          }
        });
      });
      location.reload();
    } else {
      alert('No File');
    }
  }
  linkfacebook() {
    this.profileservice.loginbyFB();
  }
  unlink() {
    this.profileservice.unlink().subscribe( res => {
      alert(res.result);
    }, error => {
      alert(error.error);
    });
  }
  toshow() {
    this.isShow = !this.isShow;
  }
  merge() {
    if (this.linkuser === '' || this.linkpsw === '') {
      alert('username or password does not provide');
    } else {
      this.profileservice.merge(this.linkuser, this.linkpsw).subscribe( res => {
        alert(res.result);
        this.linkpsw = '';
        this.linkuser = '';
        location.reload();
      }, error => {
        alert(error.error);
        this.linkpsw = '';
        this.linkuser = '';
      });
    }
  }

}

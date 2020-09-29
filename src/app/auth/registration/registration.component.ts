import { Component, OnInit } from '@angular/core';
import { UserRegistration} from '../../user-registration';
import {RegistrationService} from './registration.service';
import { ActivatedRoute, Router } from '@angular/router';
import {loadConfigurationFromPath} from 'tslint/lib/configuration';
@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})




export class RegistrationComponent implements OnInit {
  userModel = new UserRegistration();
  constructor(private router: Router,
              public regService: RegistrationService) { }

  ngOnInit() {
  }

register_submit() {
  this.regService.newRegister(this.userModel).subscribe(data => {
    if (data.result === 'success') {
      // this.router.navigate(['/main', data.username]);
       alert('Please log in the new account');
    }
  }, error => {
    // console.log(error);
    alert(error.error);
  });
}
}

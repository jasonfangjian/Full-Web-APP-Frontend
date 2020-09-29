import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import {FormsModule} from '@angular/forms';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {FollowingService} from '../../main/following/following.service';
import {userdata} from '../../../assets/userdata';
import {HttpClientModule} from '@angular/common/http';

describe('LoginComponent', () => {
  // tslint:disable-next-line:prefer-const
  let component: LoginComponent;
  // tslint:disable-next-line:prefer-const
  let fixture: ComponentFixture<LoginComponent>;
  // tslint:disable-next-line:prefer-const
  let followingservice: FollowingService;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      imports: [
        FormsModule,
        RouterTestingModule,
        HttpClientModule
      ],
      providers: [FollowingService,
      ]
    })
    .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(LoginComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        followingservice = TestBed.get(FollowingService);
        spyOn(window, 'alert');
        spyOn(followingservice, 'find').and.returnValue(new Promise((resolve, reject) => {
          resolve(userdata);
        }));
        // component.ngOnInit();
      });
  }));

  /*beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });*/

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not log in an invalid user(alert if the user does not exist)', () => {
    const user = component.loginModel;
    user.accountName = '1234';
    user.pwd = 'Kulas Light';
    const checksubmit = component.log_in();
    // console.log(component.errorMsg);
    expect(component.msg).toEqual('Wrong Account Name');
    expect(window.alert).toHaveBeenCalled();
  });

  it('should not log in an invalid user(alert if the password is wrong)', () => {
    const user = component.loginModel;
    user.accountName = 'Bret';
    user.pwd = '12345';
    const checksubmit = component.log_in();
    // console.log(component.errorMsg);
    expect(component.msg).toEqual('Wrong Password');
    expect(window.alert).toHaveBeenCalled();
  });

  it('should log in a previously registered user (not new users)', () => {
    const user = component.loginModel;
    user.accountName = 'Bret';
    user.pwd = 'Kulas Light';
    const checksubmit = component.log_in();
    // console.log(component.errorMsg);
    expect(component.msg).toEqual('success');
  });

});

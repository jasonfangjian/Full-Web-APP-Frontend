import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileComponent } from './profile.component';

import {FormsModule} from '@angular/forms';
import {RouterTestingModule} from '@angular/router/testing';
import {ActivatedRoute} from '@angular/router';
import {ActivatedRouteStub} from './activated-route-stub';
import {FollowingService} from '../main/following/following.service';
import {userdata} from '../../assets/userdata';
import {HttpClientModule} from '@angular/common/http';

describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;
  // tslint:disable-next-line:prefer-const
  let followingservice: FollowingService;
  const activatedRoutestub = new ActivatedRouteStub();
  activatedRoutestub.setParamMap({index: 0});
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileComponent ],
      imports: [ FormsModule,
        RouterTestingModule,
        HttpClientModule],
      providers: [
        FollowingService,
        {
          provide:  ActivatedRoute,
          useValue: activatedRoutestub
        }
      ]
    })
    .compileComponents()
     .then(() => {
      fixture = TestBed.createComponent(ProfileComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
      followingservice = TestBed.get(FollowingService);
      spyOn(window, 'alert');
      spyOn(followingservice, 'find').and.returnValue(new Promise((resolve, reject) => {resolve(userdata); }));
      // component.ngOnInit();
   });
  }));

  // beforeEach(() => {
  //   fixture = TestBed.createComponent(ProfileComponent);
  //   component = fixture.componentInstance;
  //   fixture.detectChanges();
  //   followingservice = TestBed.get(FollowingService);
  //   spyOn(followingservice, 'find').and.returnValue(new Promise((resolve, reject) => {resolve(userdata); }));
  //   component.ngOnInit();
  // });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should fetch the logged in user profile information', () => {
    // console.log(userdata);
    expect(component.username).toEqual('Bret');
    expect(component.psw).toEqual('Kulas Light');
    expect(component.zipcode).toEqual('92998-3874');
    expect(component.phone).toEqual('1-770-736-8031 x56442');
    expect(component.email).toEqual('Sincere@april.biz');
  });
  it('should update profile information after onSubmit called', () => {
   const  userInfo = component.user_Profile;
   userInfo.psw = '12345';
   userInfo.confirm1 = '12345';
   userInfo.username = 'test';
   userInfo.email = '123@123.com';
   userInfo.phonenum = '111-111-1111';
   userInfo.zipcode = '11111';
   const dosubmit = component.submit_change();
   expect(component.username).toEqual('test');
   expect(component.psw).toEqual('12345');
   expect(component.zipcode).toEqual('11111');
   expect(component.phone).toEqual('111-111-1111');
   expect(component.email).toEqual('123@123.com');
 });
  it('should alert when the passwords are inconsistent', () => {
    const  userInfo = component.user_Profile;
    userInfo.psw = '123456';
    userInfo.confirm1 = '12345';
    component.submit_change();
    expect(window.alert).toHaveBeenCalledWith('Two inconsistent passwords');
  } );
});



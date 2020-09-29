import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FollowingComponent } from './following.component';
import {FormsModule} from '@angular/forms';
import {RouterTestingModule} from '@angular/router/testing';
import {MainComponent} from '../main.component';
import {PostComponent} from '../post/post.component';
import {HttpClientModule} from '@angular/common/http';
import {PostService} from '../post/post.service';
import {FollowingService} from './following.service';
import {postdata} from '../../../assets/postdata';
import {userdata} from '../../../assets/userdata';
import {ActivatedRouteStub} from '../../profile/activated-route-stub';
import {ActivatedRoute} from '@angular/router';

describe('FollowingComponent', () => {
  let component: FollowingComponent;
  // tslint:disable-next-line:prefer-const
  let fixture: ComponentFixture<FollowingComponent>;
  let post: PostService;
  let follow: FollowingService;
  const activatedRoutestub: ActivatedRouteStub = new ActivatedRouteStub();
  activatedRoutestub.setParamMap({ index: 0});
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FollowingComponent,
      ],
      imports: [
        FormsModule,
        RouterTestingModule,
        HttpClientModule
      ],
      providers: [PostService, FollowingService, {provide: ActivatedRoute, useValue: activatedRoutestub}]
    })
    .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(FollowingComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        post = TestBed.get(PostService);
        follow = TestBed.get(FollowingService);
        spyOn(window, 'alert');
        spyOn(post, 'get').and.returnValue(new Promise((resolve, reject) => {resolve(postdata); }));
        spyOn(follow,  'find').and.returnValue(new Promise((resolve, reject) => {resolve(userdata); }));
      });
  }));

  // beforeEach(() => {
  //   fixture = TestBed.createComponent(FollowingComponent);
  //   component = fixture.componentInstance;
  //   fixture.detectChanges();
  // });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should alert when following an nonexistent user', () => {
    component.addname = '1234567';
    component.update_follow();
    expect(component.msg).toEqual('User Not Found');
    expect(window.alert).toHaveBeenCalled();
  });
  it('should add articles when adding a follower(@Output an article Array to parent)', () => {
    component.addname = 'Antonette';
    spyOn(component.outer, 'emit');
    fixture.detectChanges();
    component.update_follow();
    expect(component.addIndex).toEqual(1);
    expect(component.followerList[0].name).toEqual('Antonette');
    expect(component.followerList[0].headline).toEqual(userdata[1].company.catchPhrase);
    expect(component.outer.emit).toHaveBeenCalled();
    // tslint:disable-next-line:prefer-for-of
  });
  it('should remove articles when removing a follower(@Output a username the user wants to remove to parent)', () => {
    component.addname = 'Antonette';
    spyOn(component.outer, 'emit');
    fixture.detectChanges();
    component.update_follow();
    expect(component.followerList.length).toEqual(1);
    component.unfollow(0);
    expect(component.followerList).toEqual([]);
    expect(component.outer.emit).toHaveBeenCalled();
  });
});

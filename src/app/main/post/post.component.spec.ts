import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostComponent } from './post.component';
import {FormsModule} from '@angular/forms';
import {RouterTestingModule} from '@angular/router/testing';
import {PostService} from './post.service';
import {MainComponent} from '../main.component';
import {FollowingService} from '../following/following.service';
import {userdata} from '../../../assets/userdata';
import {postdata} from '../../../assets/postdata';
import {ActivatedRouteStub} from '../../profile/activated-route-stub';
import {ActivatedRoute} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';

describe('PostComponent', () => {
  let component: PostComponent;
  let fixture: ComponentFixture<PostComponent>;
  // tslint:disable-next-line:prefer-const
  let post: PostService;
  // tslint:disable-next-line:prefer-const
  let follow: FollowingService;
  const activatedRoutestub: ActivatedRouteStub = new ActivatedRouteStub();
  activatedRoutestub.setParamMap({ index: 0});
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostComponent,
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
        fixture = TestBed.createComponent(PostComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        post = TestBed.get(PostService);
        follow = TestBed.get(FollowingService);
        spyOn(post, 'get').and.returnValue(new Promise((resolve, reject) => {resolve(postdata); }));
        // spyOn(follow,  'find').and.returnValue(new Promise((resolve, reject) => {resolve(userdata); }));
        // spyOn(component.router, 'navigate').and.callThrough();
        // component.ngOnInit();
      });
  }));

  /*beforeEach(() => {
    fixture = TestBed.createComponent(PostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });*/

  it('should create', () => {
    expect(component).toBeTruthy();
    // console.log(component.list);
    // console.log(component.showList);
  });
  it('should fetch articles for current logged in user', () => {
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < component.showList.length; i++) {
      expect(component.showList[i].body).toEqual(postdata[i].body);
    }
  });
  it('new articles appear at top of feed when added', () => {
    component.newPost = '1234567890';
    component.add_newPost();
    expect(component.showList[0].body).toEqual('1234567890');
  });

});

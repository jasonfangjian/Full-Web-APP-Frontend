import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MainComponent } from './main.component';
import {RouterTestingModule} from '@angular/router/testing';
import {FormsModule} from '@angular/forms';
import {FollowingComponent} from './following/following.component';
import {PostComponent} from './post/post.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {ActivatedRouteStub} from '../profile/activated-route-stub';
import {ActivatedRoute} from '@angular/router';
import {AuthComponent} from '../auth/auth.component';
import {ProfileComponent} from '../profile/profile.component';
import {userdata} from '../../assets/userdata';
import {postdata} from '../../assets/postdata';
import {FollowingService} from './following/following.service';
import {PostService} from './post/post.service';
import {HttpClientModule} from '@angular/common/http';
import {UserPosting} from '../user-posting';
describe('MainComponent', () => {
  // tslint:disable-next-line:prefer-const
  let component: MainComponent;
  // tslint:disable-next-line:prefer-const
  let follow: FollowingComponent;
  // tslint:disable-next-line:prefer-const
  let post: PostComponent;
  // tslint:disable-next-line:prefer-const
  let followservice: FollowingService;
  let postservice: PostService;
  let fixture: ComponentFixture<MainComponent>;
  const activatedRoutestub: ActivatedRouteStub = new ActivatedRouteStub();
  activatedRoutestub.setParamMap({ index: 0});
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        MainComponent,
        FollowingComponent,
        PostComponent,
        ProfileComponent,
      ],
      imports: [
        RouterTestingModule, /*.withRoutes([{path: 'auth', component: AuthComponent}, {path: 'profile', component: ProfileComponent}]),*/
        FormsModule,
        HttpClientModule
      ],
      providers: [PostService, FollowingService, UserPosting, {provide: ActivatedRoute, useValue: activatedRoutestub}]
    })
    .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(MainComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        postservice = TestBed.get(PostService);
        followservice = TestBed.get(FollowingService);
        spyOn(postservice, 'get').and.returnValue(new Promise((resolve, reject) => {resolve(postdata); }));
        spyOn(followservice, 'find').and.returnValue(new Promise((resolve, reject) => {resolve(userdata); }));
        // spyOn(component.router, 'navigate').and.callThrough();
        // component.ngOnInit();
        // post.ngOnInit();
      });
  }));

  /*beforeEach(() => {
    fixture = TestBed.createComponent(MainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });*/

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should log out a user (login state should be cleared)', () => {
    const logout = component.log_out();
    expect(component.log).toBeFalsy();
  });
  it('should clear search area when click the clear submit', () => {
    const clear = component.clear_search();
    expect(component.search).toEqual('');
    expect(component.footer.showList).toEqual(component.footer.list);
  });

  it('should filter displayed articles by the search keyword', () => {
    component.search = ' tempore';
    // tslint:disable-next-line:variable-name
    const do_seatch = component.do_search();
    expect(component.footer.showList[0].body).toEqual(postdata[1].body);
  });
  it('should add articles when adding a follower', () => {
    const list: any [] = [];
    for (let i = 10; i < 20; i ++) {
      const posts = new UserPosting();
      posts.title = postdata[i].title;
      posts.body = postdata[i].body;
      posts.timeStamp = new Date();
      posts.author = userdata[1].username;
      list.push(posts);
    }
    component.add_post(list);
    let j = 9;
    for ( let i = 0; i < 10; i++) {
    expect(component.footer.showList[i].body).toEqual(postdata[j + 10].body);
    j--;
    }
 });
  it('should remove articles when removing a follower', () => {
    const list: any [] = [];
    for (let i = 10; i < 20; i ++) {
      const posts = new UserPosting();
      posts.title = postdata[i].title;
      posts.body = postdata[i].body;
      posts.timeStamp = new Date();
      posts.author = userdata[1].username;
      list.push(posts);
    }
    component.add_post(list);
    let j = 9;
    for ( let i = 0; i < 10; i++) {
      expect(component.footer.showList[i].body).toEqual(postdata[j + 10].body);
      j--;
    }
    component.add_post('Antonette');
    expect(component.footer.showList.length).toEqual(10);
    for ( let i = 0; i < 10; i++) {
      expect(component.footer.showList[i].author).toEqual(userdata[0].username);
      j--;
    }
});

});

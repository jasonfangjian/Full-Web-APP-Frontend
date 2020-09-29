import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FollowingService} from './following.service';
import {PostService} from '../post/post.service';
import {HttpClient} from '@angular/common/http';
import {UserFollowing} from '../../user-following';
import {ActivatedRoute} from '@angular/router';
import {UserPosting} from '../../user-posting';

// @ts-ignore
@Component({
  selector: 'app-following',
  templateUrl: './following.component.html',
  styleUrls: ['./following.component.css']
})
export class FollowingComponent implements OnInit {
  @Output() public outer = new EventEmitter<any>();
  public newUser: any;
  public newFollow: any [] = [];
  public followerList: any [] = [];
  public changeList: any [] = [];
  public postList: any [] = [];
  public addname = '';
  public headline: any;

  public source: any;
  public accountname: any;

  public changeHead = '';
  public index: any;
  public addIndex: any;
  public msg: string;
  constructor(
    public followingservice: FollowingService,
    public postservice: PostService,
    public http: HttpClient,
    public route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.followingservice.getName().subscribe(data => {
      // console.log(response);
      // console.log(data.headlines[0].username);
      this.accountname = data.headlines[0].username;
      // tslint:disable-next-line:no-shadowed-variable
      this.followingservice.getHeadline(this.accountname).subscribe(data => {
        // console.log(response);
        this.headline = data.headlines[0].headline;
      });
      this.followingservice.getImg(this.accountname).subscribe( res => {
        if (res.avatars[0].avatar === null) {
          this.source = '../../assets/harden.jpg';
        } else {
          this.source = res.avatars[0].avatar;
        }
      });
      // tslint:disable-next-line:no-shadowed-variable
      this.followingservice.getFollowList(this.accountname).subscribe(data => {
        data.following.forEach(r => {
          const add = new UserFollowing();
          add.name = r;
          this.followingservice.getImg(r).subscribe( result => {
            // console.log(r);
            if (result.avatars[0].avatar === null) {
              add.imgSrc = '../../assets/harden.jpg';
            } else {
              add.imgSrc = result.avatars[0].avatar;
            }
          });
          this.followingservice.getHeadline(r).subscribe(res => {
            // console.log(response);
            add.headline = res.headlines[0].headline;
          });
          this.followerList.push(add);
        });
      });
    });
  }

  update_head() {
    // tslint:disable-next-line:no-conditional-assignment no-non-null-assertion triple-equals
    if ( !(this.changeHead.length === 0)) {
      this.followingservice.updateHeadline(this.changeHead).subscribe();
      this.headline = this.changeHead;
      this.changeHead = '';
    }
  }

  update_follow() {
    if (this.addname === this.accountname) {
      alert('Can not follow himself');
      this.addname = '';
    } else if (!(this.addname.length === 0)) {
      // tslint:disable-next-line:no-shadowed-variable
      this.followingservice.addFollow(this.addname).subscribe(res => {
        // console.log(res);
        const add = new UserFollowing();
        add.name = this.addname;
        this.followingservice.getImg(this.addname).subscribe( result => {
          // console.log(r);
          if (result.avatars[0].avatar === null) {
            add.imgSrc = '../../assets/harden.jpg';
          } else {
            add.imgSrc = result.avatars[0].avatar;
          }
        });
        this.followingservice.getHeadline(this.addname).subscribe( r => {
          // console.log(response);
          add.headline = r.headlines[0].headline;
        });
        // tslint:disable-next-line:no-shadowed-variable
        this.followingservice.getArticles().subscribe( res => {
          // console.log(res.articles);
          this.outer.emit(res.articles);
        });
        this.followerList.push(add);
        this.addname = '';
        // tslint:disable-next-line:no-shadowed-variable
      },  error => {
        alert(error.error);
        this.addname = '';
      } );
    }
  }


  unfollow(key: number) {
    // this.addIndex = this.newFollow.findIndex(obj => obj.username === this.followerList[key].name);
    this.outer.emit(this.followerList[key].name);
    this.followingservice.unFollow(this.followerList[key].name).subscribe();
    this.followerList.splice(key, 1);
  }
}

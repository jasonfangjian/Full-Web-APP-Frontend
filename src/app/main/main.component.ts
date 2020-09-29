import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {MainService} from './main.service';
import {UserPosting} from '../user-posting';
import {UserComments} from '../user-comments';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})

export class MainComponent implements OnInit {
public search: string;
  public username: any;
  public log = true;
  public list: any [] = [];
  // @ts-ignore
  @ViewChild ('footerChild') footer;


  constructor(public router: Router,
              public mainservice: MainService,
              public route: ActivatedRoute) { }

  ngOnInit(
  ) {
    // this.route.paramMap.subscribe(pmap => { this.username = pmap.get('username'); });
    this.mainservice.getName().subscribe(res => {
      this.username = res.headlines[0].username;
    });
    this.list = this.footer.showList;
    // console.log(this.index);
  }
log_out() {
    this.mainservice.logout().subscribe(res => {
    }, error => {
      // console.log(error.text);
      this.router.navigate(['/auth']);
    });
}
clear_search() {
    this.search = '';
    this.footer.showList = this.list;

}
do_search() {
    if (!(!this.search || this.search.length === 0)) {
       const  temp: any[] = [];
      // tslint:disable-next-line:prefer-for-of
       for (let i = 0; i < this.list.length; i++) {
        // console.log(this.footer.list[i].author);
         // tslint:disable-next-line:max-line-length
        if (this.list[i].author.toLowerCase().includes(this.search.toLowerCase()) || this.list[i].body.toLowerCase().includes(this.search.toLowerCase())) {
          temp.push(this.list[i]);
        }
      }
       this.footer.showList = temp;
       this.search = '';
    }
}

  add_post(msg: any) {
    if (msg instanceof Array) {
      this.footer.showList = [];
      msg.forEach(r => {
        const post = new UserPosting();
        r.comments.forEach( c => {
          const comment = new UserComments();
          comment.id = c.commentId;
          comment.username = c.author;
          comment.comment = c.text;
          post.comments.push(comment);
        });
        post.imgSrc = r.img;
        post._id = r._id;
        post.author = r.author;
        post.timeStamp = r.date;
        post.title = 'POST';
        post.body = r.text;
        this.footer.showList.push(post);
      });
      this.list = this.footer.showList;
    } else {
      // tslint:disable-next-line:prefer-for-of
      for ( let i = 0; i < this.footer.showList.length; i++) {
        if (this.footer.showList[i].author === msg) {
          this.footer.showList.splice(i, 1);
          i--;
        }
      }
    }
  }
}

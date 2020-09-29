import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {PostService} from './post.service';
import {FollowingService} from '../following/following.service';
import {UserPosting} from '../../user-posting';
import {UserComments} from '../../user-comments';

import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
   public user: any [] = [];
   public userCom: any [] = [];
   public showList: any [] = [];
   public newPost = '' ;
public username: any;
public Show = true;
  constructor(
     public followservice: FollowingService,
     public postservice: PostService,
     public http: HttpClient,
     public route: ActivatedRoute
  ) { }


  ngOnInit() {
    this.postservice.getName().subscribe(data => {
      this.username = data.headlines[0].username;
      this.postservice.getFeed().subscribe(res => {
        // console.log(res);
        res.articles.forEach(r => {
          const post = new UserPosting();
          // post.comments.unshift(comment);
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
          this.showList.push(post);
        });
      });
    });
  }

  add_newPost() {
    if (!(this.newPost.length === 0)) {
      const file    = ( document.getElementById('postImg') as HTMLInputElement as HTMLInputElement).files[0];
      this.postservice.postArticle(this.newPost, file).subscribe(res => {
        const post = new UserPosting();
        post.imgSrc = res.articles[0].img;
        post._id = res.articles[0]._id;
        post.author = res.articles[0].author;
        post.timeStamp = res.articles[0].date;
        post.title = 'POST';
        post.body = res.articles[0].text;
        this.showList.unshift(post);
        this.newPost = '';
      });
      location.reload();
    }
  }

  clear_newPost() {
    this.newPost = '';
}

  toShow(item: any) {
    item.isShow = !item.isShow;
    // tslint:disable-next-line:no-non-null-assertion no-unused-expression
    item.buttonValue = item.buttonValue === 'Show Comments' ? 'Hide Comments' : 'Show Comments';
  }
  toEdit(item: any) {
    item.isEdit = ! item.isEdit;
    item.editButton = item.editButton === 'Edit Post' ? 'Cancel' : 'Edit Post';
    item.editPost = '';
  }
  ConfirmEdit(key: number) {
    // console.log(this.showList[key]._id);
    this.postservice.updateArticle(this.showList[key].editPost, this.showList[key]._id).subscribe(res => {
    this.showList[key].body = this.showList[key].editPost;
    this.showList[key].editPost = '';
}, error => {
      this.showList[key].editPost = '';
      alert(error.error);
    });
  }
  addComment(item: any) {
    if (item.addComments !== '') {
      this.postservice.updateComments(item.addComments, item._id, '-1').subscribe(res => {
        // console.log(res);
        item.comments = [];
        // console.log(res.author);
        res.articles.comments.forEach( c => {
          const comment = new UserComments();
          comment.id = c.commentId;
          comment.username = c.author;
          comment.comment = c.text;
          item.comments.push(comment);
        } );
        // item.comments = newCommentList;
        item.addComments = '';
      });
    } else {
      item.addComments = '';
      alert('dose not provide the comment');
    }
  }
  toEditComment(item: any) {
    item.isShowEdit = ! item.isShowEdit;
    item.editCommentButton = item.editCommentButton === 'Edit Comment' ? 'Cancel' : 'Edit Comment';
    item.editComment = '';
  }
  ConfirmEditComment(item: any, com: any) {
    if (com.editComment !== '') {
      this.postservice.updateComments(com.editComment, item._id, com.id).subscribe( res => {
        // console.log(res);
        // const newCommentList: any [] = [];
        // console.log(res.author);
        item.comments = [];
        res.articles.comments.forEach( c => {
          const comment = new UserComments();
          comment.id = c.commentId;
          comment.username = c.author;
          comment.comment = c.text;
          item.comments.push(comment);
        } );
        // item.comments = newCommentList;
        com.editComment = '';
      }, error => {
        alert(error.error);
        com.editComment = '';
      });
    } else {
      alert('dose not provide edit comment');
    }
  }
}

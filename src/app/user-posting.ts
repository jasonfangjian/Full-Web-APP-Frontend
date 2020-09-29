import {UserComments} from './user-comments';
export class UserPosting {
  public editPost = '';
  public addComments = '';
  public comments: any [] = [];
  public title: any;
  public body: any;
  public author: any;
  public timeStamp: any;
  // tslint:disable-next-line:variable-name
  public _id: any;
  public imgSrc: any;
  public isShow: boolean;
  public isEdit: boolean;
  public buttonValue = 'Show Comments';
  public editButton = 'Edit Post';
}

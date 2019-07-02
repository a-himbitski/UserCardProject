import { Component, OnInit, EventEmitter } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from 'src/model/user';
import { ActivatedRoute, ParamMap, Router} from '@angular/router';


@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styles: []
})
export class UserDetailComponent implements OnInit {

  private _errorMessage:string;
  private _errorIsHidden: boolean;
  
  public _currentUser:User;
  
  public get user():User{
    return this._currentUser;
  }

  

  constructor(private _userService:UserService, private _route:ActivatedRoute, private _router:Router) {
    this._errorIsHidden = true;
   }

  ngOnInit() {
    this._route.paramMap.subscribe((params: ParamMap) => {  
      let id = parseInt(params.get('id'));
      this._userService.getUserById(id).subscribe(user=>this._currentUser = user);
    });

  }
   
  // public onLikeClick(user:User): void {
  //   user.onRatingUpdate(true);
  //   user.IsUpdated = { color:'green' };
  // }

  // public onDislikeClick(user:User):void {
  //   user.onRatingUpdate(false);
  //   user.IsUpdated = { color:'red' };
  // } 

  // public onEditButtonClick(user:User):void {
  //   let statusLable = user.getIsHidden() ?'Stop edit name' : 'Edit name';

  //   user.setStatusLable(statusLable);
  //   user.setIsHidden(!user.getIsHidden());
  // }

  // public onUpdateButtonClick(user:User):void {
  //  this._userService.updateUser(user);
  // }

  // public getErrorMessage():string{
  //   return this._errorMessage;
  // }

  // public isHidden():boolean
  // {
  //   return this._errorIsHidden;
  // }

  // public onNextClick()
  // {
  //    this._userService.getUserIndex(this._currentUser.id).then((index)=>{
  //     this._userService.getNext(index).then((next)=>{
  //       this._router.navigate(['/users',next.id]);
  //     })
  //    });    
  // }

  // public onPrevoiusClick()
  // {
  //   this._userService.getUserIndex(this._currentUser.id).then((index)=>{
  //     this._userService.getPrevoius(index).then((previous)=>{
  //       this._router.navigate(['/users',previous.id]);
  //     })
  //    });    
  // }

  // public onBackClick()
  // {
  //   this._router.navigate(['/users',{ userId: this._currentUser.id, userColor:this._currentUser.IsUpdated.color }]);
  // }

  public showOverview(){
    this._router.navigate(['overview'],{relativeTo: this._route});
  }
  public showRating()
  {
    this._router.navigate(['raiting'],{relativeTo: this._route});
  }
}

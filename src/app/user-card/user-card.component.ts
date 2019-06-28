import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from 'src/model/user';
import { catchError } from 'rxjs/operators';
import { Observable, throwError, from } from 'rxjs';
import {Router} from '@angular/router';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.css']
})
export class UserCardComponent implements OnInit {

  private _errorMessage:string;
  private _errorIsHidden: boolean;
  private _users$: Observable<User[]>;

  public get users$():Observable<User[]>{
    return this._users$;
  }
 
  constructor(private _userService:UserService,private _router:Router) {
      this._errorIsHidden = true;
  }

  public ngOnInit():void {
    this._users$ = this._userService.getUsers().pipe(
      catchError(
        (error)=> {
          this._errorMessage= error;
          this._errorIsHidden = false;
          return throwError(error)}
        ));
  }

  public onLikeClick(user:User): void {
      user.onRatingUpdate(true);
  }

  public onDislikeClick(user:User):void {
      user.onRatingUpdate(false);
  }

  public onEditButtonClick(user:User):void {
    let statusLable = user.getIsHidden() ?'Stop edit name' : 'Edit name';

    user.setStatusLable(statusLable);
    user.setIsHidden(!user.getIsHidden());
  }

  public onUpdateButtonClick(user:User):void {
     this._userService.updateUser(user);
  }

  public getErrorMessage():string{
    return this._errorMessage;
  }

  public isHidden():boolean
  {
    return this._errorIsHidden;
  }

  public onUserSelected(user:User){
    this._router.navigate(['/users', user.id])
  }
}




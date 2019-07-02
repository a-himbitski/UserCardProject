import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from 'src/model/user';
import { catchError } from 'rxjs/operators';
import { Observable, throwError, from, Subscription } from 'rxjs';
import {Router, ActivatedRoute, ParamMap} from '@angular/router';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.css']
})
export class UserCardComponent implements OnInit {

  private _roterSubscription:Subscription;
  private _errorMessage:string;
  private _errorIsHidden: boolean;
  private _users$: Observable<User[]>;
  private _selectedId:number; 
  private _userUpdateResultColor:string;
  private _defaultUserColor:string;

  public get users$():Observable<User[]>{
    return this._users$;
  }

  public getUserColor():string{
       return this._userUpdateResultColor;
  }

  public getDefaultColor():string{
        return this._defaultUserColor;
  }
 
  constructor(private _userService:UserService,private _router:Router, private _route:ActivatedRoute) {
      this._errorIsHidden = true;
      this._defaultUserColor= 'black';
  }

  public ngOnInit():void {
    this._users$ = this._userService.getUsers().pipe(
      catchError(
        (error)=> {
          this._errorMessage= error;
          this._errorIsHidden = false;
          return throwError(error)}
        ));

      this._roterSubscription = this._route.paramMap.subscribe((params: ParamMap) => {
      this._selectedId = parseInt(params.get('userId'));   
      this._userUpdateResultColor = params.get('userColor');
      });
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

  public isSelected(user:User){
    return  user.id === this._selectedId;
  }

  ngOnDestroy(){
    this._roterSubscription.unsubscribe();
  }
}




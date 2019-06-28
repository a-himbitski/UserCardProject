import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from 'src/model/user';
import { catchError } from 'rxjs/operators';
import { Observable, throwError, from } from 'rxjs';
import { ActivatedRoute, ParamMap} from '@angular/router';

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

  constructor(private _userService:UserService, private route:ActivatedRoute) {
    this._errorIsHidden = true;
   }

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      let id = parseInt(params.get('id'));
      this._userService.getUserById(id).subscribe(user=>this._currentUser = user);
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
}

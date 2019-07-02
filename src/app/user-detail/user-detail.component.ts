import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from 'src/model/user';
import { ActivatedRoute, ParamMap, Router} from '@angular/router';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styles: []
})
export class UserDetailComponent implements OnInit {

  private _roterSubscription:Subscription;

  public _currentUser:User;
  
  public get user():User{
    return this._currentUser;
  }

  

  constructor(private _userService:UserService, private _route:ActivatedRoute, private _router:Router) {

   }

  ngOnInit() {
      this._roterSubscription = this._route.paramMap.subscribe((params: ParamMap) => {  
      let id = parseInt(params.get('id'));
      this._userService.getUserById(id).subscribe(user=>this._currentUser = user).unsubscribe();
    });

  }
   
  public showOverview(){
    this._router.navigate(['overview'],{relativeTo: this._route});
  }
  public showRating()
  {
    this._router.navigate(['raiting'],{relativeTo: this._route});
  }

  public ngOnDestroy(){
    this._roterSubscription.unsubscribe();
  }
  
}

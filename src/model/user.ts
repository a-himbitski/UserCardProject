import { RatingManager } from './RatingManager';
import { JsonPipe } from '@angular/common';

export class User {

    private _ratingManager:RatingManager;
    private _statusLable:string;
    private _updateLable:string;
    private _isHidden: boolean;

    public get id() : number {
      return this._id;
    }
    public set id(value: number) {
        this._id = value;
    }

    public get firstName(): string {
      return this._firstName;
    }
    public set firstName(value: string) {
      this._firstName = value;
    }
  
    public get lastName(): string {
      return this._lastName;
    }
    public set lastName(value: string) {
      this._lastName = value;
    }
  
    public get age(): number {
      return this._age;
    }
    public set age(value: number) {
      this._age = value;
    }
  
    public get skills(): string[] {
      return this._skills;
    }
    public set skills(value: string[]) {
      this._skills = value;
    }
  
    public getRating() : number {
      return this._ratingManager.count;
    }
    
    public getStyle() : { color: string; } {
      return this._ratingManager.getRatingStyle();
    }

    public getMax() : boolean {
      return this._ratingManager.isMaximum();
    }

    public getMin() : boolean {
      return this._ratingManager.isMinimum();
    }

    public getStatusLable():string{
       return this._statusLable;
    }
    public setStatusLable(value:string):void{
       this._statusLable = value;
    }

    public getIsHidden():boolean{
      return this._isHidden;
    }
    public setIsHidden(value:boolean):void{
      this._isHidden = value;
    }

    public getUpdateLable():string{
      return this._updateLable;
    }
    private constructor(
      private _id:number,
      private _firstName: string,
      private _lastName: string,
      private _age: number,
      private _skills: string[]) {
        
        this._ratingManager = new RatingManager(0,10,-10);
        this._statusLable = 'Edit Name';
        this. _isHidden = true;
        this._updateLable = "Update Name"
    }
    
    public onRatingUpdate(isLiked:boolean)
    {
        if(isLiked)
        {
           this._ratingManager.plus();
           return;
        }
        
        this._ratingManager.minus();
    }
    
  
    public static FromJson(user:IUser):User{
        return new User(user.id,user.firstName,user.lastName,user.age,user.skills);
    }

    public static ToJson(user:IUser):string{
      return JSON.stringify(<IUser>{id:user.id,firstName:user.firstName,lastName:user.lastName,age:user.age,skills:user.skills});
    }
  }


  export interface IUser {
    id: number;
    firstName:string,
    lastName:string,
    age: number,
    skills: string []
}
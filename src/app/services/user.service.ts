import { Injectable } from '@angular/core';
import { User, IUser } from 'src/model/user';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators'
import { Observable, throwError } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UserService {


  private _url: string = "http://localhost:3000/Users/";

  constructor(private _httpClient: HttpClient) { }

  public getUsers(): Observable<User[]> {

    return this._httpClient.get<IUser[]>(this._url).pipe(
      map(res => {
        return res.map(item => User.FromJson(item))
      }),
      catchError(this.errorHandler)
    );
  }

  public updateUser(user: User): Promise<User> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    
    return this._httpClient.put<User>(this._url + user.id, User.ToJson(user), httpOptions)
      .pipe(
        map(res => User.FromJson(res)),
        catchError(this.errorHandler)
      ).toPromise() as Promise<User>;
  }

  public getUserById(id:number):Observable<User>{
    return this._httpClient.get<IUser>(this._url+ id).pipe(
      map(res=> User.FromJson(res)),catchError(this.errorHandler));
  }

  public getUserIndex(id:number):Promise<number>{
    return ( this._httpClient.get<IUser[]>(this._url).pipe(
      map(res => {
        return res.map(item => User.FromJson(item))
      }),
      catchError(this.errorHandler)
    ).toPromise() as Promise<User[]>).then((users:User[]) => {
      
      for (let i = 0; i <  users.length; i++) {

        if (id === users[i].id) {
          return i;       
        }      
      }
  
      throwError("No such user");
    });
  }

  public getNext(currentUserIndex:number):Promise<User>{
    return (this._httpClient.get<IUser[]>(this._url).pipe(
      map(res => {
        return res.map(item => User.FromJson(item))
      }),
      catchError(this.errorHandler)).toPromise() as Promise<User[]>).then((users:User[])=>{
        
        let userIndex = currentUserIndex + 1; 
    
        if (userIndex === users.length) {
          userIndex = 0;
        }
        
        return users[userIndex];
      });
  }


  public getPrevoius(currentUserIndex:number):Promise<User>{
    return (this._httpClient.get<IUser[]>(this._url).pipe(
      map(res => {
        return res.map(item => User.FromJson(item))
      }),
      catchError(this.errorHandler)).toPromise() as Promise<User[]>).then((users:User[])=>{
        let userIndex = currentUserIndex - 1; 
    
        if (currentUserIndex === 0) {
          userIndex = users.length - 1;
        }
        
        return users[userIndex];  
      });
  }

  public errorHandler(e:Error): Observable<never> {
     return throwError(e.message|| "User Source Error");
  }
}

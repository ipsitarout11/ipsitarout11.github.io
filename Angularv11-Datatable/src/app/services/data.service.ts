import { Injectable, Output, EventEmitter } from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

import { User } from '../models/user';

import { Observable, throwError } from 'rxjs';
import { catchError , retry} from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'my-auth-token'
  })
};
@Injectable({
  providedIn: 'root'
})
export class DataService {
  baseUrl = 'api/sample';
  
  constructor(private http: HttpClient) { }
  private headers = new Headers({ 'Content-Type': 'application/json' });
  

  addUser(user: User): Observable<User> {
   
    return this.http.post<User>(this.baseUrl, user, httpOptions)
    .pipe(
      catchError(this.handleError)
    );
  }
  

  
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.baseUrl).pipe(
      catchError(this.handleError)
    );;
  }
  getUser(id: number): Observable<User> {
    return this.http.get<User>(this.baseUrl + '/' + id).pipe(
      catchError(this.handleError)
    );;
  }
  deleteUser(id: number): Observable<User> {
    return this.http.delete<User>(this.baseUrl + '/' + id,httpOptions).pipe(
      catchError(this.handleError)
    );
  }
  
  updateUser(id: number,user: User): Observable<User> {
   
    return this.http.post<User>(this.baseUrl+'/'+id , user, httpOptions)
    .pipe(
    
      catchError(this.handleError)
    );
  }
  
  
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
    
      console.error('An error occurred:', error.error.message);
    } else {
      
      console.error(
        `${error}` +
        `error code ${error.status}, ` +
        `error body : ${error.error}`);
    }
   
    return throwError(
      'Something went wrong; please try again later.');
  };

}
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { User } from '../models/user.model';
import { getLoadUserById, getLoadUsersUrl, getSaveUserUrl } from '../url/url';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private authService: AuthService,
    private http: HttpClient
  ) { }

  getUsers() {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    headers = headers.set('Authorization', `Bearer ${this.authService.getLogged().token}`)
    return this.http.get(getLoadUsersUrl(), { headers: headers }).pipe(
      map((response: any) => response),
      catchError((error: HttpErrorResponse) => {
        return throwError(this.adaptHttpError(error))
      })
    );
  }

  getUserById(id: number) {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    headers = headers.set('Authorization', `Bearer ${this.authService.getLogged().token}`)
    return this.http.get(getLoadUserById(id), { headers: headers }).pipe(
      map((response: any) => response),
      catchError((error: HttpErrorResponse) => {
        return throwError(this.adaptHttpError(error))
      })
    );
  }

  save(user: User) {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    headers = headers.set('Authorization', `Bearer ${this.authService.getLogged().token}`)
    return this.http.post(getSaveUserUrl(), user, { headers: headers }).pipe(
      map((response: any) => response),
      catchError((error: HttpErrorResponse) => {
        return throwError(this.adaptHttpError(error))
      })
    );
  }

  edit(user: User) {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    headers = headers.set('Authorization', `Bearer ${this.authService.getLogged().token}`)
    return this.http.put(getSaveUserUrl(), user, { headers: headers }).pipe(
      map((response: any) => response),
      catchError((error: HttpErrorResponse) => {
        return throwError(this.adaptHttpError(error))
      })
    );
  }

  adaptHttpError(err: HttpErrorResponse): string {
    if (err.status === 403) {
      return "Forbiden";
    } else if (err.status === 400) {
      return err.error;
    }
    return "";
  }
}

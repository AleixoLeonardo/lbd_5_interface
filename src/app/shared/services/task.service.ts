import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { Task } from '../models/Task.model';
import { getLoadTaskByJObUserIdUrl, getLoadTaskUrl, getSaveTaskUrl } from '../url/url';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(
    private authService: AuthService,
    private http: HttpClient
  ) { }

  getTasks() {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    headers = headers.set('Authorization', `Bearer ${this.authService.getLogged().token}`)
    return this.http.get(getLoadTaskUrl(), { headers: headers }).pipe(
      map((response: any) => response),
      catchError((error: HttpErrorResponse) => {
        return throwError(this.adaptHttpError(error))
      })
    );
  }

  getTasksByUserId(id: number) {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    headers = headers.set('Authorization', `Bearer ${this.authService.getLogged().token}`)
    return this.http.get(getLoadTaskByJObUserIdUrl(id), { headers: headers }).pipe(
      map((response: any) => response),
      catchError((error: HttpErrorResponse) => {
        return throwError(this.adaptHttpError(error))
      })
    );
  }

  save(task: Task) {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    headers = headers.set('Authorization', `Bearer ${this.authService.getLogged().token}`)
    return this.http.post(getSaveTaskUrl(), task, { headers: headers }).pipe(
      map((response: any) => response),
      catchError((error: HttpErrorResponse) => {
        return throwError(this.adaptHttpError(error))
      })
    );
  }

  edit(task: Task) {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    headers = headers.set('Authorization', `Bearer ${this.authService.getLogged().token}`)
    return this.http.put(getSaveTaskUrl(), task, { headers: headers }).pipe(
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

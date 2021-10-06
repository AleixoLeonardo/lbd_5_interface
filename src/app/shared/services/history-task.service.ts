import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { HistoryTask } from '../models/history-task.module';
import { getLoadHistoryTasksByFilterUrl, getLoadHistoryTasksUrl, getSaveHistoryTasksUrl } from '../url/url';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class HistoryTaskService {

  constructor(
    private authService: AuthService,
    private http: HttpClient
  ) { }

  getHistoryTasks() {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    headers = headers.set('Authorization', `Bearer ${this.authService.getLogged().token}`)
    return this.http.get(getLoadHistoryTasksUrl(), { headers: headers }).pipe(
      map((response: any) => response),
      catchError((error: HttpErrorResponse) => {
        return throwError(this.adaptHttpError(error))
      })
    );
  }

  getHistoryTasksByFilter(taskId: number, start: number, end: number) {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    headers = headers.set('Authorization', `Bearer ${this.authService.getLogged().token}`)
    return this.http.get(getLoadHistoryTasksByFilterUrl(taskId, start, end), { headers: headers }).pipe(
      map((response: any) => response),
      catchError((error: HttpErrorResponse) => {
        return throwError(this.adaptHttpError(error))
      })
    );
  }

  save(historyTask: HistoryTask) {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    headers = headers.set('Authorization', `Bearer ${this.authService.getLogged().token}`)
    return this.http.post(getSaveHistoryTasksUrl(), historyTask, { headers: headers }).pipe(
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

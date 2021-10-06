import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { Job } from '../models/job.model';
import { getLoadJobsUrl, getSaveJobUrl } from '../url/url';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class JobService {

  constructor(
    private authService: AuthService,
    private http: HttpClient
  ) { }

  getJobs() {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    headers = headers.set('Authorization', `Bearer ${this.authService.getLogged().token}`)
    return this.http.get(getLoadJobsUrl(), { headers: headers }).pipe(
      map((response: any) => response),
      catchError((error: HttpErrorResponse) => {
        return throwError(this.adaptHttpError(error))
      })
    );
  }

  save(job: Job) {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    headers = headers.set('Authorization', `Bearer ${this.authService.getLogged().token}`)
    return this.http.post(getSaveJobUrl(), job, { headers: headers }).pipe(
      map((response: any) => response),
      catchError((error: HttpErrorResponse) => {
        return throwError(this.adaptHttpError(error))
      })
    );
  }

  edit(job: Job) {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    headers = headers.set('Authorization', `Bearer ${this.authService.getLogged().token}`)
    return this.http.put(getSaveJobUrl(), job, { headers: headers }).pipe(
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

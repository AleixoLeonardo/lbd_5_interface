import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { UtilService } from 'src/app/shared/services/util.service';

import { Auth } from '../enum/auth.enum';
import { Login } from '../models/login.model';
import { getLoginUrl } from '../url/url';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    readonly utilService: UtilService,
    readonly http: HttpClient

  ) { }


  isAuthenticated(): boolean {
    return this.utilService.getLocalStorage(Auth.AUTH_DATA) !== null;
  }

  auth(login: Login) {
    return this.http.post(getLoginUrl(), login).pipe(
      map((response: any) => response),
      catchError((error: HttpErrorResponse) => {
        return throwError(this.adaptHttpError(error))
      })
    );
  }

  adaptHttpError(err: HttpErrorResponse): string {
    if (err.status === 403) {
      return "Incorrect credentials";
    }
    return "";
  }

  getLogged(): Login {
    return this.utilService.getLocalStorage(Auth.AUTH_DATA);
  }

  logout() {
    this.utilService.removeAuth();
  }
}

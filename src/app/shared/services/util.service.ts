import { Injectable } from '@angular/core';

import { Auth } from '../enum/auth.enum';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  constructor() { }

  setLocalStorage(obj, auth: Auth) {
    localStorage.setItem(auth.toString(), this.toJson(obj));
  }

  getLocalStorage(auth: Auth) {
    return this.toObj(localStorage.getItem(auth.toString()))
  }

  removeAuth() {
    localStorage.removeItem(Auth.AUTH_DATA);
  }


  toJson(obj) {
    return JSON.stringify(obj);
  }

  toObj(json) {
    return JSON.parse(json);
  }

  adaptDate(date) {
    return `${date} 00:00:00`;
  }

  adaptFromDate(date: Date) {
    return `${date.getFullYear()}-${this.pad(date.getMonth() + 1)}-${this.pad(date.getDate())} 00:00:00`
  }

  toDateFormat(date) {
    let d = new Date(date);
    return `${d.getFullYear()}-${this.pad(d.getMonth() + 1)}-${this.pad(d.getDate())}`;
  }

  toDate(date): Date {
    return new Date(date);
  }

  pad(n) {
    if (n < 10) {
      n = `0${n}`;
    }
    return n;
  }


}

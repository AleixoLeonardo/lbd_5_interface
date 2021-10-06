import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Login } from 'src/app/shared/models/login.model';

import { auth } from '../actions/login-action.service';
import { AuthState } from '../reducers/auth.reducer';
import { getLogin } from '../selectors/auth.selectors';


@Injectable({
    providedIn: 'root'
})
export class AuthFacadeService {
    constructor(
        readonly store: Store<AuthState>
    ) { }


    signIn(login: Login): void {
        this.store.dispatch(auth({ login }));
    }

    getUserLogged(): Observable<Login> {
        return this.store.select(getLogin);
    }
}
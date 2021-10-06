import { Action, createReducer, on } from '@ngrx/store';
import { Failure } from 'src/app/shared/models/failure.module';
import { Login } from 'src/app/shared/models/login.model';

import * as AuthActions from '../actions/login-action.service';

export interface AuthState {
    loading: boolean;
    failure: Failure;
    login: Login;
}

export const initialState: AuthState = {
    failure: null,
    loading: null,
    login: null
}
export const authReducer = createReducer(
    initialState,
    on(AuthActions.auth, (_, action) => ({
        failure: null,
        loading: true,
        login: action.login
    })),
    on(AuthActions.authSuccess, (state, action) => ({
        ...state,
        loading: false
    })),
    on(AuthActions.authFailure, (state, action) => ({
        ...state,
        login: null,
        failure: action.failure,
        loading: false
    })),
    on(AuthActions.getLogin, (state, action) => ({
        ...state,
        login: state.login,
        failure: null,
        loading: false
    }))
);

export function reducer(state: AuthState | undefined, action: Action): any {
    return authReducer(state, action);
}


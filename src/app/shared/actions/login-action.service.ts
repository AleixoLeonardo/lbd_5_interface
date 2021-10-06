import { createAction, props } from '@ngrx/store';
import { Failure } from 'src/app/shared/models/failure.module';
import { Login } from 'src/app/shared/models/login.model';

export const auth = createAction(
    '[Auth] Auth login',
    props<{ login: Login }>()
);

export const authSuccess = createAction(
    '[Auth] Auth login success'
)

export const authFailure = createAction(
    '[Auth] Auth login failure',
    props<{ failure: Failure }>()
)

export const getLogin = createAction(
    '[Auth] Auth get login'
)
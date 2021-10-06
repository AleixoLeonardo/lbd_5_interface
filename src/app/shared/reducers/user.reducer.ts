import { Action, createReducer, on } from '@ngrx/store';
import { Failure } from 'src/app/shared/models/failure.module';
import { User } from 'src/app/shared/models/user.model';

import * as UserActions from '../actions/user-action.service';


export interface UserStates {
    loading: boolean;
    failure: Failure;
    users: User[];
}

export interface UserState {
    loading: boolean;
    failure: Failure;
    user: User;
}

export const initialState: UserStates = {
    failure: null,
    loading: null,
    users: null
}

export const authReducer = createReducer(
    initialState,
    on(UserActions.loadUsers, (_, action) => ({
        failure: null,
        loading: true
    })),
    on(UserActions.loadUsersSuccess, (state, action) => ({
        ...state,
        loading: false,
        users: action.users
    })),
    on(UserActions.loadUsersFailure, (state, action) => ({
        ...state,
        login: null,
        failure: action.failure,
        loading: false
    })),
    on(UserActions.saveUser, (_, action) => ({
        failure: null,
        loading: true
    })),
    on(UserActions.saveUserSuccess, (state, action) => ({
        ...state,
        loading: false
    })),
    on(UserActions.saveUserFailure, (state, action) => ({
        ...state,
        login: null,
        failure: action.failure,
        loading: false
    })),
    on(UserActions.editUserSuccess, (state, action) => ({
        ...state,
        loading: false
    })),
    on(UserActions.editUserFailure, (state, action) => ({
        ...state,
        login: null,
        failure: action.failure,
        loading: false
    })),
    on(UserActions.loadUserById, (_, action) => ({
        failure: null,
        loading: true
    })),
    on(UserActions.loadUserByIdSuccess, (state, action) => ({
        ...state,
        loading: false,
        user: action.user
    })),
    on(UserActions.loadUserByIdFailure, (state, action) => ({
        ...state,
        login: null,
        failure: action.failure,
        loading: false
    }))
);

export function reducer(state: UserState | UserStates | undefined, action: Action): any {
    return authReducer(state, action);
}


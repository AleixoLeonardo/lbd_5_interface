import { createAction, props } from '@ngrx/store';
import { Failure } from 'src/app/shared/models/failure.module';
import { User } from 'src/app/shared/models/user.model';


export const loadUsers = createAction(
    '[User] Load Users'
)

export const loadUsersSuccess = createAction(
    '[User] Load Users success',
    props<{ users: User[] }>()
)

export const loadUsersFailure = createAction(
    '[User] Load Users failure',
    props<{ failure: Failure }>()
)

export const saveUser = createAction(
    '[User] Save User',
    props<{ user: User }>()
)

export const saveUserSuccess = createAction(
    '[User] Save User success'
)

export const saveUserFailure = createAction(
    '[User] Save User failure',
    props<{ failure: Failure }>()
)

export const editUser = createAction(
    '[User] Edit User',
    props<{ user: User }>()
)

export const editUserSuccess = createAction(
    '[User] Edit User success'
)

export const editUserFailure = createAction(
    '[User] Edit User failure',
    props<{ failure: Failure }>()
)

export const loadUserById = createAction(
    '[User] Load User by id',
    props<{ id: number }>()
)

export const loadUserByIdSuccess = createAction(
    '[User] Load User by id success',
    props<{ user: User }>()
)

export const loadUserByIdFailure = createAction(
    '[User] Load User by id failure',
    props<{ failure: Failure }>()
)
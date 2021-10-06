import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { Failure } from 'src/app/shared/models/failure.module';
import { ToastService } from 'src/app/shared/services/toast.service';
import { UserService } from 'src/app/shared/services/user.service';
import { UtilService } from 'src/app/shared/services/util.service';

import {
    editUser,
    editUserFailure,
    editUserSuccess,
    loadUserById,
    loadUserByIdFailure,
    loadUserByIdSuccess,
    loadUsers,
    loadUsersFailure,
    loadUsersSuccess,
    saveUser,
    saveUserFailure,
    saveUserSuccess,
} from '../actions/user-action.service';


@Injectable()
export class UserEffects {

    loadUsers$ = createEffect(() => this.actions$.pipe(
        ofType(loadUsers, saveUserSuccess, editUserSuccess),
        switchMap((action) => {
            return this.service.getUsers().pipe(
                map(response => {
                    return loadUsersSuccess({ users: response });
                }),
                catchError((error) => {
                    const failure: Failure = {
                        message: error
                    };
                    this.toastService.showError(error);
                    return of(loadUsersFailure({ failure }));
                })
            )
        })
    ));

    loadUserById$ = createEffect(() => this.actions$.pipe(
        ofType(loadUserById),
        switchMap((action) => {
            const { id } = action;
            return this.service.getUserById(id).pipe(
                map(response => {
                    return loadUserByIdSuccess({ user: response });
                }),
                catchError((error) => {
                    const failure: Failure = {
                        message: error
                    };
                    this.toastService.showError(error);
                    return of(loadUserByIdFailure({ failure }));
                })
            )
        })
    ));


    saveUser$ = createEffect(() => this.actions$.pipe(
        ofType(saveUser),
        switchMap((action) => {
            const { user } = action;
            user.birthDate = this.utilService.adaptDate(user.birthDate);
            return this.service.save(user).pipe(
                map(response => {
                    this.toastService.showSuccess()
                    return saveUserSuccess();
                }),
                catchError((error) => {
                    const failure: Failure = {
                        message: error
                    };
                    this.toastService.showError(error);
                    return of(saveUserFailure({ failure }));
                })
            )
        })
    ));

    editUser$ = createEffect(() => this.actions$.pipe(
        ofType(editUser),
        switchMap((action) => {
            const { user } = action;
            user.birthDate = this.utilService.adaptDate(user.birthDate);
            return this.service.edit(user).pipe(
                map(response => {
                    this.toastService.showSuccess()
                    return editUserSuccess();
                }),
                catchError((error) => {
                    const failure: Failure = {
                        message: error
                    };
                    this.toastService.showError(error);
                    return of(editUserFailure({ failure }));
                })
            )
        })
    ));


    constructor(
        private readonly actions$: Actions,
        private readonly service: UserService,
        private readonly utilService: UtilService,
        private readonly toastService: ToastService
    ) { }
}
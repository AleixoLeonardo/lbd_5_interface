import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, exhaustMap, map } from 'rxjs/operators';
import { Auth } from 'src/app/shared/enum/auth.enum';
import { Failure } from 'src/app/shared/models/failure.module';
import { AuthService } from 'src/app/shared/services/auth.service';
import { ToastService } from 'src/app/shared/services/toast.service';
import { UtilService } from 'src/app/shared/services/util.service';

import { auth, authFailure, authSuccess } from '../actions/login-action.service';

@Injectable()
export class AuthEffects {

    auth$ = createEffect(() => this.actions$.pipe(
        ofType(auth),
        exhaustMap((action) => {
            const { login } = action;
            return this.service.auth(login).pipe(
                map(response => {
                    this.utilService.setLocalStorage(response, Auth.AUTH_DATA);
                    this.router.navigate(["/home"]);
                    return authSuccess();
                }),
                catchError((error) => {
                    const failure: Failure = {
                        message: error
                    };
                    this.toastService.showError(error);
                    return of(authFailure({ failure }));
                })
            )
        })
    ));

    constructor(
        private readonly actions$: Actions,
        private readonly service: AuthService,
        private readonly utilService: UtilService,
        private readonly toastService: ToastService,
        private readonly router: Router
    ) { }
}
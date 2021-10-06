import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { Failure } from 'src/app/shared/models/failure.module';
import { ToastService } from 'src/app/shared/services/toast.service';
import { UtilService } from 'src/app/shared/services/util.service';

import {
    editJob,
    editJobFailure,
    editJobSuccess,
    loadJobs,
    loadJobsFailure,
    loadJobsSuccess,
    saveJob,
    saveJobFailure,
    saveJobSuccess,
} from '../actions/job-action.service';
import { JobService } from '../services/job.service';

@Injectable()
export class JobEffects {

    loadJobs$ = createEffect(() => this.actions$.pipe(
        ofType(loadJobs, saveJobSuccess, editJobSuccess),
        switchMap((action) => {
            return this.service.getJobs().pipe(
                map(response => {
                    return loadJobsSuccess({ jobs: response });
                }),
                catchError((error) => {
                    const failure: Failure = {
                        message: error
                    };
                    this.toastService.showError(error);
                    return of(loadJobsFailure({ failure }));
                })
            )
        })
    ));

    saveJob$ = createEffect(() => this.actions$.pipe(
        ofType(saveJob),
        switchMap((action) => {
            const { job } = action;
            return this.service.save(job).pipe(
                map(response => {
                    this.toastService.showSuccess()
                    return saveJobSuccess();
                }),
                catchError((error) => {
                    const failure: Failure = {
                        message: error
                    };
                    this.toastService.showError(error);
                    return of(saveJobFailure({ failure }));
                })
            )
        })
    ));

    editJob$ = createEffect(() => this.actions$.pipe(
        ofType(editJob),
        switchMap((action) => {
            const { job } = action;
            return this.service.edit(job).pipe(
                map(response => {
                    this.toastService.showSuccess()
                    return editJobSuccess();
                }),
                catchError((error) => {
                    const failure: Failure = {
                        message: error
                    };
                    this.toastService.showError(error);
                    return of(editJobFailure({ failure }));
                })
            )
        })
    ));

    constructor(
        private readonly actions$: Actions,
        private readonly service: JobService,
        private readonly utilService: UtilService,
        private readonly toastService: ToastService
    ) { }
}
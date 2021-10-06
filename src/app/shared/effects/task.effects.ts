import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import { loadJobsFailure } from '../actions/job-action.service';
import {
    editTask,
    editTaskFailure,
    editTaskSuccess,
    loadTasks,
    loadTasksByJobUserId,
    loadTasksByJobUserIdFailure,
    loadTasksByJobUserIdSuccess,
    loadTasksSuccess,
    saveTask,
    saveTaskFailure,
    saveTaskSuccess,
} from '../actions/task-action.service';
import { Failure } from '../models/failure.module';
import { TaskService } from '../services/task.service';
import { ToastService } from '../services/toast.service';
import { UtilService } from '../services/util.service';

@Injectable()
export class TaskEffects {

    loadTasks$ = createEffect(() => this.actions$.pipe(
        ofType(loadTasks, saveTaskSuccess, editTaskSuccess),
        switchMap((action) => {
            return this.service.getTasks().pipe(
                map(response => {
                    return loadTasksSuccess({ tasks: response });
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

    loadTasksByJobUserId$ = createEffect(() => this.actions$.pipe(
        ofType(loadTasksByJobUserId),
        switchMap((action) => {
            const { id } = action;
            return this.service.getTasksByUserId(id).pipe(
                map(response => {
                    return loadTasksByJobUserIdSuccess({ tasks: response });
                }),
                catchError((error) => {
                    const failure: Failure = {
                        message: error
                    };
                    this.toastService.showError(error);
                    return of(loadTasksByJobUserIdFailure({ failure }));
                })
            )
        })
    ));

    saveTask$ = createEffect(() => this.actions$.pipe(
        ofType(saveTask),
        switchMap((action) => {
            const { task } = action;
            return this.service.save(task).pipe(
                map(response => {
                    this.toastService.showSuccess()
                    return saveTaskSuccess();
                }),
                catchError((error) => {
                    const failure: Failure = {
                        message: error
                    };
                    this.toastService.showError(error);
                    return of(saveTaskFailure({ failure }));
                })
            )
        })
    ));

    editTask$ = createEffect(() => this.actions$.pipe(
        ofType(editTask),
        switchMap((action) => {
            const { task } = action;
            return this.service.edit(task).pipe(
                map(response => {
                    this.toastService.showSuccess()
                    return editTaskSuccess();
                }),
                catchError((error) => {
                    const failure: Failure = {
                        message: error
                    };
                    this.toastService.showError(error);
                    return of(editTaskFailure({ failure }));
                })
            )
        })
    ));

    constructor(
        private readonly actions$: Actions,
        private readonly service: TaskService,
        private readonly utilService: UtilService,
        private readonly toastService: ToastService
    ) { }
}
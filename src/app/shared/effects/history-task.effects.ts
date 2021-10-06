import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import {
    loadHistoryTasks,
    loadHistoryTasksByFilter,
    loadHistoryTasksFailure,
    loadHistoryTasksSuccess,
    saveHistoryTask,
    saveHistoryTaskFailure,
    saveHistoryTaskSuccess,
} from '../actions/history-task-action.service';
import { Failure } from '../models/failure.module';
import { HistoryTaskService } from '../services/history-task.service';
import { ToastService } from '../services/toast.service';

@Injectable()
export class HistoryTaskEffects {

    loadHistoryTasks$ = createEffect(() => this.actions$.pipe(
        ofType(loadHistoryTasks),
        switchMap((action) => {
            return this.service.getHistoryTasks().pipe(
                map(response => {
                    return loadHistoryTasksSuccess({ historyTasks: response });
                }),
                catchError((error) => {
                    const failure: Failure = {
                        message: error
                    };
                    this.toastService.showError(error);
                    return of(loadHistoryTasksFailure({ failure }));
                })
            )
        })
    ));

    loadHistoryTasksByFilter$ = createEffect(() => this.actions$.pipe(
        ofType(loadHistoryTasksByFilter),
        switchMap((action) => {
            const { taskId, start, end } = action;
            return this.service.getHistoryTasksByFilter(taskId, start, end).pipe(
                map(response => {
                    return loadHistoryTasksSuccess({ historyTasks: response });
                }),
                catchError((error) => {
                    const failure: Failure = {
                        message: error
                    };
                    this.toastService.showError(error);
                    return of(loadHistoryTasksFailure({ failure }));
                })
            )
        })
    ));

    saveHistoryTask$ = createEffect(() => this.actions$.pipe(
        ofType(saveHistoryTask),
        switchMap((action) => {
            const { historyTask } = action;
            return this.service.save(historyTask).pipe(
                map(response => {
                    this.toastService.showSuccess()
                    return saveHistoryTaskSuccess();
                }),
                catchError((error) => {
                    const failure: Failure = {
                        message: error
                    };
                    this.toastService.showError(error);
                    return of(saveHistoryTaskFailure({ failure }));
                })
            )
        })
    ));

    constructor(
        private readonly actions$: Actions,
        private readonly service: HistoryTaskService,
        private readonly toastService: ToastService
    ) { }
}
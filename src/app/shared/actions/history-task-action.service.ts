import { createAction, props } from '@ngrx/store';

import { Failure } from '../models/failure.module';
import { HistoryTask } from '../models/history-task.module';

export const loadHistoryTasks = createAction(
    '[HistoryTask] Load HistoryTasks'
)

export const loadHistoryTasksSuccess = createAction(
    '[HistoryTask] Load HistoryTasks success',
    props<{ historyTasks: HistoryTask[] }>()
)

export const loadHistoryTasksFailure = createAction(
    '[HistoryTask] Load HistoryTasks failure',
    props<{ failure: Failure }>()
)

export const saveHistoryTask = createAction(
    '[HistoryTask] Save HistoryTask',
    props<{ historyTask: HistoryTask }>()
)

export const saveHistoryTaskSuccess = createAction(
    '[HistoryTask] Save HistoryTask success'
)

export const saveHistoryTaskFailure = createAction(
    '[HistoryTask] Save HistoryTask failure',
    props<{ failure: Failure }>()
)

export const loadHistoryTasksByFilter = createAction(
    '[HistoryTask] Load HistoryTasks by filter',
    props<{ taskId: number, start: number, end: number }>()
)

export const loadHistoryTasksByFilterSuccess = createAction(
    '[HistoryTask] Load HistoryTasks by filter success',
    props<{ historyTasks: HistoryTask[] }>()
)

export const loadHistoryTasksByFilterFailure = createAction(
    '[HistoryTask] Load HistoryTasks by filter failure',
    props<{ failure: Failure }>()
)
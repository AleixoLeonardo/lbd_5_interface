import { createAction, props } from '@ngrx/store';

import { Failure } from '../models/failure.module';
import { Task } from '../models/Task.model';

export const loadTasks = createAction(
    '[Task] Load Tasks'
)

export const loadTasksSuccess = createAction(
    '[Task] Load Tasks success',
    props<{ tasks: Task[] }>()
)

export const loadTasksFailure = createAction(
    '[Task] Load Tasks failure',
    props<{ failure: Failure }>()
)


export const saveTask = createAction(
    '[Task] Save Task',
    props<{ task: Task }>()
)

export const saveTaskSuccess = createAction(
    '[Task] Save Task success'
)

export const saveTaskFailure = createAction(
    '[Task] Save Task failure',
    props<{ failure: Failure }>()
)

export const editTask = createAction(
    '[Task] Edit Task',
    props<{ task: Task }>()
)

export const editTaskSuccess = createAction(
    '[Task] Edit Task success'
)

export const editTaskFailure = createAction(
    '[Task] Edit Task failure',
    props<{ failure: Failure }>()
)

export const loadTasksByJobUserId = createAction(
    '[Task] Load Tasks by job user id',
    props<{ id: number }>()
)

export const loadTasksByJobUserIdSuccess = createAction(
    '[Task] Load Tasks by job user id success',
    props<{ tasks: Task[] }>()
)

export const loadTasksByJobUserIdFailure = createAction(
    '[Task] Load Tasks by job user id failure',
    props<{ failure: Failure }>()
)

import { Action, createReducer, on } from '@ngrx/store';

import * as TaskActions from '../actions/task-action.service';
import { Failure } from '../models/failure.module';
import { Task } from '../models/Task.model';

export interface TaskState {
    loading: boolean;
    failure: Failure;
    tasks: Task[];
}

export const initialState: TaskState = {
    failure: null,
    loading: null,
    tasks: null
}
export const authReducer = createReducer(
    initialState,
    on(TaskActions.loadTasks, (_, action) => ({
        failure: null,
        loading: true
    })),
    on(TaskActions.loadTasksSuccess, (state, action) => ({
        ...state,
        loading: false,
        tasks: action.tasks
    })),
    on(TaskActions.loadTasksFailure, (state, action) => ({
        ...state,
        login: null,
        failure: action.failure,
        loading: false
    })),
    on(TaskActions.saveTask, (_, action) => ({
        failure: null,
        loading: true
    })),
    on(TaskActions.saveTaskSuccess, (state, action) => ({
        ...state,
        loading: false
    })),
    on(TaskActions.editTaskFailure, (state, action) => ({
        ...state,
        login: null,
        failure: action.failure,
        loading: false
    })),
    on(TaskActions.editTask, (_, action) => ({
        failure: null,
        loading: true
    })),
    on(TaskActions.editTaskSuccess, (state, action) => ({
        ...state,
        loading: false
    })),
    on(TaskActions.editTaskFailure, (state, action) => ({
        ...state,
        login: null,
        failure: action.failure,
        loading: false
    })),
    on(TaskActions.loadTasksByJobUserId, (_, action) => ({
        failure: null,
        loading: true
    })),
    on(TaskActions.loadTasksByJobUserIdSuccess, (state, action) => ({
        ...state,
        loading: false,
        tasks: action.tasks
    })),
    on(TaskActions.loadTasksByJobUserIdFailure, (state, action) => ({
        ...state,
        login: null,
        failure: action.failure,
        loading: false
    })),
);

export function reducer(state: TaskState | undefined, action: Action): any {
    return authReducer(state, action);
}
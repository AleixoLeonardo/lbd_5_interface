import { Action, createReducer, on } from '@ngrx/store';

import * as HistoryTaskActions from '../actions/history-task-action.service';
import { Failure } from '../models/failure.module';
import { HistoryTask } from '../models/history-task.module';

export interface HistoryTaskState {
    loading: boolean;
    failure: Failure;
    historyTasks: HistoryTask[];
}

export const initialState: HistoryTaskState = {
    failure: null,
    loading: null,
    historyTasks: null
}
export const authReducer = createReducer(
    initialState,
    on(HistoryTaskActions.loadHistoryTasks, (_, action) => ({
        failure: null,
        loading: true
    })),
    on(HistoryTaskActions.loadHistoryTasksSuccess, (state, action) => ({
        ...state,
        loading: false,
        historyTasks: action.historyTasks
    })),
    on(HistoryTaskActions.loadHistoryTasksFailure, (state, action) => ({
        ...state,
        login: null,
        failure: action.failure,
        loading: false
    })),
    on(HistoryTaskActions.saveHistoryTask, (_, action) => ({
        failure: null,
        loading: true
    })),
    on(HistoryTaskActions.saveHistoryTaskSuccess, (state, action) => ({
        ...state,
        loading: false
    })),
    on(HistoryTaskActions.saveHistoryTaskFailure, (state, action) => ({
        ...state,
        loading: false,
        failure: action.failure
    })),
    on(HistoryTaskActions.loadHistoryTasksByFilter, (_, action) => ({
        failure: null,
        loading: true
    })),
    on(HistoryTaskActions.loadHistoryTasksByFilterSuccess, (state, action) => ({
        ...state,
        loading: false,
        historyTasks: action.historyTasks
    })),
    on(HistoryTaskActions.loadHistoryTasksByFilterFailure, (state, action) => ({
        ...state,
        login: null,
        failure: action.failure,
        loading: false
    }))
);

export function reducer(state: HistoryTaskState | undefined, action: Action): any {
    return authReducer(state, action);
}
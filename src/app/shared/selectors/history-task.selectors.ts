import { createFeatureSelector, createSelector } from '@ngrx/store';

import { HistoryTaskState } from '../reducers/history-task.reducer';

const getFeatureState = createFeatureSelector<HistoryTaskState>('historyTask');

export const getHistoryTasks = createSelector(
    getFeatureState,
    state => state?.historyTasks
);
import { createFeatureSelector, createSelector } from '@ngrx/store';

import { TaskState } from '../reducers/task.reducer';

const getFeatureState = createFeatureSelector<TaskState>('task');

export const getTasks = createSelector(
    getFeatureState,
    state => state?.tasks
);
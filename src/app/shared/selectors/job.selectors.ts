import { createFeatureSelector, createSelector } from '@ngrx/store';

import { JobState } from '../reducers/job.reducer';

const getFeatureState = createFeatureSelector<JobState>('job');

export const getJobs = createSelector(
    getFeatureState,
    state => state?.jobs
);
import { Action, createReducer, on } from '@ngrx/store';

import * as JobActions from '../actions/job-action.service';
import { Failure } from '../models/failure.module';
import { Job } from '../models/job.model';




export interface JobState {
    loading: boolean;
    failure: Failure;
    jobs: Job[];
}

export const initialState: JobState = {
    failure: null,
    loading: null,
    jobs: null
}
export const authReducer = createReducer(
    initialState,
    on(JobActions.loadJobs, (_, action) => ({
        failure: null,
        loading: true
    })),
    on(JobActions.loadJobsSuccess, (state, action) => ({
        ...state,
        loading: false,
        jobs: action.jobs
    })),
    on(JobActions.loadJobsFailure, (state, action) => ({
        ...state,
        login: null,
        failure: action.failure,
        loading: false
    })),
    on(JobActions.saveJob, (_, action) => ({
        failure: null,
        loading: true
    })),
    on(JobActions.saveJobSuccess, (state, action) => ({
        ...state,
        loading: false
    })),
    on(JobActions.editJobFailure, (state, action) => ({
        ...state,
        login: null,
        failure: action.failure,
        loading: false
    })),
    on(JobActions.editJob, (_, action) => ({
        failure: null,
        loading: true
    })),
    on(JobActions.editJobSuccess, (state, action) => ({
        ...state,
        loading: false
    })),
    on(JobActions.editJobFailure, (state, action) => ({
        ...state,
        login: null,
        failure: action.failure,
        loading: false
    }))
);

export function reducer(state: JobState | undefined, action: Action): any {
    return authReducer(state, action);
}
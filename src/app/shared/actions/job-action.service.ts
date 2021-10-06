import { createAction, props } from '@ngrx/store';

import { Failure } from '../models/failure.module';
import { Job } from '../models/job.model';

export const loadJobs = createAction(
    '[Job] Load Jobs'
)

export const loadJobsSuccess = createAction(
    '[Job] Load Jobs success',
    props<{ jobs: Job[] }>()
)

export const loadJobsFailure = createAction(
    '[Job] Load Jobs failure',
    props<{ failure: Failure }>()
)


export const saveJob = createAction(
    '[Job] Save Job',
    props<{ job: Job }>()
)

export const saveJobSuccess = createAction(
    '[Job] Save Job success'
)

export const saveJobFailure = createAction(
    '[Job] Save Job failure',
    props<{ failure: Failure }>()
)

export const editJob = createAction(
    '[Job] Edit Job',
    props<{ job: Job }>()
)

export const editJobSuccess = createAction(
    '[Job] Edit Job success'
)

export const editJobFailure = createAction(
    '[Job] Edit Job failure',
    props<{ failure: Failure }>()
)
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { editJob, loadJobs, saveJob } from '../actions/job-action.service';
import { Job } from '../models/job.model';
import { JobState } from '../reducers/job.reducer';
import { getJobs } from '../selectors/job.selectors';



@Injectable({
    providedIn: 'root'
})
export class JobFacadeService {
    constructor(
        readonly store: Store<JobState>
    ) { }


    loadJobs(): void {
        this.store.dispatch(loadJobs());
    }

    getJobs(): Observable<Job[]> {
        return this.store.select(getJobs);
    }

    saveJob(job: Job) {
        this.store.dispatch(saveJob({ job: job }));
    }

    editJob(job: Job) {
        this.store.dispatch(editJob({ job: job }))
    }
}
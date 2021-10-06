import { Job } from './job.model';

export interface Task {
    id: number;
    name: string;
    jobs: Job[];
}
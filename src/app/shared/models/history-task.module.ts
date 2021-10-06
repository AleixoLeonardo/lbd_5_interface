import { Job } from './job.model';
import { Task } from './Task.model';
import { User } from './user.model';

export interface HistoryTask {
    id: number;
    historyDate: string;
    taskId: Task;
    jobId: Job;
    message: string;
    userId: User;
}
import { Job } from './job.model';

export interface User {
    id: number;
    name: string;
    cpf: string;
    birthDate: string;
    role: string;
    password: string;
    jobId: Job;
}
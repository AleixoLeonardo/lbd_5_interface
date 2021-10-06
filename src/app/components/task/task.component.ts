import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { JobFacadeService } from 'src/app/shared/facades/job-facade.service';
import { TaskFacadeService } from 'src/app/shared/facades/task-facade.service';
import { Job } from 'src/app/shared/models/job.model';
import { Task } from 'src/app/shared/models/Task.model';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {

  tasks$: Observable<Task[]> = null;
  jobs$: Observable<Job[]> = null;

  jobsSelected: Job[] = [];

  task: Task = null;

  constructor(
    private readonly taskFacadeService: TaskFacadeService,
    private readonly jobFacadeService: JobFacadeService,
    private router: Router

  ) { }

  ngOnInit(): void {
    this.loadJobs();
    this.loadTasks();
  }

  loadTasks() {
    this.tasks$ = this.taskFacadeService.getTasks();
    this.taskFacadeService.loadTasks();
  }

  loadJobs() {
    this.jobs$ = this.jobFacadeService.getJobs();
    this.jobFacadeService.loadJobs();
  }

  new() {
    this.task = {
      id: null,
      name: null,
      jobs: null
    }
  }

  select(task: Task) {
    let j = {
      ...task
    };
    this.jobsSelected = [...j.jobs];
    this.task = j;
  }

  addRemoveJob(job: Job) {
    let index = this.jobsSelected.findIndex(jobSelected => jobSelected.id === job.id);
    if (index > -1) {
      this.jobsSelected.splice(index, 1);
    } else {
      this.jobsSelected.push(job);
    }


  }

  isInList(id) {
    return this.jobsSelected.filter(j => j.id === id)?.length > 0;
  }

  save() {
    this.task.jobs = this.jobsSelected;
    if (!this.task.id) {
      this.taskFacadeService.saveTask(this.task);
    } else {
      this.taskFacadeService.editTask(this.task);
    }
    this.back();
  }

  menu() {
    this.router.navigate(["/home"])
  }

  back() {
    this.task = null;
  }

}

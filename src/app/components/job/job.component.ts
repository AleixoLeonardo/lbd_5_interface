import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { JobFacadeService } from 'src/app/shared/facades/job-facade.service';
import { Job } from 'src/app/shared/models/job.model';

@Component({
  selector: 'app-job',
  templateUrl: './job.component.html',
  styleUrls: ['./job.component.scss']
})
export class JobComponent implements OnInit {

  jobs$: Observable<Job[]> = null;

  job: Job = null;

  constructor(
    private readonly jobFacadeService: JobFacadeService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadJobs();
  }

  loadJobs() {
    this.jobs$ = this.jobFacadeService.getJobs();
    this.jobFacadeService.loadJobs();
  }

  new() {
    this.job = {
      id: null,
      name: null,
      tasks: null,
      userList: null
    }
  }

  select(job: Job) {
    let j = {
      ...job
    };
    this.job = j;
  }

  save() {
    if (!this.job.id) {
      this.jobFacadeService.saveJob(this.job);
    } else {
      this.jobFacadeService.editJob(this.job);
    }
    this.back();
  }

  menu() {
    this.router.navigate(["/home"])
  }

  back() {
    this.job = null;
  }

}

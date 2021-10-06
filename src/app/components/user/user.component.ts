import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Role } from 'src/app/shared/enum/role.enum';
import { JobFacadeService } from 'src/app/shared/facades/job-facade.service';
import { Job } from 'src/app/shared/models/job.model';
import { User } from 'src/app/shared/models/user.model';
import { UtilService } from 'src/app/shared/services/util.service';

import { UserFacadeService } from '../../shared/facades/user-facade.service';



@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  users$: Observable<User[]> = null;
  jobs$: Observable<Job[]> = null;
  user: User;
  jobId: number;
  constructor(
    private readonly userFacadeService: UserFacadeService,
    private readonly jobFacadeService: JobFacadeService,
    private utilService: UtilService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    this.jobs$ = this.jobFacadeService.getJobs();
    this.users$ = this.userFacadeService.getUsers();
    this.userFacadeService.loadUsers();
    this.jobFacadeService.loadJobs();
  }

  new() {
    this.user = {
      birthDate: null,
      cpf: null,
      id: null,
      jobId: null,
      name: null,
      password: null,
      role: Role.COMMOM
    }
  }

  select(user: User) {
    let u = {
      ...user
    };
    u.birthDate = this.utilService.toDateFormat(user.birthDate);
    this.user = u;
    this.jobs$.subscribe(jobs => this.user.jobId = jobs.find(job => job.id == user.jobId.id));
  }

  save() {
    if (!this.user.id) {
      this.userFacadeService.saveUser(this.user);
    } else {
      this.userFacadeService.editUser(this.user);
    }
    this.back();
  }

  menu() {
    this.router.navigate(["/home"])
  }

  back() {
    this.user = null;
  }

}

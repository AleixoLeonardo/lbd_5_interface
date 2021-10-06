import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Role } from 'src/app/shared/enum/role.enum';
import { HistoryTaskFacadeService } from 'src/app/shared/facades/history-task-facade.service';
import { TaskFacadeService } from 'src/app/shared/facades/task-facade.service';
import { UserFacadeService } from 'src/app/shared/facades/user-facade.service';
import { HistoryTask } from 'src/app/shared/models/history-task.module';
import { Task } from 'src/app/shared/models/Task.model';
import { User } from 'src/app/shared/models/user.model';
import { AuthService } from 'src/app/shared/services/auth.service';
import { UtilService } from 'src/app/shared/services/util.service';

@Component({
  selector: 'app-history-task',
  templateUrl: './history-task.component.html',
  styleUrls: ['./history-task.component.scss']
})
export class HistoryTaskComponent implements OnInit {

  historyTasks$: Observable<HistoryTask[]> = null;
  tasks$: Observable<Task[]> = null;

  private task: Task = null;
  private historyTask: HistoryTask = null;
  private userLogged: User;

  private start: string;
  private end: string;

  constructor(
    private readonly historyTaskFacadeService: HistoryTaskFacadeService,
    private readonly taskFacadeService: TaskFacadeService,
    private readonly userFacadeService: UserFacadeService,
    private readonly authService: AuthService,
    private utilSevice: UtilService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getUser();
  }

  getHistoryTasks() {
    this.historyTasks$ = this.historyTaskFacadeService.getHistoryTasks();
  }

  loadHistoryTaskByFilter() {
    this.getHistoryTasks();
    this.historyTaskFacadeService.loadHistoryTasksByFilter(
      this.task.id,
      this.utilSevice.toDate(this.start).getTime(),
      this.utilSevice.toDate(this.end).getTime());
  }

  getTasks() {
    this.tasks$ = this.taskFacadeService.getTasks();
    if (this.userLogged.role == Role.ADMIN) {
      this.taskFacadeService.loadTasks();
    } else {
      this.taskFacadeService.loadTasksByUserId(this.userLogged.jobId.id);
    }
  }

  async getUser() {
    let login = this.authService.getLogged();
    this.userFacadeService.loadUserById(login.id);
    await this.userFacadeService.getUserById().subscribe(user => {
      this.userLogged = user;
      if (this.userLogged) {
        this.getTasks();
      }
    })
  }

  new(task: Task) {
    this.task = task;
    this.historyTask = {
      id: null,
      historyDate: this.utilSevice.adaptFromDate(new Date()),
      jobId: this.userLogged.jobId,
      userId: this.userLogged,
      message: null,
      taskId: task
    }
  }

  select(task: Task) {
    this.new(task);
  }

  save() {
    this.historyTaskFacadeService.saveHistoryTasks(this.historyTask);
    setTimeout(() => {
      this.loadHistoryTaskByFilter();
    }, 2000);
  }

  menu() {
    this.router.navigate(["/home"])
  }

  back() {
    this.historyTask = null;
  }

}

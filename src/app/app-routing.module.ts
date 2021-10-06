import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HistoryTaskComponent } from './components/history-task/history-task.component';
import { HomeComponent } from './components/home/home.component';
import { JobComponent } from './components/job/job.component';
import { LoginComponent } from './components/login/login.component';
import { TaskComponent } from './components/task/task.component';
import { UserComponent } from './components/user/user.component';


const routes: Routes = [
  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'home', component: HomeComponent
  },
  {
    path: 'user', component: UserComponent
  },
  {
    path: 'job', component: JobComponent
  },
  {
    path: 'task', component: TaskComponent
  },
  {
    path: 'history-task', component: HistoryTaskComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

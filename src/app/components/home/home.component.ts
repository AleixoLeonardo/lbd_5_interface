import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Login } from 'src/app/shared/models/login.model';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  userLogged: Login = null

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    this.getUserLogged();
  }

  ngOnInit(): void {

  }

  getUserLogged() {
    this.userLogged = this.authService.getLogged();
  }

  createUser() {
    this.router.navigate(["/user"])
  }

  createJob() {
    this.router.navigate(["/job"]);
  }

  createTask() {
    this.router.navigate(["/task"])
  }

  createHistory() {
    this.router.navigate(["/history-task"])
  }

  logout() {
    this.authService.logout();
    this.router.navigate(["/login"]);
  }
}

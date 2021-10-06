import { Component, OnInit } from '@angular/core';

import { AuthFacadeService } from '../../shared/facades/auth-facade.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  username: string;
  password: string;

  constructor(
    readonly authFacadeService: AuthFacadeService
  ) { }

  ngOnInit(): void {
  }

  login() {
    this.authFacadeService.signIn({
      username: this.username,
      password: this.password
    });
  }

}

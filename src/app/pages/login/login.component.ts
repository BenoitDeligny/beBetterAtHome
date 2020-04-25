import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public login = true;
  public signup = false;
  public forgotPassword = false;

  constructor() { }

  ngOnInit(): void {
  }

  switchForm() {
    this.login = !this.login;
    this.signup = !this.signup;
  }

  showrecoveryform() {
    this.login = false;
    this.signup = false;
    this.forgotPassword = true;
  }

  goBackForm() {
    this.login = true;
    this.forgotPassword = !this.forgotPassword;
  }
}

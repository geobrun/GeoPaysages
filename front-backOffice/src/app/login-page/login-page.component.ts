import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../services/lgoin.service';
import { User } from '../shared/user';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  loginForm: FormGroup;
  userForm: any;
  currentUser: User;

  constructor(
    private loginService: LoginService,
    private formBuilder: FormBuilder,
    private route: Router
  ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      login: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  public submit(loginForm) {
    console.log(loginForm);
    this.userForm = loginForm.value;
    this.userForm.id_application = 3;
    this.loginService.login(this.userForm)
      .subscribe(
        (currentUser) => {
          this.currentUser = currentUser.user;
          this.loginForm.reset();
          this.route.navigate(['gererLesSites']);
        },
        (err) => {
          console.log('err', err.error);
          if (err.error.type === 'login') {
            this.loginForm.controls['login'].setErrors({ requierd: false, login: true });
          } else if (err.error.type === 'password') {
            this.loginForm.controls['password'].setErrors({ requierd: false, password: true });
          }
        }
      );
  }

  get loginError() {
    if (this.loginForm.controls['login'].hasError('login')) {
      return 'login';
    }
    return 'required';
  }

  get passwordError() {
    if (this.loginForm.controls['password'].hasError('password')) {
      return 'password';
    }
    return 'required';
  }
}

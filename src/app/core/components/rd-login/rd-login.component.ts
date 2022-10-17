import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { RdAuthenticateService } from 'src/app/shared/services/authentication/rd-authenticate.service';
import { Router } from '@angular/router';
import { emailValidation, passwordValidation } from 'src/app/shared/core/regx-expression/RegxExpression';
import { RdLogin } from 'src/app/shared/core/models/login/rd-login';
import { Location } from '@angular/common';
import { first } from 'rxjs/operators';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { NotificationService } from 'src/app/shared/services/common/rd-notification/notification.service';
import { RdForgotPasswordComponent } from '../rd-forgot-password/rd-forgot-password.component';
@Component({
  selector: 'app-rd-login',
  templateUrl: './rd-login.component.html',
  styleUrls: ['./rd-login.component.scss']
})
export class RdLoginComponent implements OnInit, OnDestroy {
  focusEmail;
  focusPassword;
  currentUser: any;
  loginFormGroup: FormGroup;
  constructor(private _formBuilder: FormBuilder, private authenticationService: RdAuthenticateService,
    private router: Router, private location: Location,
    public matDialog: MatDialog,
    private notificationService: NotificationService) {
    // redirect to home if already logged in
    this.currentUser = this.authenticationService.getLocalStorageData();
    if (this.currentUser !== null) {
      this.router.navigate(['/home']);
    }
  }

  ngOnInit(): void {
    var body = document.getElementsByTagName('body')[0];
    body.classList.add('login-page');

    var navbar = document.getElementsByTagName('nav')[0];
    navbar.classList.add('navbar-transparent');

    this.loginFormGroup = this._formBuilder.group({
      email: ['', [Validators.required, emailValidation]],
      password: ['', [Validators.required, passwordValidation]],
    });
  }
  get loginForm() { return this.loginFormGroup.controls; }


  onSubmit() {
    // stop here if form is invalid
    if (this.loginFormGroup.invalid) {
      this.notificationService.error('Please fill in the required fields');
      this.validateAllFormFields(this.loginFormGroup);
      return;
    }
    this.authenticationService.login(new RdLogin(this.loginFormGroup.value))
      .pipe(first())
      .subscribe(res => {
        if (res.status) {
          this.matDialog.closeAll();
          this.notificationService.success(res.message);
          this.router.navigate(['/member/hunar_view']);
        } else {
          this.notificationService.error(res.message);
        }

      },
        error => {
          this.notificationService.error('Something went wrong.Please try again.');
        });
  }
  validateAllFormFields(formGroup: FormGroup) {         //{1}
    Object.keys(formGroup.controls).forEach(field => {  //{2}
      const control = formGroup.get(field);             //{3}
      if (control instanceof FormControl) {             //{4}
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {        //{5}
        this.validateAllFormFields(control);            //{6}
      }
    });
  }
  openForgotPassword() {
    this.matDialog.closeAll();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = false;
    dialogConfig.width = '513px';
    dialogConfig.height = '339px';
    dialogConfig.panelClass = 'login-popup'
    this.matDialog.open(RdForgotPasswordComponent, dialogConfig);
  }
  openSignup() {
    this.matDialog.closeAll();
    this.router.navigate(['/account/signup']);
  }

  ngOnDestroy() {
    var _location = this.location.path();
    _location = _location.split('/')[2];
    if (_location === 'signup') {
      var body = document.getElementsByTagName('body')[0];
      body.classList.remove('login-page');
    }
    // this.matDialog.closeAll();

  }

}

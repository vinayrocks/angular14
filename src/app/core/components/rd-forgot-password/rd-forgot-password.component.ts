import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { RdLoginComponent } from 'src/app/core/components/rd-login/rd-login.component';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { RdAuthenticateService } from 'src/app/shared/services/authentication/rd-authenticate.service';
import { Router } from '@angular/router';
import { emailValidation } from 'src/app/shared/core/regx-expression/RegxExpression';
import { NotificationService } from 'src/app/shared/services/common/rd-notification/notification.service';
import { first } from 'rxjs/operators';
import { RdForgotPassword } from 'src/app/shared/core/models/forgot-password/rd-forgot-password';
@Component({
  selector: 'app-rd-forgot-password',
  templateUrl: './rd-forgot-password.component.html',
  styleUrls: ['./rd-forgot-password.component.scss']
})
export class RdForgotPasswordComponent implements OnInit {

  focusEmail;
  resetPasswordUrl;

  forgetPasswordFormGroup: FormGroup; currentUser: any;
  constructor(private matDialog: MatDialog, private _formBuilder: FormBuilder,
    private rdAuthenticateService: RdAuthenticateService,
    private notificationService: NotificationService,
    private router: Router) {
  }


  ngOnInit() {
    var body = document.getElementsByTagName('body')[0];
    body.classList.add('login-page');

    var navbar = document.getElementsByTagName('nav')[0];
    navbar.classList.add('navbar-transparent');

    this.forgetPasswordFormGroup = this._formBuilder.group({
      Email: ['', [Validators.required, emailValidation]]
    });
  }
  get forgetPasswordForm() { return this.forgetPasswordFormGroup.controls; }
  onSubmit() {
    // stop here if form is invalid
    if (this.forgetPasswordFormGroup.invalid) {
      this.notificationService.error('Please fill in the required fields');
      this.validateAllFormFields(this.forgetPasswordFormGroup);
      return;
    }
    this.rdAuthenticateService.forgotPassword(new RdForgotPassword(this.forgetPasswordFormGroup.value))
      .pipe(first())
      .subscribe(
        res => {
          if (res.status) {
            this.resetPasswordUrl = res.url;
            this.matDialog.closeAll();
            this.router.navigate(['/home']);
            this.notificationService.success('The reset password link is sent to your registered email id.');
          } else {
            this.notificationService.error(res.message);
          }

        },
        error => {
          this.notificationService.error('Something went wrong.Pleased try again.');
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
  ngOnDestroy() {
    var body = document.getElementsByTagName('body')[0];
    body.classList.remove('login-page');
  }

}

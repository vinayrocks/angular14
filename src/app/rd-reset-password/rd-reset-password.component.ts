import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { RdLoginComponent } from 'src/app/core/components/rd-login/rd-login.component';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { emailValidation, passwordValidation } from 'src/app/shared/core/regx-expression/RegxExpression';
import { first } from 'rxjs/operators';
import { RdResetPassword } from 'src/app/shared/core/models/reset-password/rd-reset-password';
import { RdAuthenticateService } from 'src/app/shared/services/authentication/rd-authenticate.service';
import { NotificationService } from 'src/app/shared/services/common/rd-notification/notification.service';
import { RdEncryptDecryptService } from 'src/app/shared/services/encrypt-decrypt/rd-encrypt-decrypt.service';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-rd-reset-password',
  templateUrl: './rd-reset-password.component.html',
  styleUrls: ['./rd-reset-password.component.scss']
})
export class RdResetPasswordComponent implements OnInit {
  resetPasswordFormGroup: FormGroup;
  currentUser:any;
  routerData:String='';
  constructor(private matDialog: MatDialog, private _formBuilder: FormBuilder,
    private rdAuthenticateService: RdAuthenticateService,
    private notificationService:NotificationService,private spinner:NgxSpinnerService,
    private router: Router,private _encryptDecryptService: RdEncryptDecryptService,
    private route: ActivatedRoute) {
      const data = this.route.snapshot.queryParams.id.replace(' ','+');
      this.routerData=this._encryptDecryptService.get(data);
      if(this.routerData===''){
        this.notificationService.success('Something went wrong.Please try again.')
      }
    }


  ngOnInit() {
    this.resetPasswordFormGroup = this._formBuilder.group({
      Code: [this.routerData, [Validators.required]],
      Email: ['', [Validators.required, emailValidation]],
      Password: ['', [Validators.required,passwordValidation]],
      ConfirmPassword: ['', [Validators.required]],
    });

  }
  get resetPasswordForm() { return this.resetPasswordFormGroup.controls; }
  onSubmit() {
    this.spinner.show()
    // stop here if form is invalid
    if (this.resetPasswordFormGroup.invalid) {

      this.notificationService.error('Please fill in the required fields');
      this.validateAllFormFields(this.resetPasswordFormGroup);
      return;
    }
    this.rdAuthenticateService.resetPassword(new RdResetPassword(this.resetPasswordFormGroup.value))
      .pipe(first())
      .subscribe(
        res => {
          this.spinner.hide()
          if(res.status){
            this.notificationService.success(res.message);
            this.router.navigate(['/home']);
          } else {
            this.notificationService.error(res.message);
          }
        },
        error => {
          this.spinner.hide()
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
    // var body = document.getElementsByTagName('body')[0];
    // body.classList.remove('login-page');

  }
  openDialog() {
    const dialogConfig = new MatDialogConfig();

        dialogConfig.disableClose = false;
        dialogConfig.autoFocus = true;
        dialogConfig.width = '449px';
        dialogConfig.maxHeight='508px';
        dialogConfig.panelClass='login-popup'
        this.matDialog.open(RdLoginComponent, dialogConfig);
  }

}

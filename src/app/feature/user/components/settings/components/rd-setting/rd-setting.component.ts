import { Component, OnInit } from '@angular/core';
import * as Rellax from 'rellax';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { RdUserService } from 'src/app/shared/services/user/rd-user-service';
import { NotificationService } from 'src/app/shared/services/common/rd-notification/notification.service';
import { RdUserSetting } from 'src/app/shared/core/models/rd-common/rd-common';
import { Router } from '@angular/router';
import { RdAuthenticateService } from 'src/app/shared/services/authentication/rd-authenticate.service';
import { BehaviorSubject } from 'rxjs';
import { NgxSpinner } from 'ngx-spinner/lib/ngx-spinner.enum';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-rd-setting',
  templateUrl: './rd-setting.component.html',
  styleUrls: ['./rd-setting.component.scss']
})
export class RdSettingComponent implements OnInit {
  addSettingFormGroup: FormGroup;
  data: Date = new Date()
  currentUser:any;
  // private currentUserSubject: BehaviorSubject<any>;
  constructor(private _formBuilder: FormBuilder, private rdUserService: RdUserService,
    private notificationService: NotificationService, private router: Router,
    private rdAuthenticateService: RdAuthenticateService,private spinner:NgxSpinnerService) { 
      this.currentUser = this.rdAuthenticateService.getLocalStorageData();
      this.currentUser.isAddressShown=JSON.parse(this.currentUser.isAddressShown)==true?true:false;
      this.currentUser.isEmailShown=JSON.parse(this.currentUser.isEmailShown)==true?true:false;
      this.currentUser.isMailingAddressShown=JSON.parse(this.currentUser.isMailingAddressShown)==true?true:false;
      this.currentUser.isRadianMemberProfileShown=JSON.parse(this.currentUser.isRadianMemberProfileShown)==true?true:false;
      this.currentUser.isViewerProfileShown=JSON.parse(this.currentUser.isViewerProfileShown)==true?true:false;
    }
  ngOnInit() {
    var body = document.getElementsByTagName('body')[0];
    body.classList.add('profile-page');
    var navbar = document.getElementsByTagName('nav')[0];
    navbar.classList.add('navbar-transparent');
    this.addSettingFormGroup = this._formBuilder.group({
      IsViewerProfileShown: [this.currentUser.isViewerProfileShown, Validators.required],
      IsRadianMemberProfileShown: [this.currentUser.isRadianMemberProfileShown, Validators.required],
      IsMailingAddressShown: [this.currentUser.isMailingAddressShown, Validators.required],
      IsAddressShown: [this.currentUser.isAddressShown, Validators.required],
      IsEmailShown: [this.currentUser.isEmailShown, Validators.required]
    });
  }
  get addSettingForm() { return this.addSettingFormGroup.controls; }
  onSubmit() {
    this.spinner.show()
    // stop here if form is invalid
    if (this.addSettingFormGroup.invalid) {
      this.spinner.hide()
      this.notificationService.error('Please fill in the required fields');
      this.validateAllFormFields(this.addSettingFormGroup);
      return;
    }
    this.rdUserService.addUpdateSettings(new RdUserSetting(this.addSettingFormGroup.value))
      .subscribe(res => {
        this.spinner.hide()
        if (res.status) {
          this.currentUser.isAddressShown = this.addSettingFormGroup.controls.IsAddressShown.value===true?true:false;
          this.currentUser.isRadianMemberProfileShown = this.addSettingFormGroup.controls.IsRadianMemberProfileShown.value===true?true:false;
          this.currentUser.isMailingAddressShown = this.addSettingFormGroup.controls.IsMailingAddressShown.value===true?true:false;
          this.currentUser.isViewerProfileShown = this.addSettingFormGroup.controls.IsViewerProfileShown.value===true?true:false;
          this.currentUser.isEmailShown = this.addSettingFormGroup.controls.IsEmailShown.value===true?true:false;

          localStorage.removeItem('currentUser');
          localStorage.setItem('currentUser',JSON.stringify(this.currentUser));
          this.currentUser = this.rdAuthenticateService.getLocalStorageData();


          this.notificationService.success(res.message);
          this.router.navigate(['/member/setting_view']);
          
        } else {
          this.notificationService.error(res.message);
        }
      })
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
    body.classList.remove('profile-page');
    var navbar = document.getElementsByTagName('nav')[0];
    navbar.classList.remove('navbar-transparent');
  }

}

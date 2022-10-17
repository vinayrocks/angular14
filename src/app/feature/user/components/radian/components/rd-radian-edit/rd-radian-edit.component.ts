import { Component, OnInit } from '@angular/core';
import * as Rellax from 'rellax';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { RdUserService } from 'src/app/shared/services/user/rd-user-service';
import * as  skillsInterest from 'src/app/shared/core/json-data/skillsInterest.json';
import { first } from 'rxjs/operators';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { Router, ActivatedRoute } from '@angular/router';
import { RdEncryptDecryptService } from 'src/app/shared/services/encrypt-decrypt/rd-encrypt-decrypt.service';
import { NotificationService } from 'src/app/shared/services/common/rd-notification/notification.service';
import { RdRadian } from 'src/app/shared/core/models/rd-radian/rd-radian';
import { RdCommon } from 'src/app/shared/core/models/rd-common/rd-common';
import { RdAuthenticateService } from 'src/app/shared/services/authentication/rd-authenticate.service';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-rd-radian-edit',
  templateUrl: './rd-radian-edit.component.html',
  styleUrls: ['./rd-radian-edit.component.scss']
})
export class RdRadianEditComponent implements OnInit {
  editRadianFormGroup: FormGroup;
  skills: any;
  skillsSubcategory: any;
  url: any = '';
  tempArr: any = [];
  tempArrPortfolio: any = [];
  userPortfolio: any;
  imageChangedEvent: any = '';
  croppedImage: any = '';
  isUploaded: Boolean = false;
  routerData: any = [];
  userProfile: any = '';
  tempSubCategory: any = [];
  serverFile: any = [];
  projectFilePath: String = '';
  projectPath: String = '';
  currentUser: any;
  config: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: 'auto',
    minHeight: 'auto',
    placeholder: 'Enter text here...',
    translate: 'no',
    defaultParagraphSeparator: 'p',
    defaultFontName: 'Open Sans',
    showToolbar:true,
    toolbarHiddenButtons: [
      ['bold', 'italic'],
      ['fontSize', 'insertImage',
      'insertVideo',
      'insertHorizontalRule',]
    ]
  };
  constructor(private _formBuilder: FormBuilder, private rdUserService: RdUserService,
    private router: Router, private _encryptDecryptService: RdEncryptDecryptService,
    private route: ActivatedRoute, private notificationService: NotificationService,
    private spinner:NgxSpinnerService,
    private rdAuthenticateService: RdAuthenticateService) {
    this.skills =(skillsInterest as any).default;
    
    this.currentUser = this.rdAuthenticateService.getLocalStorageData();
    this.projectFilePath = this.currentUser.firstName + '_' + this.currentUser.username.split('@')[0] + '/Profile';
    this.routerData.Id = this.route.snapshot.paramMap.get('id');
    if (this.routerData.Id !== '') {
      this.routerData.Id = this._encryptDecryptService.get(this.routerData.Id);
      this.routerData.UserId = this.currentUser.id;
      this.getUserProfile(this.routerData);
      this.editRadianFormGroup = this._formBuilder.group({
        Id: [this.routerData.Id, Validators.required],
        ProfileName: [''],
        ProfilePicture: [''],
        CoverPicture: [''],
        ProfileDescription: ['', Validators.required],
        ProfileSkill: [''],
        ProfileExpertise: ['', Validators.required],
        LinkedPortfolio: ['', Validators.required]
      });
    } else {
      this.router.navigate(['/member/radian_view']);
    }
  }
  ngOnInit() {
    var body = document.getElementsByTagName('body')[0];
    body.classList.add('profile-page');
    var navbar = document.getElementsByTagName('nav')[0];
    navbar.classList.add('navbar-transparent');
  }
  get editRadianForm() { return this.editRadianFormGroup.controls; }
  setFormGroup() {
    this.editRadianForm.ProfileSkill.setValue(this.userProfile.ProfileSkill.id);
    this.editRadianForm.ProfileName.setValue(this.userProfile.ProfileName);
    this.editRadianForm.ProfilePicture.setValue(this.userProfile.ProfilePicture);
    this.editRadianForm.CoverPicture.setValue(this.userProfile.CoverPicture);
    this.editRadianForm.ProfileDescription.setValue(this.userProfile.ProfileDescription);
    const data = this.userProfile.ProfileSkill.id;
    this.userProfile.ProfileExpertise.forEach(element => {
      this.tempArr.push(element.id);
    });
   
    this.editRadianForm.ProfileExpertise.setValue(this.tempArr.join(','));
    this.skillsSubcategory = this.skills.filter(function (item) {
      return item.radianSkillCategoryId === data;
    })[0].radianSkillSubCategories;
    this.skillsSubcategory.forEach(element => {
      if (this.tempArr.indexOf(element.id) !== -1) {
        this.tempSubCategory.push({ 'Id': element.id, 'name': element.subCategoryName, 'isChecked': true });
      } else {
        this.tempSubCategory.push({ 'Id': element.id, 'name': element.subCategoryName, 'isChecked': false });
      }
    });
  }

  getUserProfile(data) {
    this.spinner.show()
    
    this.rdUserService.getUserProfile(new RdCommon(data))
      .pipe(first())
      .subscribe(
        res => {
          res.data.forEach(element => {
            element.ProfileExpertise = element.ProfileExpertise === ''?[]:JSON.parse(element.ProfileExpertise);
            element.ProfileSkill = element.ProfileSkill === ''?[]:JSON.parse(element.ProfileSkill);
            element.LinkedPortfolio = element.LinkedPortfolio === ''?[]:JSON.parse(element.LinkedPortfolio);
          });
          this.userProfile = res.data[0];
          this.projectPath = res.projectPath;
          this.setFormGroup();
          this.getUserPorfolio();
        },
        error => {
          this.spinner.hide()
        });
  }

  getSkillSubCategory(event: any) {
    this.tempSubCategory = [];
    if (this.editRadianForm.ProfileSkill.value !== '') {
      this.skillsSubcategory = this.skills.filter(function (item) {
        return item.radianSkillCategoryId === event;
      })[0].radianSkillSubCategories;
    }
    this.skillsSubcategory.forEach(element => {
      if (this.tempArr.indexOf(element.id) !== -1) {
        this.tempSubCategory.push({ 'Id': element.id, 'name': element.subCategoryName, 'isChecked': true });
      } else {
        this.tempSubCategory.push({ 'Id': element.id, 'name': element.subCategoryName, 'isChecked': false });
      }
    });
  }
  onSelectExperties(event, item: any) {
    if (event.target.checked) {
      this.tempArr.push(item.Id);
    } else {
      const index: number = this.tempArr.indexOf(item.Id);
      if (index !== -1) {
        this.tempArr.splice(index, 1);
      }
    }
    this.editRadianForm.ProfileExpertise.setValue(this.tempArr.join(','));
  }
  onSelectPortfolio(event, item: any){
    if (event.target.checked) {
      if( this.tempArrPortfolio.filter((x:any)=>x.Id===item.Id)===-1){
        const data = this.userPortfolio.filter((x:any)=>x.id===item.Id)[0];
        this.tempArrPortfolio.push({ 'Id': data.id, 'name': data.PortfolioName, 'isChecked': true });
      }
    } else {
      const data = this.tempArrPortfolio.filter((x:any)=>x.Id===item.Id)[0];
      const index: number = this.tempArrPortfolio.indexOf(data);
      if (index !== -1) {
        this.tempArrPortfolio.splice(index, 1);
      }
    }
    this.editRadianForm.LinkedPortfolio.setValue(this.tempArrPortfolio.map((x:any)=>x.Id).toString());
  }
  getUserPorfolio() {
    this.rdUserService.getUserPorfolios(new RdCommon(this.routerData))
      .pipe(first())
      .subscribe(
        res => {
          
          this.spinner.hide()
          this.userPortfolio = res.data;
          var dbData = [];
          dbData = this.userProfile.LinkedPortfolio;
          const ids = dbData.map((x:any)=>x.id);
          this.userPortfolio.forEach(element => {
            // this.tempArrPortfolio.push(element.id);
            if (ids.indexOf(element.id) !== -1) {
              this.tempArrPortfolio.push({ 'Id': element.id, 'name': element.PortfolioName, 'isChecked': true });
            } else {
              this.tempArrPortfolio.push({ 'Id': element.id, 'name': element.PortfolioName, 'isChecked': false });
            }
          });
          this.editRadianForm.LinkedPortfolio.setValue(this.tempArrPortfolio.map((x:any)=>x.Id).toString());
        },
        error => {
          this.spinner.hide()
        });
  }
  onSubmit() {
    this.spinner.show()
    // stop here if form is invalid
    if (this.editRadianFormGroup.invalid) {

      this.notificationService.error('Please fill in the required fields');
      this.validateAllFormFields(this.editRadianFormGroup);
      return;
    }
    if(this.serverFile.length!=0){
      this.rdUserService.UploadUserRadianProfileImage(this.croppedImage, this.serverFile, 
        this.editRadianForm.ProfileName.value)
      .pipe(first())
      .subscribe(
        res => {
          
          this.serverFile = [];
          this.editRadianForm.ProfilePicture.setValue(res.data.ProfilePicture);
          this.editRadianForm.CoverPicture.setValue(res.data.CoverPicture);
          this.submitDetail();
        },
        error => {
          this.spinner.hide()
          this.notificationService.error('Something went wrong.Please try again.');
        });
    } else {
      this.submitDetail();
    }
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

  submitDetail(){
    this.rdUserService.addUserProfile(new RdRadian(this.editRadianFormGroup.value))
    .subscribe(res => {
      this.spinner.hide()
      if (res.status) {
        this.notificationService.success(res.message);
        this.router.navigate(['/member/hunar_view']);
      } else {
        this.notificationService.error(res.message);
      }
    });
  }

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
    this.isUploaded = true;
  }
  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
  }
  CoverFileChangeEvent(event: any): void {
    if (event.target.files && event.target.files[0]) {
      var filesAmount = event.target.files.length;
      for (let i = 0; i < filesAmount; i++) {
        this.serverFile.push(event.target.files[i]);
      }
    }
  }
  ngOnDestroy() {
    var body = document.getElementsByTagName('body')[0];
    body.classList.remove('profile-page');
    var navbar = document.getElementsByTagName('nav')[0];
    navbar.classList.remove('navbar-transparent');
  }
}

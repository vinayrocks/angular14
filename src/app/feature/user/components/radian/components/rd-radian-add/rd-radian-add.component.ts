import { Component, OnInit } from '@angular/core';
import * as Rellax from 'rellax';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray } from '@angular/forms';
import { RdUserService } from 'src/app/shared/services/user/rd-user-service';
import * as  skillsInterest from 'src/app/shared/core/json-data/skillsInterest.json';
import { first } from 'rxjs/operators';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { NotificationService } from 'src/app/shared/services/common/rd-notification/notification.service';
import { RdRadian } from 'src/app/shared/core/models/rd-radian/rd-radian';
import { RdCommon } from 'src/app/shared/core/models/rd-common/rd-common';
import { Router } from '@angular/router';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-rd-radian-add',
  templateUrl: './rd-radian-add.component.html',
  styleUrls: ['./rd-radian-add.component.scss']
})
export class RdRadianAddComponent implements OnInit {
  addRadianFormGroup: FormGroup;
  skills: any;
  skillsSubcategory: any;
  routerData: any = [];
  url: any = '';
  tempArr: any = [];
  tempArrPortfolio: any = [];
  userPortfolio: any;
  imageChangedEvent: any = '';
  croppedImage: any = '';
  isUploaded: Boolean = false;
  serverFile: any = [];
  config: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '150px',
    minHeight: '150px',
    placeholder: 'Enter text here...',
    translate: 'no',
    defaultParagraphSeparator: 'p',
    defaultFontName: 'Open Sans',
    showToolbar: true,
    toolbarHiddenButtons: [
      ['bold', 'italic'],
      ['fontSize',
        'insertHorizontalRule',]
    ]
  };
  maxDate = new Date();
  minDate = new Date();
  constructor(private _formBuilder: FormBuilder, private rdUserService: RdUserService,
    private spinner:NgxSpinnerService,
    private notificationService: NotificationService, private router: Router) {
    this.skills =(skillsInterest as any).default;
    this.createFormGroup();
    this.minDate.setFullYear(this.minDate.getFullYear() - 40);
  }
  ngOnInit() {
    var rellaxHeader = new Rellax('.rellax-header');
    var body = document.getElementsByTagName('body')[0];
    body.classList.add('profile-page');
    var navbar = document.getElementsByTagName('nav')[0];
    navbar.classList.add('navbar-transparent');
    this.getUserPorfolio();
    this.addEducation();
    this.addCertificationLicensed();
    this.addExperience();
  }
  get addRadianForm() { return this.addRadianFormGroup.controls; }

  createFormGroup(){
    this.addRadianFormGroup = this._formBuilder.group({
      ProfileName: ['', Validators.required],
      ProfilePicture: [''],
      CoverPicture: [''],
      ProfileDescription: ['', Validators.required],
      ProfileSkill: [''],
      ProfileExpertise: ['', Validators.required],
      LinkedPortfolio: ['', Validators.required],
      Education:this._formBuilder.array([]),
      CertificationLicensed:this._formBuilder.array([]),
      Experience:this._formBuilder.array([])
    });
  }

  getSkillSubCategory(event: any) {
    if (this.addRadianForm.ProfileSkill.value !== '') {
      this.skillsSubcategory = this.skills.filter(function (item) {
        return item.radianSkillCategoryId === event;
      })[0].radianSkillSubCategories;
    }
  }
  onSelectFile(event) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      // this.addRadianForm.ProfilePicture = event.target.files[0].name;
      reader.readAsDataURL(event.target.files[0]); // read file as data url
      reader.onload = (event) => { // called once readAsDataURL is completed
        this.url = event.target.result;
      }
    }
  }
  CoverFileChangeEvent(event: any): void {
    if (event.target.files && event.target.files[0]) {
      var filesAmount = event.target.files.length;
      for (let i = 0; i < filesAmount; i++) {
        this.serverFile.push(event.target.files[i]);

      }
    }
  }
  onSelectExperties(event, item: any) {
    if (event.target.checked) {
      this.tempArr.push(item.id);
    } else {
      const index: number = this.tempArr.indexOf(item.id);
      if (index !== -1) {
        this.tempArr.splice(index, 1);
      }
    }
    this.addRadianForm.ProfileExpertise.setValue(this.tempArr.join(','));
  }
  onSelectPortfolio(event, item: any){
    if (event.target.checked) {
      this.tempArrPortfolio.push(item.id);
    } else {
      const index: number = this.tempArrPortfolio.indexOf(item.id);
      if (index !== -1) {
        this.tempArrPortfolio.splice(index, 1);
      }
    }
    this.addRadianForm.LinkedPortfolio.setValue(this.tempArrPortfolio.join(','));
  }
  getUserPorfolio() {
    this.spinner.show()
    this.rdUserService.getUserPorfolios(new RdCommon(this.routerData))
      .pipe(first())
      .subscribe(
        res => {
          
          this.spinner.hide()
          this.userPortfolio = res.data;
        },
        error => {
          this.spinner.hide()
        });
  }
  onSubmit() {
    this.spinner.show()
    // stop here if form is invalid
    if (this.addRadianFormGroup.invalid) {

      this.notificationService.error('Please fill in the required fields');
      this.validateAllFormFields(this.addRadianFormGroup);
      return;
    }
    if (this.serverFile.length > 0) {
      this.rdUserService.UploadUserRadianProfileImage(this.croppedImage, this.serverFile, this.addRadianForm.ProfileName.value)
        .pipe(first())
        .subscribe(
          res => {
            this.spinner.hide()
            const pp = res.data.ProfilePicture;
            const cc = res.data.CoverPicture;
            this.addRadianForm.ProfilePicture.setValue(pp);
            this.addRadianForm.CoverPicture.setValue(cc);
            this.rdUserService.addUserProfile(new RdRadian(this.addRadianFormGroup.value))
              .subscribe(res => {
      
                if (res.status) {
                  this.notificationService.success(res.message);
                  this.onReset();
                  this.router.navigate(['/member/hunar_view']);
                } else {
                  this.notificationService.error(res.message);
                }
              });
          },
          error => {
            this.spinner.hide()
            this.notificationService.error('Something went wrong.Please try again.');
          });
    } else {
      this.spinner.show()
      this.addRadianForm.ProfilePicture.setValue('');
      this.addRadianForm.CoverPicture.setValue('');
      this.rdUserService.addUserProfile(new RdRadian(this.addRadianFormGroup.value))
        .subscribe(res => {
          this.spinner.hide()
          if (res.status) {
            this.notificationService.success(res.message);
            this.onReset();
            this.router.navigate(['/member/hunar_view']);
          } else {
            this.notificationService.error(res.message);
          }
        });
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
  onReset() {
    this.addRadianFormGroup = this._formBuilder.group({
      ProfileName: ['', Validators.required],
      ProfilePicture: [''],
      CoverPicture: [''],
      ProfileDescription: ['', Validators.required],
      ProfileSkill: [''],
      ProfileExpertise: ['', Validators.required],
      LinkedPortfolio: ['', Validators.required]
    });
  }
  ngOnDestroy() {
    var body = document.getElementsByTagName('body')[0];
    body.classList.remove('profile-page');
    var navbar = document.getElementsByTagName('nav')[0];
    navbar.classList.remove('navbar-transparent');
  }

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
    this.isUploaded = true;
  }
  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
  }


  educationFormarray() : FormArray {
    debugger 
    console.log(this.addRadianFormGroup);
    return this.addRadianFormGroup.get("Education") as FormArray  
  }  
  newEducation(): FormGroup {  
    return this._formBuilder.group({  
      Education: ['',Validators.required],  
      StartsOn: ['',Validators.required],
      EndsOn:['',Validators.required]  
    })  
  }  
     
  addEducation() {  
    debugger
    this.educationFormarray().push(this.newEducation());  
  }
  getEducationControls() {
    return (this.addRadianFormGroup.get('Education') as FormArray).controls;
  }

  CertificationLicensedFormarray() : FormArray {  
    return this.addRadianFormGroup.get("CertificationLicensed") as FormArray  
  }  
  newCertificationLicensed(): FormGroup {  
    return this._formBuilder.group({  
      CertificationName: ['',Validators.required],  
      CertifiedDate: ['',Validators.required],
      CertificationLicensedNumber:['']  
    })  
  }  
     
  addCertificationLicensed() {  
    this.CertificationLicensedFormarray().push(this.newCertificationLicensed());  
  }
  getCertificationLicensedControls() {
    return (this.addRadianFormGroup.get('CertificationLicensed') as FormArray).controls;
  }

  ExperienceFormarray() : FormArray {  
    return this.addRadianFormGroup.get("Experience") as FormArray  
  }  
  newExperience(): FormGroup {  
    return this._formBuilder.group({  
      ExperienceName: ['',Validators.required],  
      StartDate: ['',Validators.required],
      ToDate:['',Validators.required]  
    })  
  }  
     
  addExperience() {  
    this.ExperienceFormarray().push(this.newExperience());  
  }
  getExperienceControls() {
    return (this.addRadianFormGroup.get('Experience') as FormArray).controls;
  }

  onOpenCalendar(container) {
    container.monthSelectHandler = (event: any): void => {
      container._store.dispatch(container._actions.select(event.date));
    };
    container.setViewMode('year');
  }
}

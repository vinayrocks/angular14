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
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { DefaultNgxMatCalendarRangeStrategy } from '@angular-material-components/datetime-picker';
import { stringify } from 'querystring';
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
  eduNameConfig: any = {  
  displayKey: "name",
  search: true,
  placeholder: "Select",
  searchPlaceholder: "Search",
  searchOnKey: "name",
  height: "150px",}
  skillConfig: any = {  
    displayKey: "radianSkillCategoryName",
    search: true,
    placeholder: "Select",
    searchPlaceholder: "Search",
    searchOnKey: "radianSkillCategoryName",
    height: "150px",};
  degreeName: any=[
    { id: 10, name: 'SSC', status: 'enabled' },
    { id: 11, name: 'HSC', status: 'enabled' },
    { id: 12, name: 'Graduate', status: 'enabled' },
    { id: 13, name: 'Post Graduate', status: 'enabled' },
    { id: 14, name: 'PhD', status: 'enabled' },
    { id: 15, name: 'Others', status: 'enabled' },
  ];

  maxDate = new Date();
  minDate = new Date();
  _disableOther:boolean=false;
  constructor(private _formBuilder: FormBuilder, private rdUserService: RdUserService,
    private spinner:NgxSpinnerService,private modalService: NgbModal,
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

  createFormGroup(){
    this.addRadianFormGroup = this._formBuilder.group({
      ProfileName: new FormControl('', Validators.required),
      ProfilePicture: new FormControl(''),
      CoverPicture: new FormControl(''),
      ProfileDescription: new FormControl('', Validators.required),
      ProfileSkill: new FormControl(''),
      ProfileExpertise:new FormControl('', Validators.required),
      LinkedPortfolio:new FormControl('', Validators.required),
      Education: this._formBuilder.array([]),
      CertificationLicense: this._formBuilder.array([]),
      Experience: this._formBuilder.array([])
    });
  }

  getSkillSubCategory(event: any) {
    this.skillsSubcategory = this.skills.filter(function (item) {
      return item.radianSkillCategoryId === event.radianSkillCategoryId;
    })[0].radianSkillSubCategories;
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
    this.serverFile=[];
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
    this.addRadianFormGroup.controls['ProfileExpertise'].setValue(this.tempArr.join(','));
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
    this.addRadianFormGroup.controls['LinkedPortfolio'].setValue(this.tempArrPortfolio.join(','));
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
    const dxData = this.addRadianFormGroup.value;
    // stop here if form is invalid
    this.checkChildArrayValidation();
    if (this.addRadianFormGroup.invalid) {
      console.log(this.addRadianFormGroup);
      this.notificationService.error('Please fill in the required fields');
      this.validateAllFormFields(this.addRadianFormGroup);
      
      return;
    } else {
      dxData.ProfileSkill = dxData.ProfileSkill.radianSkillCategoryId;
      dxData.Education.map((x:any)=>x.EducationName = x.EducationName.name);
      // dxData.Education.map((x:any)=>x.StartsOn = new Date(x.StartsOn).getFullYear());
      // dxData.Education.map((x:any)=>x.EndsOn = new Date(x.EndsOn).getFullYear());
      // dxData.Experience.map((x:any)=>x.StartDate = new Date(x.StartDate).getFullYear());
      // dxData.Experience.map((x:any)=>x.ToDate = new Date(x.ToDate).getFullYear());
      // dxData.CertificationLicense.map((x:any)=>x.CertifiedDate = moment(x.CertifiedDate).format('YYYY-MM-DD'));

      dxData.Education = JSON.stringify(dxData.Education);
      dxData.Experience = JSON.stringify(dxData.Experience);
      dxData.CertificationLicense = JSON.stringify(dxData.CertificationLicense);
    }
    if (this.serverFile.length > 0) {
      this.spinner.show()
      this.rdUserService.UploadUserRadianProfileImage(this.croppedImage, this.serverFile, dxData.ProfileName)
        .pipe(first())
        .subscribe(
          res => {
            this.spinner.hide()
            // const pp = res.data.ProfilePicture;
            // const cc = res.data.CoverPicture;
            dxData.ProfilePicture = res.data.ProfilePicture;
            dxData.CoverPicture = res.data.CoverPicture
            // this.addRadianForm.ProfilePicture.setValue(pp);
            // this.addRadianForm.CoverPicture.setValue(cc);
            this.rdUserService.addUserProfile(new RdRadian(dxData))
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
      dxData.ProfilePicture = '';
      dxData.CoverPicture = ''
      this.rdUserService.addUserProfile(new RdRadian(dxData))
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
  checkChildArrayValidation(){
    const dx = this.getEducationControls();
    dx.forEach((el:any) => {
      this.validateAllFormFields(el);
    });
    const dxp = this.getCertificationLicensedControls();
    dxp.forEach((el:any) => {
      this.validateAllFormFields(el);
    });
    const dxexp = this.getExperienceControls();
    dxexp.forEach((el:any) => {
      this.validateAllFormFields(el);
    });
  }
  onReset() {
    this.createFormGroup();
  }
  ngOnDestroy() {
    var body = document.getElementsByTagName('body')[0];
    body.classList.remove('profile-page');
    var navbar = document.getElementsByTagName('nav')[0];
    navbar.classList.remove('navbar-transparent');
  }
  openProfilePopup(content:any){
    this.modalService.open(content, { centered: true,size: 'lg' })
  }
  fileChangeEvent(event: any,content:any): void {
    this.imageChangedEvent = event;
    this.isUploaded = true;
  }
  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
  }
  openCoverPopup(content:any){
    this.modalService.open(content, { centered: true,size: 'lg' })
  }

  educationFormarray() : FormArray {
    return this.addRadianFormGroup.get("Education") as FormArray  
  }  
  newEducation(): FormGroup {  
    return this._formBuilder.group({  
      EducationName: ['',Validators.required],  
      Other: [''],
      StartsOn: ['',Validators.required],
      EndsOn:['',Validators.required],
      showOther:[false]
    })  
  }  
     
  addEducation() {  
    this.educationFormarray().push(this.newEducation());  
  }
  getEducationControls() {
    return (this.addRadianFormGroup.get('Education') as FormArray).controls;
  }
  deleteEducation(index:number){
    this.educationFormarray().removeAt(index);  
  }

  CertificationLicensedFormarray() : FormArray {  
    return this.addRadianFormGroup.get("CertificationLicense") as FormArray  
  }  
  newCertificationLicensed(): FormGroup {  
    return this._formBuilder.group({  
      CertificationName: ['',Validators.required],  
      CertifiedDate: ['',Validators.required],
      CertificationLicenseNumber:['']  
    })  
  }  
     
  addCertificationLicensed() {  
    this.CertificationLicensedFormarray().push(this.newCertificationLicensed());  
  }
  getCertificationLicensedControls() {
    return (this.addRadianFormGroup.get('CertificationLicense') as FormArray).controls;
  }
  deleteCertificationLicensed(index:number){
    this.CertificationLicensedFormarray().removeAt(index);  
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
  deleteExperience(index:number){
    this.ExperienceFormarray().removeAt(index);  
  }
  onOpenCalendar(container) {
    container.monthSelectHandler = (event: any): void => {
      container._store.dispatch(container._actions.select(event.date));
    };
    container.setViewMode('year');
  }
  degreeSelect(event:any,index){
    let dx:any=this.getEducationControls()[index];
    console.log(dx.controls)
    if(event.name.toLowerCase()==='other'){
      this._disableOther = true;
      dx.controls['Others'].addValidators(Validators.required);
      dx.controls['showOther'].setValue(true);
    } else {
      this._disableOther = false;
      dx.controls['Others'].removeValidators(Validators.required);
      dx.controls['showOther'].setValue(false);
      
    }
  }
  close(modal:any){
    modal.dismiss('Cross click');
    this.croppedImage ='';
  }
  closeCover(modal:any){
    modal.dismiss('Cross click')
  }
}


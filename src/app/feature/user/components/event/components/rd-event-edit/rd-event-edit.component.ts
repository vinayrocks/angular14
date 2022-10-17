import { Component, OnInit } from '@angular/core';
import * as Rellax from 'rellax';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { RdUserService } from 'src/app/shared/services/user/rd-user-service';
import * as  skillsInterest from 'src/app/shared/core/json-data/skillsInterest.json';
import { Router, ActivatedRoute } from '@angular/router';
import { RdEncryptDecryptService } from 'src/app/shared/services/encrypt-decrypt/rd-encrypt-decrypt.service';
import { EmbedVideoService } from 'ngx-embed-video';
import { first } from 'rxjs/operators';
import { NotificationService } from 'src/app/shared/services/common/rd-notification/notification.service';
import { RdEvent } from 'src/app/shared/core/models/rd-event/rd-event';
import { RdCommon } from 'src/app/shared/core/models/rd-common/rd-common';
import { RdAuthenticateService } from 'src/app/shared/services/authentication/rd-authenticate.service';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { NgxSpinnerService } from 'ngx-spinner';
import * as  countryState from 'src/app/shared/core/json-data/countryState.json';
import * as  countryCode from 'src/app/shared/core/json-data/countryCodes.json';
import * as moment from 'moment';
@Component({
  selector: 'app-rd-event-edit',
  templateUrl: './rd-event-edit.component.html',
  styleUrls: ['./rd-event-edit.component.scss']
})
export class RdEventEditComponent implements OnInit {
  editEventFormGroup: FormGroup;
  isUploaded: Boolean = false;
  urls = [];
  isImageType: Boolean = true;
  skills: any;
  skillsSubcategory: any;
  tempArr: any = [];
  routerData: any = [];
  userEvent: any = '';
  tempSubCategory: any = [];
  addMoreImageArray: any = [1];
  imageIndex: number = 0;
  linkURL: string = '';
  serverFile = [];
  EventPictureModel: any = [];
  projectFilePath: String = '';
  projectPath: String = '';
  currentUser: any;
  eventName: String = '';
  config: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: 'auto',
    minHeight: 'auto',
    placeholder: 'Enter text here...',
    translate: 'no',
    defaultParagraphSeparator: 'p',
    defaultFontName: 'Open Sans',
    showToolbar: true,
    toolbarHiddenButtons: [
      ['bold', 'italic'],
      ['fontSize', 'insertImage',
        'insertVideo',
        'insertHorizontalRule',]
    ]
  };
  countryState: any;
  countryCode: any;
  state: any;
  images:any=[];
  constructor(private _formBuilder: FormBuilder, private rdUserService: RdUserService,
    private router: Router, private _encryptDecryptService: RdEncryptDecryptService,
    private route: ActivatedRoute, private embedService: EmbedVideoService,
    private notificationService: NotificationService, private spinner: NgxSpinnerService,
    private rdAuthenticateService: RdAuthenticateService) {
    // this.rdAuthenticateService.currentUser.subscribe(x => this.currentUser = x);

    this.currentUser = this.rdAuthenticateService.getLocalStorageData();
    this.projectFilePath = this.currentUser.firstName + '_' + this.currentUser.username.split('@')[0] + '/Event';
    //PortfolioMedia
    this.routerData.Id = this.route.snapshot.paramMap.get('id');
    if (this.routerData.Id !== '') {
      this.routerData = this._encryptDecryptService.decryptModel(this.routerData);
      this.getUserEvent(this.routerData);
    } else {
      this.router.navigate(['/member/event_view']);
    }
    this.skills =(skillsInterest as any).default;
    this.countryState = (countryState as any).default;
    this.countryCode = (countryCode as any).default;
  }
  ngOnInit() {
    var rellaxHeader = new Rellax('.rellax-header');

    var body = document.getElementsByTagName('body')[0];
    body.classList.add('profile-page');
    var navbar = document.getElementsByTagName('nav')[0];
    navbar.classList.add('navbar-transparent');
    this.editEventFormGroup = this._formBuilder.group({
      Id: [this.routerData.Id, Validators.required],
      EventName: ['', Validators.required],
      EventDescription: ['', Validators.required],
      EventMedia: [''],
      EventSkill: [''],
      EventCategory: ['', Validators.required],
      EventStatus: [true],
      IsEventOnline: [false],
      EventLink: ['', this.requiredIfValidator(() => this.editEventForm.IsEventOnline.value)],
      country: ['',  this.requiredIfValidator(() => !this.editEventForm.IsEventOnline.value)],
      street: ['',  this.requiredIfValidator(() => !this.editEventForm.IsEventOnline.value)],
      city: ['',  this.requiredIfValidator(() => !this.editEventForm.IsEventOnline.value)],
      state: ['',  this.requiredIfValidator(() => !this.editEventForm.IsEventOnline.value)],
      zip: ['',  this.requiredIfValidator(() => !this.editEventForm.IsEventOnline.value)],
      EventStartDateTime: ['', Validators.required],
      EventEndDateTime: ['', Validators.required],
      linkURL: ['']
    });
  }
  get editEventForm() { return this.editEventFormGroup.controls; }
  setFormGroup() {
    const id = this.userEvent.EventSkill.id;
    this.userEvent.EventCategory.forEach(element => {
      this.tempArr.push(element.id);
    });
    this.skillsSubcategory = this.skills.filter(function (item) {
      return item.radianSkillCategoryId === id;
    })[0].radianSkillSubCategories;

    this.skillsSubcategory.forEach(element => {
      if (this.tempArr.indexOf(element.id) !== -1) {
        this.tempSubCategory.push({ 'id': element.id, 'name': element.subCategoryName, 'isChecked': true });
      } else {
        this.tempSubCategory.push({ 'id': element.id, 'name': element.subCategoryName, 'isChecked': false });
      }
    });

    // 2 - Offline / 1 - Online
    if(this.userEvent.IsEventOnline == "2"){
      this.userEvent.IsEventOnline = false;
    }
    else if(this.userEvent.IsEventOnline == "1"){
      this.userEvent.IsEventOnline = true;
    }
    this.editEventForm.EventName.setValue(this.userEvent.EventName);
    this.editEventForm.EventSkill.setValue(this.userEvent.EventSkill.id);
    this.editEventForm.EventMedia.setValue(this.userEvent.EventMedia.map((x:any)=>x.name));
    this.editEventForm.EventCategory.setValue(this.tempArr.join(','));
    this.editEventForm.EventDescription.setValue(this.userEvent.EventDescription);
    this.editEventForm.EventStatus.setValue(this.userEvent.EventStatus);
    this.editEventForm.IsEventOnline.setValue(this.userEvent.IsEventOnline);
    this.editEventForm.country.setValue(this.userEvent.EventLocation.country);
    this.editEventForm.street.setValue(this.userEvent.EventLocation.street);
    this.editEventForm.city.setValue(this.userEvent.EventLocation.city);                 
    this.editEventForm.state.setValue(this.userEvent.EventLocation.state);
    this.editEventForm.zip.setValue(this.userEvent.EventLocation.zip);
    this.editEventForm.EventLink.setValue(this.userEvent.EventLink===undefined?'':this.userEvent.EventLink);
    this.editEventForm.EventStartDateTime.setValue(this.userEvent.EventStartDateTime);
    this.editEventForm.EventEndDateTime.setValue(this.userEvent.EventEndDateTime);
  
    
  }
  changeEventType(event:any){
    this.editEventForm.EventLink.updateValueAndValidity();
    this.editEventForm.country.updateValueAndValidity();
    this.editEventForm.street.updateValueAndValidity();
    this.editEventForm.city.updateValueAndValidity();
    this.editEventForm.state.updateValueAndValidity();
    this.editEventForm.zip.updateValueAndValidity();
  }

  getStates(event: any) {
    this.state = this.countryState.filter(function (item) {
      return item.country === event;
    })[0].states;
  }
  getSkillSubCategory(event: any) {
    this.tempSubCategory = [];
    if (this.editEventForm.EventSkill.value !== '') {
      this.skillsSubcategory = this.skills.filter(function (item) {
        return item.radianSkillCategoryName === event;
      })[0].radianSkillSubCategories;
      this.skillsSubcategory.forEach(element => {
        if (this.tempArr.indexOf(element.subCategoryName) !== -1) {
          this.tempSubCategory.push({ 'name': element.subCategoryName, 'isChecked': true });
        } else {
          this.tempSubCategory.push({ 'name': element.subCategoryName, 'isChecked': false });
        }
      });
    }
  }
  getUserEvent(item) {
    this.spinner.show()
    this.rdUserService.getUserEvent(new RdCommon(item))
      .pipe(first())
      .subscribe(
        res => {
          this.spinner.hide()
          ;
          res.data.forEach(element => {
            this.EventPictureModel = element.EventMedia.split(',');
            element.EventSkill = element.EventSkill === '' ? [] : JSON.parse(element.EventSkill);
            element.EventCategory = element.EventCategory === '' ? [] : JSON.parse(element.EventCategory);
            element.EventLocation = element.EventLocation === '' ? [] : JSON.parse(element.EventLocation);
            element.EventMedia = element.EventMedia === '' ? [] : this.GetEventImagePath(element);
          });
          this.projectPath = res.projectPath;
          this.userEvent = res.data[0];
          this.eventName = res.data[0].EventName;
          this.eventName = this.eventName.replace(/\s/g, "");
          this.getStates(this.userEvent.EventLocation.country);
          
          this.setFormGroup();
        },
        error => {
          this.spinner.hide()
        });
  }
  getVideo(url) {
    return this.embedService.embed(url);
  }
  fileChangeEvent(event: any, index: number): void {
    const data: any = [];
    const serverData: any = [];
    if (event.target.files && event.target.files[0]) {
      var filesAmount = event.target.files.length;
      for (let i = 0; i < filesAmount; i++) {
        serverData.File = event.target.files[i];
        this.serverFile.push(serverData);
        if (event.target.files[i].type === 'image/jpeg' || event.target.files[i].type === 'image/png') {
          data.type = 'image';
          var reader = new FileReader();
          reader.onload = (event: any) => {
            // data.imageMovieURL = event.target.result;
            this.urls.push({ Name: event.target.result, IsImage: 'image' });
            // this.urls.push(data);
          }
          reader.readAsDataURL(event.target.files[i]);
        } else if (event.target.files[i].type === 'application/pdf') {
          // data.type='document';
          // data.imageMovieURL='';
          this.urls.push({ Name: '', IsImage: 'pdf' });
        } else {
          this.notificationService.warn('File format not accepted [Valid format: .jpg, .png, .pdf]')
        }
      }
      this.isUploaded = true;
      this.imageIndex = index + 1;
      this.addMoreImageArray.push(index + 1);

    }

  }
  selectMediaType(event: any) {
    if (event !== 'image') {
      this.isImageType = false;
    } else {
      this.isImageType = true;
    }
  }
  addMoreImage(index: number) {
    const data: any = [];
    if (this.validateYouTubeUrl(index)) {
      data.type = 'video';
      data.imageMovieURL = this.editEventForm.linkURL.value;
      const img = this.embedService.embed_image(this.editEventForm.linkURL.value, { image: 'mqdefault' })
        .then(res => {
          this.urls.push({
            Name: this.embedService.embed(data.imageMovieURL), IsImage: 'video',
            Image: res.link
          });
        });
      // this.urls.push({Name:this.embedService.embed(this.editPortfolioForm.linkURL.value),IsImage:'video',
      // Image:res.link});
      this.imageIndex = index + 1;
      this.addMoreImageArray.push(index + 1);
      this.isImageType = true;
      this.isUploaded = true;
      this.EventPictureModel.push(data.imageMovieURL);
      this.editEventForm.linkURL.setValue('');
    } else {
      this.notificationService.error('Not a valid link.Please try again.');
      this.editEventForm.linkURL.setValue('');
    }
  }

  validateYouTubeUrl(index: number) {

    if (this.editEventForm.linkURL.value != undefined || this.editEventForm.linkURL.value != '') {
      var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|\?v=)([^#\&\?]*).*/;
      var match = this.editEventForm.linkURL.value.match(regExp);
      if (match && match[2].length == 11) {
        return true;
      }
      return false;
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
    this.editEventForm.EventCategory.setValue(this.tempArr.join(','));
  }
  onSubmit() {
    this.spinner.show()
    // stop here if form is invalid
    ;
    if (this.editEventFormGroup.invalid) {
      this.notificationService.error('Please fill in the required fields');
      this.validateAllFormFields(this.editEventFormGroup);
      return;
    }
    if (this.serverFile.length != 0) {
      this.rdUserService.UploadUserEventImage(this.serverFile, this.editEventForm.EventName.value)
        .pipe(first())
        .subscribe(
          res => {
            this.spinner.hide()
            var dataReposne = res.data.split(',');
            this.serverFile = [];
            dataReposne.forEach(element => {
              this.EventPictureModel.push(element);
            });
            this.editEventForm.EventMedia.setValue(this.EventPictureModel.join(','));
            this.submitDetail();
          },
          error => {
            this.spinner.hide()
            this.notificationService.error('Something went wrong.Please try again.');
          });
    } else {
      
      this.editEventForm.EventMedia.setValue(this.EventPictureModel);
      this.submitDetail();
    }

  }
  submitDetail() {
    this.editEventForm.EventStartDateTime.setValue(moment(this.editEventForm.EventStartDateTime.value).format('YYYY-MM-DD HH:mm:ss'));
    this.editEventForm.EventEndDateTime.setValue(moment(this.editEventForm.EventEndDateTime.value).format('YYYY-MM-DD HH:mm:ss'));
    this.rdUserService.addUserEvent(new RdEvent(this.editEventFormGroup.value))
      .subscribe(res => {
        this.spinner.hide()
        if (res.status) {
          this.notificationService.success(res.message);
          this.router.navigate(['/member/event_view']);
        } else {
          this.notificationService.error(res.message);
        }
      },error => {
        
        this.spinner.hide()
        this.notificationService.error('Something went wrong.Please try again.');
      });
  }
  assembleEventPictures(uploadedImages) {
    uploadedImages.forEach(element => {
      this.EventPictureModel.push(element);
    });
    this.userEvent.EventMedia.foreach(element => {
      this.EventPictureModel.push(element.imageMovieURL);
    })
    return this.EventPictureModel;
  }
  removeMedia(index) {
    this.urls.splice(index, 1);
    this.serverFile.splice(index, 1);
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
  GetEventImagePath(element) {
    const imageArry = [];
    if (element.EventMedia !== '') {
      if (element.EventMedia.split(',').length > 1) {
        element.EventMedia.split(',')
          .forEach(data => {
            if (data.indexOf('youtu.be') === -1 && data.indexOf('youtube') === -1 && data.indexOf('pdf') === -1) {
              imageArry.push({ Name: data, IsImage: 'image' });
            } else if (data.indexOf('youtu.be') === -1 && data.indexOf('youtube') === -1 && data.indexOf('pdf') !== -1) {
              imageArry.push({ Name: data, IsImage: 'pdf' });
            } else {

              const img = this.embedService.embed_image(data, { image: 'mqdefault' })
                .then(res => {

                  imageArry.push({ Name: this.embedService.embed(data), IsImage: 'video', Image: res.link });
                });

            }

          });
      } else {
        if (element.EventMedia.indexOf('youtu.be') === -1 && element.EventMedia.indexOf('youtube') === -1
          && element.EventMedia.indexOf('pdf') === -1) {
          imageArry.push({ Name: element.EventMedia, IsImage: 'image' });
        } else if (element.EventMedia.indexOf('youtu.be') === -1 && element.EventMedia.indexOf('youtube') === -1
          && element.EventMedia.indexOf('pdf') !== -1) {
          imageArry.push({ Name: element.EventMedia, IsImage: 'pdf' });
        } else {
          const img = this.embedService.embed_image(element.EventMedia, { image: 'mqdefault' })
            .then(res => {

              imageArry.push({
                Name: this.embedService.embed(element.EventMedia), IsImage: 'video',
                Image: res.link
              });
            });
          // imageArry.push(element.EventMedia);

        }

      }
    }
    return imageArry;
  }
  requiredIfValidator(predicate) {
    return (formControl => {
      if (!formControl.parent) {
        return null;
      }
      if (predicate()) {
        return Validators.required(formControl); 
      }
      return null;
    })
  }
  ngOnDestroy() {
    var body = document.getElementsByTagName('body')[0];
    body.classList.remove('profile-page');
    var navbar = document.getElementsByTagName('nav')[0];
    navbar.classList.remove('navbar-transparent');
  }

}

import { Component, OnInit } from '@angular/core';
import * as Rellax from 'rellax';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { RdUserService } from 'src/app/shared/services/user/rd-user-service';
import { EmbedVideoService } from 'ngx-embed-video';
import { first } from 'rxjs/operators';
import { NotificationService } from 'src/app/shared/services/common/rd-notification/notification.service';
import { RdPortfolio } from 'src/app/shared/core/models/rd-portfolio/rd-portfolio';
import { Router } from '@angular/router';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-rd-portfolio-add',
  templateUrl: './rd-portfolio-add.component.html',
  styleUrls: ['./rd-portfolio-add.component.scss']
})
export class RdPortfolioAddComponent implements OnInit {
  addPortfolioFormGroup: FormGroup;
  focusPortfolioName;
  focusPortfolioArtifacts;
  isUploaded: Boolean = false;
  urls = [];
  addMoreImageArray:any=[1];
  isImageType:Boolean=true;
  imageIndex:Number=0;
  linkURL:String='';
  serverFile=[];
  PortfolioMediaModel:any=[];
  config: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '150px',
    minHeight: '150px',
    placeholder: 'Enter text here...',
    translate: 'no',
    defaultParagraphSeparator: 'p',
    defaultFontName: 'Open Sans',
    showToolbar:true,
    toolbarHiddenButtons: [
      ['bold', 'italic'],
      ['fontSize',
      'insertHorizontalRule',]
    ]
  };
  constructor(private _formBuilder: FormBuilder, private rdUserService: RdUserService,
    private embedService: EmbedVideoService,private spinner:NgxSpinnerService,
    private notificationService:NotificationService, private router: Router
    ) {
    //PortfolioMedia
    // 
  }

  ngOnInit() {
    var rellaxHeader = new Rellax('.rellax-header');
    var body = document.getElementsByTagName('body')[0];
    body.classList.add('profile-page');
    var navbar = document.getElementsByTagName('nav')[0];
    navbar.classList.add('navbar-transparent');
    this.addPortfolioFormGroup = this._formBuilder.group({
      PortfolioName: ['', Validators.required],
      PortfolioArtifacts: ['', Validators.required],
      PortfolioMedia: [''],
      linkURL:['']
    });
  }
  get addPortfolioForm() { return this.addPortfolioFormGroup.controls; }
  
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
            this.urls.push({Name:event.target.result,IsImage:'image'});
            // this.urls.push(data);
          }
          reader.readAsDataURL(event.target.files[i]);
        }else if(event.target.files[i].type==='application/pdf'){
          // data.type='document';
          // data.imageMovieURL='';
          this.urls.push({Name:'',IsImage:'pdf'});
        } else {
          this.notificationService.warn('File format not accepted [Valid format: .jpg, .png, .pdf]')
        }
      }
      this.isUploaded = true;
      this.imageIndex=index+1;
      this.addMoreImageArray.push(index+1);

    }


  }
  removeMedia(index){
    this.urls.splice(index,1);
    this.serverFile.splice(index,1);
  }
  getVideo(url){
    return this.embedService.embed(url);
  }
  selectMediaType(event: any){
    if(event!=='image'){
      this.isImageType=false;

    } else {
      this.isImageType=true;
    }
  }
  addMoreImage(index:number){
    const data: any = [];
    if (this.validateYouTubeUrl(index)) {
      data.type = 'video';
      data.imageMovieURL = this.addPortfolioForm.linkURL.value;
      const img = this.embedService.embed_image(this.addPortfolioForm.linkURL.value, { image: 'mqdefault' })
      .then(res => {
        this.urls.push({Name:this.embedService.embed(data.imageMovieURL),IsImage:'video',
        Image:res.link});
      });
      // this.urls.push({Name:this.embedService.embed(this.editPortfolioForm.linkURL.value),IsImage:'video',
      // Image:res.link});
      this.imageIndex = index + 1;
      this.addMoreImageArray.push(index + 1);
      this.isImageType = true;
      this.isUploaded = true;
      this.PortfolioMediaModel.push(data.imageMovieURL);
      this.addPortfolioForm.linkURL.setValue('');
    } else {
      this.notificationService.error('Not a valid link.Please try again.');
      this.addPortfolioForm.linkURL.setValue('');
    }
  }
  validateYouTubeUrl(index:number)
  {
    if (this.addPortfolioForm.linkURL.value != undefined || this.addPortfolioForm.linkURL.value != '') {
        var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|\?v=)([^#\&\?]*).*/;
        var match = this.addPortfolioForm.linkURL.value.match(regExp);
        if (match && match[2].length == 11) {
          return true;
        }
        return false;
    }
  }
  onSubmit() {
    this.spinner.show()
    // stop here if form is invalid
    if (this.addPortfolioFormGroup.invalid) {

      this.notificationService.error('Please fill in the required fields');
      this.validateAllFormFields(this.addPortfolioFormGroup);
      return;
    }
    if(this.serverFile.length>0){
      this.rdUserService.UploadUserPortfolioFile(this.serverFile,
        this.addPortfolioForm.PortfolioName.value)
      .pipe(first())
        .subscribe(
          res => {
            this.spinner.hide()
            if(res.status){
              var dataReposne=res.data.split(',');
              this.serverFile=[];
              dataReposne.forEach(element => {
                this.PortfolioMediaModel.push(element);
              });
              this.addPortfolioForm.PortfolioMedia.setValue(this.PortfolioMediaModel.join(','))
              this.rdUserService.addUserPortfolio(new RdPortfolio(this.addPortfolioFormGroup.value))
              .subscribe(res=>{
      
                if(res.status){
                  this.notificationService.success(res.message);
                  this.router.navigate(['/member/portfolio_view']);
                } else {
                  this.notificationService.error(res.message);
                }
              });
            } else {
              this.notificationService.error(res.message);
            }
          },
          error => {
            this.spinner.hide()
          });
    } else {
      this.addPortfolioForm.PortfolioMedia.setValue('');
      this.rdUserService.addUserPortfolio(new RdPortfolio(this.addPortfolioFormGroup.value))
      .subscribe(res=>{
  
        if(res.status){
          this.notificationService.success(res.message);
          this.router.navigate(['/member/portfolio_view']);
        } else {
          this.notificationService.error(res.message);
        }
      })
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
  
  ngOnDestroy() {
    var body = document.getElementsByTagName('body')[0];
    body.classList.remove('profile-page');
    var navbar = document.getElementsByTagName('nav')[0];
    navbar.classList.remove('navbar-transparent');
  }

}

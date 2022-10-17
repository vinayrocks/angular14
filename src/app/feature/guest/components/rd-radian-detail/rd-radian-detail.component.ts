import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogConfig, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EmbedVideoService } from 'ngx-embed-video';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { ActivatedRoute } from '@angular/router';
import { RdUserService } from 'src/app/shared/services/user/rd-user-service';
import { first } from 'rxjs/operators';
import { RdEncryptDecryptService } from 'src/app/shared/services/encrypt-decrypt/rd-encrypt-decrypt.service';
import { RdGetEvent, RdLikeEventProfile } from 'src/app/shared/core/models/rd-common/rd-common';
import { RdAuthenticateService } from 'src/app/shared/services/authentication/rd-authenticate.service';
import { NotificationService } from 'src/app/shared/services/common/rd-notification/notification.service';
import { RdUrlLinkBoxComponent } from 'src/app/core/components/rd-url-link-box/rd-url-link-box.component';
import { PopupImageSliderComponent } from 'src/app/shared/components/popup-image-slider/popup-image-slider.component';
import { environment } from 'src/environments/environment';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-rd-radian-detail',
  templateUrl: './rd-radian-detail.component.html',
  styleUrls: ['./rd-radian-detail.component.scss']
})
export class RdRadianDetailComponent implements OnInit {
  routerData: any = [];
  radianDetail: any = [];
  CoverPicture: String = '';
  radianLikeData: any = [];
  UserInterested: any = [];
  config: AngularEditorConfig = {
    editable: false,
    spellcheck: false,
    height: 'auto',
    minHeight: 'auto',
    translate: 'no',
    defaultParagraphSeparator: 'p',
    defaultFontName: 'Open Sans',
    showToolbar: false
  };
  currentUser: any;
  UserLiked: String = ''
  constructor(private embedService: EmbedVideoService, private route: ActivatedRoute,private spinner:NgxSpinnerService,
    private rdAuthenticateService: RdAuthenticateService, private notificationService: NotificationService,
    private rdUserService: RdUserService, public matDialog: MatDialog,
    private _encryptDecryptService: RdEncryptDecryptService) {
    this.routerData.EventId = this.route.snapshot.paramMap.get('id');
    this.currentUser = this.rdAuthenticateService.getLocalStorageData();
    this.routerData = this._encryptDecryptService.decryptModel(this.routerData);
    if (this.currentUser === null) {
      this.radianLikeData.UserId = '';
      this.routerData.UserId = '';
    } else {
      this.radianLikeData.UserId = this.currentUser.id;
      this.routerData.UserId = this.currentUser.id;
    }

  }
  getVideo(url) {
    return this.embedService.embed(url);
    // this.embedService
    //   .embed_image(
    //     url,
    //     { image: 'mqdefault' }
    //   )
    //   .then(res => {
    //     return res.html;
    //   });
  }
  ngOnInit(): void {
    this.GetEventDetail();
  }
  GetEventDetail() {
    this.spinner.show()
    this.rdUserService.getEventDetail(new RdGetEvent(this.routerData))
      .pipe(first())
      .subscribe(
        res => {
          
          this.spinner.hide()
          res.data.forEach(element => {
            element.EventStatus = element.EventStatus === '1' ? true : false;
            element.ContactDetails = element.ContactDetails === '' ? [] : JSON.parse(element.ContactDetails);
            element.EventCategories = element.EventCategories === '' ? [] : JSON.parse(element.EventCategories);
            element.EventSkill = element.EventSkill === '' ? [] : JSON.parse(element.EventSkill);
            element.EventImages = this.getProfilefilePath(element);
            element.EventLocation = element.EventLocation === '' ? [] : JSON.parse(element.EventLocation);
          });
          
          this.radianDetail = res.data[0];
          this.UserLiked = res.UserLiked;
          this.UserInterested = res.UserInterested;

        },
        error => {
          this.spinner.hide()
        });
  }
  getProfilefilePath(data: any) {
    const imageArry = [];
    if (data.EventImages.split(',').length > 1) {
      data.EventImages.split(',')
        .forEach(element => {
          if(element.indexOf('youtu.be')===-1 && element.indexOf('youtube')===-1 && element.indexOf('pdf')===-1
          && element.indexOf('pdf')===-1){
            imageArry.push({Name:environment.apiCommon+'radianApi/media/' + data.FirstName + '_' + data.Email.split('@')[0] + '/Event/' + data.EventName.replace(/\s/g, "") + '/' +element,IsImage:'image'});
            if (this.CoverPicture === '') {
              this.CoverPicture = environment.apiCommon+'radianApi/media/' + data.FirstName + '_' + data.Email.split('@')[0] + '/Event/' + data.EventName.replace(/\s/g, "") + '/' +element
            }
          }else if(element.indexOf('youtu.be')===-1 && element.indexOf('youtube')===-1 && element.indexOf('pdf')!==-1){
            imageArry.push({Name:environment.apiCommon+'radianApi/media/' + data.FirstName + '_' + data.Email.split('@')[0] + '/Event/' + data.EventName.replace(/\s/g, "") + '/'+element,IsImage:'pdf'});
          } else {
            this.embedService.embed_image(element, { image: 'mqdefault' })
            .then(res => {
              imageArry.push({Name:this.embedService.embed(element),IsImage:'video',
              Image:res.link});
            });
          }
        });
    } else {
      
      if(data.EventImages.indexOf('youtu.be')===-1 && data.EventImages.indexOf('youtube')===-1
        && data.EventImages.indexOf('pdf')===-1){
          imageArry.push({Name:environment.apiCommon+'radianApi/media/' + data.FirstName + '_' + data.Email.split('@')[0] + '/Event/' + data.EventName +'/'+data,IsImage:'image'});
            if (this.CoverPicture === '') {
              this.CoverPicture = environment.apiCommon+'radianApi/media/' + data.FirstName + '_' + data.Email.split('@')[0] + '/Event/' + data.EventName + '/'+data
            }
        }else if(data.EventImages.indexOf('youtu.be')===-1 && data.EventImages.indexOf('youtube')===-1 
        && data.EventImages.indexOf('pdf')!==-1){
          imageArry.push({Name:environment.apiCommon+'radianApi/media/' + data.FirstName + '_' + data.Email.split('@')[0] + '/Event/' + data.EventName + '/' +data,IsImage:'pdf'});
        } else {
          this.embedService.embed_image(data.EventMedia, { image: 'mqdefault' })
            .then(res => {
              imageArry.push({Name:this.embedService.embed(data.EventMedia),IsImage:'video',
              Image:res.link});
            });
          // imageArry.push(element.PortfolioMedia);
         
        }

    }
    return imageArry;
  }
  likeRadianEvent(status, data) {
    this.radianLikeData.RadianType = 'Event';
    this.radianLikeData.RadianTypeId = data.EventId;
    this.radianLikeData.RadianTypeStatus = status;
    this.rdUserService.likeEvent(new RdLikeEventProfile(this.radianLikeData))
      .pipe(first())
      .subscribe(
        res => {
          // this.notificationService.success(res.message);
          this.GetEventDetail();
        },
        error => {
        });
  }
  getShareLink() {
    
    const data = this.notificationService.showLinkUrl()
    this.matDialog.open(RdUrlLinkBoxComponent, {
      width: '500px',
      data: { link: data }
    });
  }
  welcomeMessage() {
    this.notificationService.info('Please Join Us / Login to participate in event.');
  }
  addEventParticipation() {
    this.rdUserService.addEventParticipation(new RdGetEvent(this.routerData))
      .pipe(first())
      .subscribe(
        res => {
          if (res.status) {
            this.notificationService.success(res.message);
          } else {
            this.notificationService.warn(res.message);
          }
        });
  }
  openImageDialog(data, index) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.maxWidth = '756px';
    dialogConfig.maxHeight = '550px';
    dialogConfig.panelClass = 'image-popup',
      dialogConfig.data = { imageArray: data, imageActive: index }
    this.matDialog.open(PopupImageSliderComponent, dialogConfig);
  }
}

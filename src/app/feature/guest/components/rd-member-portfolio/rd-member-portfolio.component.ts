import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { EmbedVideoService } from 'ngx-embed-video';
import { NgxSpinnerService } from 'ngx-spinner';
import { first } from 'rxjs/operators';
import { PopupImageSliderComponent } from 'src/app/shared/components/popup-image-slider/popup-image-slider.component';
import { RdGetPortfolio } from 'src/app/shared/core/models/rd-common/rd-common';
import { RdAuthenticateService } from 'src/app/shared/services/authentication/rd-authenticate.service';
import { NotificationService } from 'src/app/shared/services/common/rd-notification/notification.service';
import { RdEncryptDecryptService } from 'src/app/shared/services/encrypt-decrypt/rd-encrypt-decrypt.service';
import { RdUserService } from 'src/app/shared/services/user/rd-user-service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-rd-member-portfolio',
  templateUrl: './rd-member-portfolio.component.html',
  styleUrls: ['./rd-member-portfolio.component.scss']
})
export class RdMemberPortfolioComponent implements OnInit {
  routerData:any=[];
  portfolioDetail:any=[];
  radianLikeData:any=[];
  config: AngularEditorConfig = {
    editable: false,
    spellcheck: false,
    height: 'auto',
    minHeight: 'auto',
    translate: 'no',
    defaultParagraphSeparator: 'p',
    defaultFontName: 'Open Sans',
    showToolbar:false
  };
  currentUser:any;
  UserLiked:String=''
  constructor(private embedService: EmbedVideoService, private route: ActivatedRoute,
    private rdUserService: RdUserService,private rdAuthenticateService: RdAuthenticateService,
    private _encryptDecryptService: RdEncryptDecryptService,private spinner:NgxSpinnerService,
    private notificationService : NotificationService,public matDialog: MatDialog) { 
    this.routerData.PortfolioId=this.route.snapshot.paramMap.get('id');
    this.currentUser = this.rdAuthenticateService.getLocalStorageData();
    this.routerData=this._encryptDecryptService.decryptModel(this.routerData);
  }

  ngOnInit(): void {
    this.GetPortfolioDetail();
  }

  GetPortfolioDetail(){
    this.spinner.show()
    this.rdUserService.getPortfolioDetail(new RdGetPortfolio(this.routerData))
    .pipe(first())
    .subscribe(
      res => {
        this.spinner.hide()
        res.data.forEach(element => {
          element.userPortfolioAttachment=element.userPortfolioAttachment === ''?[]:this.GetPortfolioImagePath(element);
        });
        this.portfolioDetail= res.data[0];
  
      },
      error => {
        this.spinner.hide()
      });
  }
  getVideo(url){
    return this.embedService.embed(url);
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
  // GetPortfolioImagePath(element){
  //   const imageArry=[];
  //   if(element.userPortfolioAttachment.split(',').length>1){
  //     element.userPortfolioAttachment.split(',')
  //     .forEach(data => {
  //       if(data.indexOf('youtu.be')===-1 && data.indexOf('youtube')===-1){
  //         imageArry.push(environment.apiCommon+'radianApi/media/'+element.userFirstName+'_'+element.userEmail.split('@')[0]+'/Portfolio/'+ element.userPortfolioName.toString()+'/'+data);
  //       } else {
  //         imageArry.push(data);
  //       }
        
  //     });
  //   } else {
  //     if(element.userPortfolioAttachment.indexOf('youtu.be')===-1 && element.userPortfolioAttachment.indexOf('youtube')===-1){
  //       imageArry.push(environment.apiCommon+'radianApi/media/'+element.userFirstName+'_'+element.userEmail+'/Portfolio/'+ element.userPortfolioName.toString()+'/'+element);
  //     } else {
  //       imageArry.push(element.userPortfolioAttachment);
  //     }
     
  //   }
  //   return imageArry;
  // }

  GetPortfolioImagePath(data: any) {
    const imageArry = [];
    if (data.userPortfolioAttachment.split(',').length > 1) {
      data.userPortfolioAttachment.split(',')
        .forEach(element => {
          if(element.indexOf('youtu.be')===-1 && element.indexOf('youtube')===-1 && element.indexOf('pdf')===-1
          && element.indexOf('pdf')===-1){
            imageArry.push({Name:environment.apiCommon+'radianApi/media/' + data.userFirstName + '_' + data.userEmail.split('@')[0]+ '/Portfolio/' + data.userPortfolioName + '/' +element,IsImage:'image'});
          }else if(element.indexOf('youtu.be')===-1 && element.indexOf('youtube')===-1 && element.indexOf('pdf')!==-1){
            imageArry.push({Name:environment.apiCommon+'radianApi/media/' + data.userFirstName + '_' + data.userEmail.split('@')[0] + '/Portfolio/' + data.userPortfolioName + '/'+element,IsImage:'pdf'});
          } else {
            this.embedService.embed_image(element, { image: 'mqdefault' })
            .then(res => {
              imageArry.push({Name:this.embedService.embed(element),IsImage:'video',
              Image:res.link});
            });
          }
        });
    } else {
      
      if(data.userPortfolioAttachment.indexOf('youtu.be')===-1 && data.userPortfolioAttachment.indexOf('youtube')===-1
        && data.userPortfolioAttachment.indexOf('pdf')===-1){
          imageArry.push({Name:environment.apiCommon+'radianApi/media/' + data.userFirstName + '_' + data.userEmail + '/Portfolio/' + data.userPortfolioName +'/'+data,IsImage:'image'});
        }else if(data.userPortfolioAttachment.indexOf('youtu.be')===-1 && data.userPortfolioAttachment.indexOf('youtube')===-1 
        && data.userPortfolioAttachment.indexOf('pdf')!==-1){
          imageArry.push({Name:environment.apiCommon+'radianApi/media/' + data.userFirstName + '_' + data.userEmail + '/Portfolio/' + data.userPortfolioName + '/' +data,IsImage:'pdf'});
        } else {
          this.embedService.embed_image(data.userPortfolioAttachment, { image: 'mqdefault' })
            .then(res => {
              imageArry.push({Name:this.embedService.embed(data.userPortfolioAttachment),IsImage:'video',
              Image:res.link});
            });
          // imageArry.push(element.PortfolioMedia);
         
        }

    }
    return imageArry;
  }

}

import { Component, OnInit } from '@angular/core';
import * as Rellax from 'rellax';
import { RdUserService } from 'src/app/shared/services/user/rd-user-service';
import { first } from 'rxjs/operators';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { PopupImageSliderComponent } from 'src/app/shared/components/popup-image-slider/popup-image-slider.component';
import { EmbedVideoService } from 'ngx-embed-video';
import { Router } from '@angular/router';
import { RdEncryptDecryptService } from 'src/app/shared/services/encrypt-decrypt/rd-encrypt-decrypt.service';
import { RdCommon } from 'src/app/shared/core/models/rd-common/rd-common';
import { RdAuthenticateService } from 'src/app/shared/services/authentication/rd-authenticate.service';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { RdDeleteConfirmationBoxComponent } from 'src/app/core/components/rd-delete-confirmation-box/rd-delete-confirmation-box.component';
import { NotificationService } from 'src/app/shared/services/common/rd-notification/notification.service';
import { environment } from 'src/environments/environment';
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';
import { NgxSpinnerService } from 'ngx-spinner';

// declare the javascript function here
declare function modifyPdf(filePath,PDFDocument,StandardFonts,rgb): any;

@Component({
  selector: 'app-rd-portfolio-list',
  templateUrl: './rd-portfolio-list.component.html',
  styleUrls: ['./rd-portfolio-list.component.scss']
})
export class RdPortfolioListComponent implements OnInit {
  userPortfolio: any;
  routerData:any=[];
  currentUser:any;
  projectFilePath:String='';
  projectPath:String='';
  config: AngularEditorConfig = {
    editable: false,
    spellcheck: false,
    height: 'auto',
    minHeight: 'auto',
    translate: 'no',
    defaultParagraphSeparator: 'p',
    defaultFontName: 'Open Sans',
    showToolbar:false,
    toolbarHiddenButtons: [
      ['bold', 'italic'],
      ['fontSize', 'insertImage','insertVideo','insertHorizontalRule',]
    ]
  };
  constructor(private rdUserService: RdUserService, public matDialog: MatDialog,
    private embedService: EmbedVideoService,private router: Router,
    private _encryptDecryptService: RdEncryptDecryptService,private spinner:NgxSpinnerService,
    private rdAuthenticateService: RdAuthenticateService) {
      
  }
  ngOnInit() {
    var body = document.getElementsByTagName('body')[0];
    body.classList.add('profile-page');
    var navbar = document.getElementsByTagName('nav')[0];
    navbar.classList.add('navbar-transparent');
    this.currentUser = this.rdAuthenticateService.getLocalStorageData();
    if(this.currentUser!==null){
      this.projectFilePath=this.currentUser.firstName+'_'+this.currentUser.username.split('@')[0]+'/Portfolio/'; 
      this.routerData.UserId = this.currentUser.id;
    }
    this.getUserPorfolio();
    
  }
  getUserPorfolio() {
    this.spinner.hide()
    this.rdUserService.getUserPorfolios(new RdCommon(this.routerData))
      .pipe(first())
      .subscribe(
        res => {
          this.spinner.hide()
          res.data.forEach(element => {
            element.PortfolioMedia= this.GetPortfolioImagePath(element);
          });
          this.projectPath=res.projectPath;
          this.userPortfolio = res.data;
        },
        error => {
          this.spinner.hide()
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
  openEdit(data:Number){
    this.router.navigate(['/member/portfolio_edit',this._encryptDecryptService.set(data)]);
  }
  GetPortfolioImagePath(element){
    const imageArry=[];
    if(element.PortfolioMedia!==''){
      if(element.PortfolioMedia.split(',').length>1){
        element.PortfolioMedia.split(',')
        .forEach(data => {
          
          if(data.indexOf('youtu.be')===-1 && data.indexOf('youtube')===-1 && data.indexOf('pdf')===-1){
            imageArry.push({Name:environment.apiCommon+'radianApi/media/'+this.projectFilePath+ element.PortfolioName.toString().replace(/\s/g, "")+'/'+data,IsImage:'image'});
          }else if(data.indexOf('youtu.be')===-1 && data.indexOf('youtube')===-1 && data.indexOf('pdf')!==-1){
            imageArry.push({Name:environment.apiCommon+'radianApi/media/'+this.projectFilePath+ element.PortfolioName.toString().replace(/\s/g, "")+'/'+data,IsImage:'pdf'});
          } else {
            this.embedService.embed_image(data, { image: 'mqdefault' })
            .then(res => {
              imageArry.push({Name:this.embedService.embed(data),IsImage:'video',Image:res.link});
            });
          }
        });
      } else {
        
        if(element.PortfolioMedia.indexOf('youtu.be')===-1 && element.PortfolioMedia.indexOf('youtube')===-1
        && element.PortfolioMedia.indexOf('pdf')===-1){
          imageArry.push({Name:environment.apiCommon+'radianApi/media/'+this.projectFilePath+ element.PortfolioName.toString().replace(/\s/g, "")+'/'+element.PortfolioMedia,IsImage:'image'});
        }else if(element.PortfolioMedia.indexOf('youtu.be')===-1 && element.PortfolioMedia.indexOf('youtube')===-1 
        && element.PortfolioMedia.indexOf('pdf')!==-1){
          imageArry.push({Name:environment.apiCommon+'radianApi/media/'+this.projectFilePath+ element.PortfolioName.toString().replace(/\s/g, "")+'/'+element.PortfolioMedia,IsImage:'pdf'});
        } else {
          this.embedService.embed_image(element.PortfolioMedia, { image: 'mqdefault' })
            .then(res => {
              imageArry.push({Name:this.embedService.embed(element.PortfolioMedia),IsImage:'video',
              Image:res.link});
            });
        }
       
      }
    }
    return imageArry;
  }
  DeletePortfolio(data){
    const dialogRef = this.matDialog.open(RdDeleteConfirmationBoxComponent, {
      width: '250px',
      data: {id: data.id, name: data.PortfolioName,type:'Portfolio'}
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result !=='Cancel'){
        this.getUserPorfolio();
      }
    });
  }

  downloadPdf(filePath){
    modifyPdf(filePath,PDFDocument,StandardFonts,rgb)
  }
  
  ngOnDestroy() {
    var body = document.getElementsByTagName('body')[0];
    body.classList.remove('profile-page');
    var navbar = document.getElementsByTagName('nav')[0];
    navbar.classList.remove('navbar-transparent');
  }

}

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
  styleUrls: ['./rd-portfolio-list.component.scss'],
  styles: [
		`
			i {
				position: relative;
				display: inline-block;
				font-size: 1.5rem;
				padding-right: 0.1rem;
				color: #d3d3d3;
			}

			.filled {
				color: red;
				overflow: hidden;
				position: absolute;
				top: 0;
				left: 0;
			}
		`,
	]
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
  responsiveOptions:any=[{
    breakpoint: "1024px",
    numVisible: 3,
    numScroll: 3,
  },
  {
    breakpoint: "768px",
    numVisible: 2,
    numScroll: 2,
  },
  {
    breakpoint: "560px",
    numVisible: 1,
    numScroll: 1,
  }];
  selectedPortfolio:any=null
  userPortfolioMedia:any=[];
  initialUserPortfolioMedia:any=[];
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
          // res.data.forEach(element => {
          //   element.PortfolioMedia= (element.PortfolioMedia!=='' && element.PortfolioMedia!==null)?this.GetPortfolioImagePath(element):'';
          // });
          this.projectPath=res.projectPath;
          this.userPortfolio = res.data;
          this.selectedPortfolio = res.data[0];
          this.initialUserPortfolioMedia = res.UserPortfolioMedia;
          res.UserPortfolioMedia = this.initialUserPortfolioMedia.filter(x=>x.userPortfolioId===this.selectedPortfolio .id);
          res.UserPortfolioMedia.forEach(element => {
            element.attachments= this.GetPortfolioImagePath(this.selectedPortfolio,element.userPortfolioAttachment)
          });
          this.userPortfolioMedia = res.UserPortfolioMedia;
          // console.log(res)
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
  GetPortfolioImagePath(selectedItem:any,data: any) {
    const imageArry = [];
    if(data.indexOf('youtu.be')===-1 && data.indexOf('youtube')===-1
        && data.indexOf('pdf')===-1){
          imageArry.push({Name:environment.apiCommon+'radianApi/media/' + this.projectFilePath+ selectedItem.PortfolioName.toString().replace(/\s/g, "")+'/'+data,IsImage:'image'});
        }else if(data.indexOf('youtu.be')===-1 && data.indexOf('youtube')===-1 
        && data.indexOf('pdf')!==-1){
          imageArry.push({Name:environment.apiCommon+'radianApi/media/' + this.projectFilePath+ selectedItem.PortfolioName.toString().replace(/\s/g, "")+'/'+data,IsImage:'pdf'});
        } else {
          this.embedService.embed_image(data, { image: 'mqdefault' })
            .then(res => {
              imageArry.push({Name:this.embedService.embed(data),IsImage:'video',
              Image:res.link});
            });
          // imageArry.push(element.PortfolioMedia);
         
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
  selectPortfolio(data:any){
    const xData = this.initialUserPortfolioMedia.filter(x=>x.userPortfolioId===data.id);
    xData.forEach(element => {
        element.attachments= this.GetPortfolioImagePath(data,element.userPortfolioAttachment)
    });
    this.userPortfolioMedia = xData;
  }
  ngOnDestroy() {
    var body = document.getElementsByTagName('body')[0];
    body.classList.remove('profile-page');
    var navbar = document.getElementsByTagName('nav')[0];
    navbar.classList.remove('navbar-transparent');
  }

}

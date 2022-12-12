import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { EmbedVideoService } from 'ngx-embed-video';
import { NgxSpinnerService } from 'ngx-spinner';
import { first } from 'rxjs/operators';
import { PopupImageSliderComponent } from 'src/app/shared/components/popup-image-slider/popup-image-slider.component';
import { ReviewRatingComponent } from 'src/app/shared/components/review-rating/review-rating.component';
import { RdGetPortfolio } from 'src/app/shared/core/models/rd-common/rd-common';
import { RdAuthenticateService } from 'src/app/shared/services/authentication/rd-authenticate.service';
import { NotificationService } from 'src/app/shared/services/common/rd-notification/notification.service';
import { RdEncryptDecryptService } from 'src/app/shared/services/encrypt-decrypt/rd-encrypt-decrypt.service';
import { RdUserService } from 'src/app/shared/services/user/rd-user-service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-rd-member-portfolio',
  templateUrl: './rd-member-portfolio.component.html',
  styleUrls: ['./rd-member-portfolio.component.scss'],
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
export class RdMemberPortfolioComponent implements OnInit {
  routerData:any=[];
  selectedPortfolio:any=[];
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
  UserLiked:String='';
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
  userPortfolioMedia:any=[];
  single = [
    {
      "name": "5 Star",
      "value": 49
    },
    {
      "name": "4 Star",
      "value": 10
    },
    {
      "name": "3 Star",
      "value": 30
    } ,
    {
      "name": "2 Star",
      "value": 11
    },
    {
      "name": "1 Star",
      "value": 0
    } 
  ];
  constructor(private embedService: EmbedVideoService, private route: ActivatedRoute,
    private rdUserService: RdUserService,private rdAuthenticateService: RdAuthenticateService,
    private _encryptDecryptService: RdEncryptDecryptService,private spinner:NgxSpinnerService,
    private notificationService : NotificationService,public matDialog: MatDialog) { 
    this.routerData.PortfolioId=this.route.snapshot.paramMap.get('id');
    this.currentUser = this.rdAuthenticateService.getLocalStorageData();
    this.routerData=this._encryptDecryptService.decryptModel(this.routerData);
  }

  ngOnInit(): void {
    // console.log(this.routerData)
    this.GetPortfolioDetail();
  }

  GetPortfolioDetail(){
    // this.spinner.show()
    this.rdUserService.getPortfolioDetail(new RdGetPortfolio(this.routerData))
    .pipe(first())
    .subscribe(
      res => {
      
        // this.spinner.hide()
        // res.data.forEach(element => {
        //   element.userPortfolioAttachment=element.userPortfolioAttachment === ''?[]:this.GetPortfolioImagePath(element);
        // });
        this.selectedPortfolio= res.data[0];
        res.UserPortfolioMedia.forEach(element => {
          element.attachments= this.GetPortfolioImagePath(this.selectedPortfolio,element.userPortfolioAttachment);
          element.userPortfolioRating = parseFloat(element.userPortfolioRating.toString()).toFixed(1).replace(/\.0+$/,'');
          element.userPortfolioRatingAverage = parseFloat(element.userPortfolioRatingAverage.toString()).toFixed(1).replace(/\.0+$/,'');
          element.userPortfolioIsRatingAllowed = parseInt(element.userPortfolioIsRatingAllowed)===1?true:false;
          
        });
        this.userPortfolioMedia = res.UserPortfolioMedia;
      },
      error => {
        this.spinner.hide()
      });
  }
  getVideo(url){
    return this.embedService.embed(url);
  }
  openImageDialog(index) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.maxWidth = '756px';
    dialogConfig.maxHeight = '550px';
    dialogConfig.panelClass = 'image-popup',
      dialogConfig.data = { imageArray: this.userPortfolioMedia.map(x=>x.attachments).flat(1), imageActive: index }
    this.matDialog.open(PopupImageSliderComponent, dialogConfig);
  }

  GetPortfolioImagePath(selectedItem:any,data: any) {
    const imageArry = [];
    if(data.indexOf('youtu.be')===-1 && data.indexOf('youtube')===-1
        && data.indexOf('pdf')===-1){
          imageArry.push({Name:environment.apiCommon+'radianApi/media/' + selectedItem.userFirstName + '_' + selectedItem.userEmail.split('@')[0] + '/Portfolio/' + selectedItem.userPortfolioName.replace(' ','') +'/'+data,IsImage:'image'});
        }else if(data.indexOf('youtu.be')===-1 && data.indexOf('youtube')===-1 
        && data.indexOf('pdf')!==-1){
          imageArry.push({Name:environment.apiCommon+'radianApi/media/' + selectedItem.userFirstName + '_' + selectedItem.userEmail.split('@')[0] + '/Portfolio/' + selectedItem.userPortfolioName.replace(' ','')  + '/' +data,IsImage:'pdf'});
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
  openRating(data){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.maxWidth = '756px';
    dialogConfig.maxHeight = '550px';
    dialogConfig.panelClass = 'rating-popup',
    dialogConfig.data = data
    this.matDialog.open(ReviewRatingComponent, dialogConfig);
  }

}

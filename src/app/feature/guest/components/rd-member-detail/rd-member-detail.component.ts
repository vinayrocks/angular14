import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { ActivatedRoute, Router } from '@angular/router';
import { RdUserService } from 'src/app/shared/services/user/rd-user-service';
import { first } from 'rxjs/operators';
import { RdGetProfile, RdLikeEventProfile } from 'src/app/shared/core/models/rd-common/rd-common';
import { RdEncryptDecryptService } from 'src/app/shared/services/encrypt-decrypt/rd-encrypt-decrypt.service';
import { RdAuthenticateService } from 'src/app/shared/services/authentication/rd-authenticate.service';
import { NotificationService } from 'src/app/shared/services/common/rd-notification/notification.service';
import { RdUrlLinkBoxComponent } from 'src/app/core/components/rd-url-link-box/rd-url-link-box.component';
import { environment } from 'src/environments/environment';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-rd-member-detail',
  templateUrl: './rd-member-detail.component.html',
  styleUrls: ['./rd-member-detail.component.scss']
})
export class RdMemberDetailComponent implements OnInit {
  routerData:any=[];
  memberDetail:any=[];
  radianLikeData:any=[];
  memberEvents:any=[];
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
  memberProfiles:any=[];
  constructor(private route: ActivatedRoute,private spinner:NgxSpinnerService,
    private rdUserService: RdUserService,private rdAuthenticateService: RdAuthenticateService,
    private _encryptDecryptService: RdEncryptDecryptService,public matDialog: MatDialog,
    private notificationService : NotificationService,private router: Router) { 
    this.routerData.ProfileId=this.route.snapshot.paramMap.get('id');
    this.currentUser = this.rdAuthenticateService.getLocalStorageData();
    this.routerData=this._encryptDecryptService.decryptModel(this.routerData);
    if(this.currentUser===null){
      this.radianLikeData.UserId='';
      this.routerData.UserId=0;
    } else {
      this.radianLikeData.UserId=this.currentUser.id;
      this.routerData.UserId=this.currentUser.id;
    }
   
  }
  ngOnInit(): void {
    this.GetProfileDetail()
  }
  GetProfileDetail(){
    this.spinner.show()
    this.rdUserService.getUserProfileDetail(new RdGetProfile(this.routerData))
    .pipe(first())
    .subscribe(
      res => {
        this.spinner.hide()
        res.data.forEach(element => {
          element.ContactDetails=element.ContactDetails === ''?[]:JSON.parse(element.ContactDetails);
          element.ProfileAddress=element.ProfileAddress === ''?[]:JSON.parse(element.ProfileAddress);
          element.ProfileExpertise=element.ProfileExpertise === ''?[]: JSON.parse(element.ProfileExpertise);
          element.ProfilePortfolio=element.ProfilePortfolio === ''?[]:JSON.parse(element.ProfilePortfolio);
          element.ProfileSkills=element.ProfileSkills === ''?[]:JSON.parse(element.ProfileSkills);
          element.ProfilePicture=this.getProfilefilePath(element);
          element.CoverPicture=this.getCoverfilePath(element);
        });
        this.memberDetail= res.data[0];
        this.UserLiked=res.UserLiked;
        res.Events.forEach(eventItem => {
          eventItem.EventCategories = JSON.parse(eventItem.EventCategories).filter(x=>x.name);
          eventItem.EventSkill = JSON.parse(eventItem.EventSkill);
        })
        this.memberEvents = res.Events;
        this.memberProfiles = res.Profiles;
  
      },
      error => {
        this.spinner.hide()
      });
  }

  getProfilefilePath(data:any){
    if(data.ProfilePicture !=null){
      return environment.apiCommon+'radianApi/media/'+data.FirstName+'_'+data.Email.split('@')[0]+'/Profile/'+data.ProfileName+'/ProfileImages/'+data.ProfilePicture;
    } else {
      return 'assets/img/default-avatar.png';
    }
    
  }
  getCoverfilePath(data:any){
    if(data.CoverPicture!=null){
      return environment.apiCommon+'radianApi/media/'+data.FirstName+'_'+data.Email.split('@')[0]+'/Profile/'+data.ProfileName+'/CoverImages/'+data.CoverPicture;
    } else {
      return 'assets/img/default-cover-picture.jpg';
    }
  }
  likeRadianEvent(status,data){
    this.radianLikeData.RadianType ='Profile';
    this.radianLikeData.RadianTypeId =data.ProfileId;
    this.radianLikeData.RadianTypeStatus =status;
    this.rdUserService.likeEvent(new RdLikeEventProfile(this.radianLikeData))
    .pipe(first())
    .subscribe(
      res => {
        this.notificationService.success(res.message);
        this.GetProfileDetail();
      },
      error => {
      });
  }

  getShareLink(){
    const data=  this.notificationService.showLinkUrl()
    this.matDialog.open(RdUrlLinkBoxComponent, {
      width: '500px',
      data: {link: data}
    });
  }
  getPortfolioDetail() {
    this.router.navigate(['/portfolio-detail', this._encryptDecryptService.set(this.memberDetail.ProfilePortfolio.id)]);
  }
  getItemDetail(itemData){
    this.router.navigate(['/detail', this._encryptDecryptService.set(itemData.EventId)]);
  }
  getProfileItemDetail(itemData){
    this.router.navigate(['/member-detail', this._encryptDecryptService.set(itemData.ProfileId)]);
    this.routerData.ProfileId=itemData.ProfileId;
    this.GetProfileDetail();
  }
}

import { Component, OnInit, Inject } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { AngularEditorConfig } from "@kolkov/angular-editor";
import { ActivatedRoute, Router } from "@angular/router";
import { RdUserService } from "src/app/shared/services/user/rd-user-service";
import { first } from "rxjs/operators";
import {
  ConnectProfile,
  RdGetProfile,
  RdLikeEventProfile,
} from "src/app/shared/core/models/rd-common/rd-common";
import { RdEncryptDecryptService } from "src/app/shared/services/encrypt-decrypt/rd-encrypt-decrypt.service";
import { RdAuthenticateService } from "src/app/shared/services/authentication/rd-authenticate.service";
import { NotificationService } from "src/app/shared/services/common/rd-notification/notification.service";
import { RdUrlLinkBoxComponent } from "src/app/core/components/rd-url-link-box/rd-url-link-box.component";
import { environment } from "src/environments/environment";
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: "app-rd-member-detail",
  templateUrl: "./rd-member-detail.component.html",
  styleUrls: ["./rd-member-detail.component.scss"],
})
export class RdMemberDetailComponent implements OnInit {
  routerData: any = [];
  memberDetail: any = [];
  radianLikeData: any = [];
  memberEvents: any = [];
  sendConnectionModel: any = {};
  config: AngularEditorConfig = {
    editable: false,
    spellcheck: false,
    height: "auto",
    minHeight: "auto",
    translate: "no",
    defaultParagraphSeparator: "p",
    defaultFontName: "Open Sans",
    showToolbar: false,
  };
  currentUser: any;
  UserLiked: String = "";
  memberProfiles: any = [];
  _istab: number = 1;
  responsiveOptions: any = [
    {
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
    },
  ];
  Connections: any = null;
  constructor(
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService,
    private rdUserService: RdUserService,
    private rdAuthenticateService: RdAuthenticateService,
    private _encryptDecryptService: RdEncryptDecryptService,
    public matDialog: MatDialog,
    private notificationService: NotificationService,
    private router: Router
  ) {
    this.routerData.ProfileId = this.route.snapshot.paramMap.get("id");
    this.currentUser = this.rdAuthenticateService.getLocalStorageData();
    this.routerData = this._encryptDecryptService.decryptModel(this.routerData);
    if (this.currentUser === null) {
      this.radianLikeData.UserId = "";
      this.routerData.UserId = 0;
    } else {
      this.radianLikeData.UserId = this.currentUser.id;
      this.routerData.UserId = this.currentUser.id;
    }
    // console.log(this.routerData.UserId);
  }
  ngOnInit(): void {
    this.GetProfileDetail();
  }
  GetProfileDetail() {
    this.spinner.show();
    this.rdUserService
      .getUserProfileDetail(new RdGetProfile(this.routerData))
      .pipe(first())
      .subscribe(
        (res) => {
          // console.log(res);
          this.memberEvents = res.Events;
          this.memberProfiles = res.Profiles;
          this.memberDetail = res.data[0];
          if (this.memberDetail.isCurrentLoggedInUserConnected !== null) {
            this.memberDetail.isCurrentLoggedInUserConnected = parseInt(
              this.memberDetail.isCurrentLoggedInUserConnected
            );
          }
          if (this.memberDetail.isCurrentLoggedInReceiver !== null) {
            this.memberDetail.isCurrentLoggedInReceiver = parseInt(
              this.memberDetail.isCurrentLoggedInReceiver
            );
          }
          this.memberDetail.UserLoginId = parseInt(
            this.memberDetail.UserLoginId
          );

          this.memberDetail.ContactDetails =
            this.memberDetail.ContactDetails === ""
              ? []
              : JSON.parse(this.memberDetail.ContactDetails);
          this.memberDetail.ProfileAddress =
            this.memberDetail.ProfileAddress === ""
              ? []
              : JSON.parse(this.memberDetail.ProfileAddress);
          this.memberDetail.ProfileExpertise =
            this.memberDetail.ProfileExpertise === ""
              ? []
              : JSON.parse(this.memberDetail.ProfileExpertise);
          this.memberDetail.ProfilePortfolio =
            this.memberDetail.ProfilePortfolio === ""
              ? []
              : JSON.parse(this.memberDetail.ProfilePortfolio);
          this.memberDetail.ProfileSkills =
            this.memberDetail.ProfileSkills === ""
              ? []
              : JSON.parse(this.memberDetail.ProfileSkills);
          this.memberDetail.ProfilePicture = this.getProfilefilePath(
            this.memberDetail
          );
          this.memberDetail.CoverPicture = this.getCoverfilePath(
            this.memberDetail
          );
          this.UserLiked = res.data[0].LikeCount;
          this.memberDetail = res.data[0];
          this.memberDetail.CertificationDetails =
            this.memberDetail.CertificationDetails !== ""
              ? JSON.parse(this.memberDetail.CertificationDetails)
              : [];
          this.memberDetail.EducationDetails =
            this.memberDetail.EducationDetails !== ""
              ? JSON.parse(this.memberDetail.EducationDetails)
              : [];
          this.memberDetail.ExperienceDetails =
            this.memberDetail.ExperienceDetails !== ""
              ? JSON.parse(this.memberDetail.ExperienceDetails)
              : [];
          if (res.Connections !== null) {
            res.Connections.map(
              (x: any) => (x.ConnectionStatus = parseInt(x.ConnectionStatus))
            );
            res.Connections.map(
              (x: any) =>
                (x.ConnectionReceiverId = parseInt(x.ConnectionReceiverId))
            );
            res.Connections.map(
              (x: any) =>
                (x.ConnectionSenderId = parseInt(x.ConnectionSenderId))
            );
            res.Connections.map(
              (x: any) => (x.ConnectionId = parseInt(x.ConnectionId))
            );
            this.Connections = res.Connections;
          }

          this.spinner.hide();
        },
        (error) => {
          this.spinner.hide();
        }
      );
  }

  getProfilefilePath(data: any) {
    if (data.ProfilePicture != null) {
      return (
        environment.apiCommon +
        "radianApi/media/" +
        data.FirstName +
        "_" +
        data.Email.split("@")[0] +
        "/Profile/" +
        data.ProfileName.replace(" ", "") +
        "/ProfileImages/" +
        data.ProfilePicture
      );
    } else {
      return "assets/img/default-avatar.png";
    }
  }
  getCoverfilePath(data: any) {
    if (data.CoverPicture != null) {
      return (
        environment.apiCommon +
        "radianApi/media/" +
        data.FirstName +
        "_" +
        data.Email.split("@")[0] +
        "/Profile/" +
        data.ProfileName.replace(" ", "") +
        "/CoverImages/" +
        data.CoverPicture
      );
    } else {
      return "assets/img/default-cover-picture.jpg";
    }
  }
  likeRadianEvent(status, data) {
    this.radianLikeData.RadianType = "Profile";
    this.radianLikeData.RadianTypeId = data.ProfileId;
    this.radianLikeData.RadianTypeStatus = status;
    this.rdUserService
      .likeEvent(new RdLikeEventProfile(this.radianLikeData))
      .pipe(first())
      .subscribe(
        (res) => {
          this.notificationService.success(res.message);
          this.GetProfileDetail();
        },
        (error) => {}
      );
  }

  getShareLink() {
    const data = this.notificationService.showLinkUrl();
    this.matDialog.open(RdUrlLinkBoxComponent, {
      width: "500px",
      data: { link: data },
    });
  }
  getPortfolioDetail() {
    this.router.navigate([
      "/portfolio-detail",
      this._encryptDecryptService.set(this.memberDetail.ProfilePortfolio.id),
    ]);
  }
  getItemDetail(itemData) {
    this.router.navigate([
      "/detail",
      this._encryptDecryptService.set(itemData.EventId),
    ]);
  }
  getProfileItemDetail(itemData) {
    this.router.navigate([
      "/member-detail",
      this._encryptDecryptService.set(itemData.ProfileId),
    ]);
    this.routerData.ProfileId = itemData.ProfileId;
    this.GetProfileDetail();
  }
  redirectToPortfolio(element) {
    this.router.navigate([
      "/portfolio-detail",
      this._encryptDecryptService.set(element.id),
    ]);
  }
  sendConnectionRequest() {
    this.sendConnectionModel.ConnectionStatus = 0;
    this.sendConnectionModel.ConnectionReceiverId = parseInt(
      this.memberDetail.UserLoginId
    );
    this.sendConnectionModel.ConnectionSenderId = this.currentUser.id;
    // console.log(this.sendConnectionModel);
    this.rdUserService
      .sendConnectionRequest(new ConnectProfile(this.sendConnectionModel))
      .pipe(first())
      .subscribe(
        (res) => {
          this.notificationService.success(res.message);
          this.GetProfileDetail();
        },
        (error) => {}
      );
  }
  SendRequest(item: any) {
    const dxData = new ConnectProfile(ConnectProfile);
    dxData.ConnectionReceiverId = parseInt(item.UserLoginId);
    dxData.ConnectionSenderId = this.currentUser.id;
    dxData.ConnectionStatus = 0;
    this.rdUserService
      .sendConnectionRequest(dxData)
      .pipe(first())
      .subscribe(
        (res) => {
          this.notificationService.success(res.message);
          this.GetProfileDetail();
        },
        (error) => {}
      );
  }
}

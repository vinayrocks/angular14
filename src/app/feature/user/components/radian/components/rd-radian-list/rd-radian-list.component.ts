import { Component, OnInit } from "@angular/core";
import * as Rellax from "rellax";
import * as skillsInterest from "src/app/shared/core/json-data/skillsInterest.json";
import { RdUserService } from "src/app/shared/services/user/rd-user-service";
import { first } from "rxjs/operators";
import { Router } from "@angular/router";
import { RdEncryptDecryptService } from "src/app/shared/services/encrypt-decrypt/rd-encrypt-decrypt.service";
import { NotificationService } from "src/app/shared/services/common/rd-notification/notification.service";
import { RdCommon } from "src/app/shared/core/models/rd-common/rd-common";
import { RdAuthenticateService } from "src/app/shared/services/authentication/rd-authenticate.service";
import { AngularEditorConfig } from "@kolkov/angular-editor";
import { MatDialog } from "@angular/material/dialog";
import { RdDeleteConfirmationBoxComponent } from "src/app/core/components/rd-delete-confirmation-box/rd-delete-confirmation-box.component";
import { NgxSpinnerService } from "ngx-spinner";
import { trigger, style, animate, transition } from "@angular/animations";
@Component({
  selector: "app-rd-radian-list",
  animations: [
    trigger("enterAnimation", [
      transition(":enter", [
        style({ transform: "translateX(100%)", opacity: 0 }),
        animate("500ms", style({ transform: "translateX(0)", opacity: 1 })),
      ]),
      transition(":leave", [
        style({ transform: "translateX(0)", opacity: 1 }),
        animate("500ms", style({ transform: "translateX(100%)", opacity: 0 })),
      ]),
    ]),
  ],
  templateUrl: "./rd-radian-list.component.html",
  styleUrls: ["./rd-radian-list.component.scss"],
})
export class RdRadianListComponent implements OnInit {
  userProfiles: any = [];
  skills: any;
  userPortfolio: any;
  routerData: any = [];
  projectFilePath: String = "";
  projectPath: String = "";
  profileImagePath: string;
  coverImagePath: string;
  currentUser: any;
  selectedUser: any = [];
  config: AngularEditorConfig = {
    editable: false,
    spellcheck: false,
    height: "auto",
    minHeight: "auto",
    translate: "no",
    defaultParagraphSeparator: "p",
    defaultFontName: "Open Sans",
    showToolbar: false,
    toolbarHiddenButtons: [
      ["bold", "italic"],
      ["fontSize", "insertImage", "insertVideo", "insertHorizontalRule"],
    ],
  };
  responsiveOptions: any = [];
  _istab:number=1;
  constructor(
    private rdUserService: RdUserService,
    private router: Router,
    private _encryptDecryptService: RdEncryptDecryptService,
    private spinner: NgxSpinnerService,
    public matDialog: MatDialog,
    private rdAuthenticateService: RdAuthenticateService
  ) {
    this.skills = (skillsInterest as any).default;

    this.currentUser = this.rdAuthenticateService.getLocalStorageData();
    if (this.currentUser !== null) {
      this.projectFilePath =
        this.currentUser.firstName +
        "_" +
        this.currentUser.username.split("@")[0] +
        "/Profile";
      this.routerData.UserId = this.currentUser.id;
    }
    this.responsiveOptions = [
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
  }
  ngOnInit() {
    var body = document.getElementsByTagName("body")[0];
    body.classList.add("profile-page");
    var navbar = document.getElementsByTagName("nav")[0];
    navbar.classList.add("navbar-transparent");
    this.getUserProfiles();

    if (this.currentUser !== null) {
      this.profileImagePath = this.GetProfilePath();
      this.coverImagePath = this.GetCoverPicture();
    }
  }

  GetProfilePath() {
    return (
      "http://itechprovisions.com/radianApi/media/" +
      this.currentUser.firstName +
      "_" +
      this.currentUser.username.split("@")[0] +
      "/Profile/" +
      this.currentUser.ProfileName +
      "/ProfileImages/" +
      this.currentUser.ProfilePicture
    );
  }
  GetCoverPicture() {
    return (
      "http://itechprovisions.com/radianApi/media/" +
      this.currentUser.firstName +
      "_" +
      this.currentUser.username.split("@")[0] +
      "/Profile/" +
      this.currentUser.ProfileName +
      "/CoverImages/" +
      this.currentUser.CoverPicture
    );
  }

  getUserProfiles() {
    this.spinner.show();
    this.userProfiles = [];
    this.rdUserService
      .getUserProfiles(new RdCommon(this.routerData))
      .pipe(first())
      .subscribe(
        (res) => {
          res.data.forEach((element) => {
            element.ProfileExpertise =
              element.ProfileExpertise === ""
                ? []
                : JSON.parse(element.ProfileExpertise);
            element.ProfileSkill =
              element.ProfileSkill === ""
                ? []
                : JSON.parse(element.ProfileSkill);
            element.LinkedPortfolio =
              element.LinkedPortfolio === ""
                ? []
                : JSON.parse(element.LinkedPortfolio);
          });
          this.userProfiles = res.data;
          this.selectedUser = res.data[0];
          this.projectPath = res.projectPath;
          this.spinner.hide();
          console.log(this.selectedUser);
        },
        (error) => {
          this.spinner.hide();
        }
      );
  }
  openEdit(data: Number) {
    this.router.navigate([
      "/member/hunar_edit",
      this._encryptDecryptService.set(data),
    ]);
  }
  DeleteProfile(data) {
    const dialogRef = this.matDialog.open(RdDeleteConfirmationBoxComponent, {
      width: "250px",
      data: { id: data.id, name: data.PortfolioName, type: "Profile" },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result !== "Cancel") {
        this.getUserProfiles();
      }
    });
  }
  selectProfile(product){
    this.selectedUser=product;
    this.selectedUser.CertificationDetails = JSON.parse(this.selectedUser.CertificationDetails);
    this.selectedUser.EducationDetails = JSON.parse(this.selectedUser.EducationDetails);
    this.selectedUser.ExperienceDetails = JSON.parse(this.selectedUser.ExperienceDetails);
    console.log(this.selectedUser);
  }
  ngOnDestroy() {
    var body = document.getElementsByTagName("body")[0];
    body.classList.remove("profile-page");
    var navbar = document.getElementsByTagName("nav")[0];
    navbar.classList.remove("navbar-transparent");
  }
  
}

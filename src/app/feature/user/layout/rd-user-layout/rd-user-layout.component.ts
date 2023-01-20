import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, NavigationEnd, Router } from "@angular/router";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ImageCroppedEvent } from "ngx-image-cropper";
import { NgxSpinnerService } from "ngx-spinner";
import { first, map, take } from "rxjs/operators";
import { RdAuthenticateService } from "src/app/shared/services/authentication/rd-authenticate.service";
import { RdUserService } from "src/app/shared/services/user/rd-user-service";

@Component({
  selector: "app-rd-user-layout",
  templateUrl: "./rd-user-layout.component.html",
  styleUrls: ["./rd-user-layout.component.scss"],
})
export class RdUserLayoutComponent implements OnInit {
  currentUser: any = [];
  currentUrl: any;
  profileImagePath: string;
  coverImagePath: string;
  pageLabel: string = "";
  defaultImagePath: string = "../../../../assets/img/radian/userAvatar.png";
  defaultCoverPath: string = "../../../../assets/img/default-cover-picture.png";
  ProfileSkill: string = "";
  imageChangedEvent: any = "";
  croppedImage: any = "";
  isUploaded: Boolean = false;
  serverFile: any = [];
  activatedUrl: string = "";
  constructor(
    private rdAuthenticateService: RdAuthenticateService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private modalService: NgbModal,
    private rdUserService: RdUserService,
    private spinner: NgxSpinnerService
  ) {
    this.currentUser = this.rdAuthenticateService.getLocalStorageData();
    this.ProfileSkill = JSON.parse(this.currentUser.ProfileSkillName).name;
    router.events.subscribe((val: any) => {
      if (val instanceof NavigationEnd) {
        this.activatedUrl = this.router.url.toString();
      }
      this.checkCurrentRoute();
    });
  }

  ngOnInit(): void {
    if (this.currentUser !== null) {
      this.profileImagePath = this.GetProfilePath();
      this.coverImagePath = this.GetCoverPicture();
    }
  }
  openProfilePopup(content: any) {
    this.modalService.open(content, { centered: true, size: "lg" });
  }
  fileChangeEvent(event: any, content: any): void {
    this.imageChangedEvent = event;
    this.isUploaded = true;
  }
  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
  }
  openCoverPopup(content: any) {
    this.modalService.open(content, { centered: true, size: "lg" });
  }
  CoverFileChangeEvent(event: any): void {
    if (event.target.files && event.target.files[0]) {
      var filesAmount = event.target.files.length;
      for (let i = 0; i < filesAmount; i++) {
        this.serverFile.push(event.target.files[i]);
      }
    }
  }
  checkCurrentRoute() {
    this.currentUser = this.rdAuthenticateService.getLocalStorageData();
    if (this.currentUser !== null) {
      if (this.currentUser.isPortfolio) {
        this.activatedRoute.children[0].data.subscribe((data) => {
          this.pageLabel = data.name;
        });
      } else {
        this.activatedRoute.children[0].data.subscribe((data) => {
          this.pageLabel = data.name;
        });
        this.router.navigate(["/member/portfolio_add"]);
      }
    }
  }
  close(modal: any) {
    modal.dismiss("Cross click");
    this.croppedImage = "";
  }
  closeCover(modal: any) {
    modal.dismiss("Cross click");
  }
  GetProfilePath() {
    if (this.currentUser.ProfilePicture === null) {
      return this.defaultImagePath;
    } else {
      return (
        "http://itechprovisions.com/radianApi/media/" +
        this.currentUser.firstName +
        "_" +
        this.currentUser.username.split("@")[0] +
        "/Profile/" +
        this.currentUser.ProfileName.replace(" ", "") +
        "/ProfileImages/" +
        this.currentUser.ProfilePicture
      );
    }
  }
  GetCoverPicture() {
    if (this.currentUser.CoverPicture === null) {
      return this.defaultCoverPath;
    } else {
      return (
        "http://itechprovisions.com/radianApi/media/" +
        this.currentUser.firstName +
        "_" +
        this.currentUser.username.split("@")[0] +
        "/Profile/" +
        this.currentUser.ProfileName.replace(" ", "") +
        "/CoverImages/" +
        this.currentUser.CoverPicture
      );
    }
  }
  updateProfileImage() {
    this.spinner.show();
    this.rdUserService
      .UploadUserRadianProfileImage(
        this.croppedImage,
        this.serverFile,
        this.currentUser.ProfileName
      )
      .pipe(first())
      .subscribe(
        (res) => {
          this.serverFile = [];
          this.currentUser.ProfilePicture =
            res.data.ProfilePicture === null
              ? this.currentUser.ProfilePicture
              : res.data.ProfilePicture;
          this.currentUser.CoverPicture =
            res.data.CoverPicture === null
              ? this.currentUser.CoverPicture
              : res.data.CoverPicture;
          this.rdAuthenticateService.setLocalStorageData(this.currentUser);
          this.currentUser = this.rdAuthenticateService.getLocalStorageData();

          this.profileImagePath = this.GetProfilePath();
          this.coverImagePath = this.GetCoverPicture();

          this.modalService.dismissAll();
          this.croppedImage = "";
          this.spinner.hide();
        },
        (error) => {
          this.spinner.hide();
        }
      );
  }
  updateCoverImage() {}
}

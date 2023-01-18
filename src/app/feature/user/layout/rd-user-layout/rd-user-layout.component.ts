import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, NavigationEnd, Router } from "@angular/router";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ImageCroppedEvent } from "ngx-image-cropper";
import { map, take } from "rxjs/operators";
import { RdAuthenticateService } from "src/app/shared/services/authentication/rd-authenticate.service";

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
  ProfileSkill: string = "";
  imageChangedEvent: any = "";
  croppedImage: any = "";
  isUploaded: Boolean = false;
  serverFile: any = [];
  constructor(
    private rdAuthenticateService: RdAuthenticateService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private modalService: NgbModal
  ) {
    this.currentUser = this.rdAuthenticateService.getLocalStorageData();
    this.ProfileSkill = JSON.parse(this.currentUser.ProfileSkillName).name;
    router.events.subscribe((val) => {
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
}

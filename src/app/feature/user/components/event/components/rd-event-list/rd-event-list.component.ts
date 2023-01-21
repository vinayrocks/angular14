import { Component, OnInit } from "@angular/core";
import * as Rellax from "rellax";
import { RdUserService } from "src/app/shared/services/user/rd-user-service";
import { first } from "rxjs/operators";
import { PopupImageSliderComponent } from "src/app/shared/components/popup-image-slider/popup-image-slider.component";
import { MatDialogConfig, MatDialog } from "@angular/material/dialog";
import { EmbedVideoService } from "ngx-embed-video";
import { ActivatedRoute, Router } from "@angular/router";
import { RdEncryptDecryptService } from "src/app/shared/services/encrypt-decrypt/rd-encrypt-decrypt.service";
import {
  RdCommon,
  RdEventIntUser,
} from "src/app/shared/core/models/rd-common/rd-common";
import { RdAuthenticateService } from "src/app/shared/services/authentication/rd-authenticate.service";
import { AngularEditorConfig } from "@kolkov/angular-editor";
import { RdDeleteConfirmationBoxComponent } from "src/app/core/components/rd-delete-confirmation-box/rd-delete-confirmation-box.component";
import { NotificationService } from "src/app/shared/services/common/rd-notification/notification.service";
import { RdUserListBoxComponent } from "src/app/core/components/rd-user-list-box/rd-user-list-box.component";
import { environment } from "src/environments/environment";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import { NgxSpinnerService } from "ngx-spinner";
import { animate, style, transition, trigger } from "@angular/animations";

// declare the javascript function here
declare function modifyPdf(filePath, PDFDocument, StandardFonts, rgb): any;

@Component({
  selector: "app-rd-event-list",
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
  templateUrl: "./rd-event-list.component.html",
  styleUrls: ["./rd-event-list.component.scss"],
})
export class RdEventListComponent implements OnInit {
  userEvents: any = [];
  routerData: any = [];
  projectFilePath: String = "";
  projectPath: String = "";
  currentUser: any;
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
  selectedEvent: any = [];
  getEventUserParameter: any = [];
  userList: any = [];
  eventImagePath: string = "";
  constructor(
    private rdUserService: RdUserService,
    public matDialog: MatDialog,
    private activatedRoute: ActivatedRoute,
    private embedService: EmbedVideoService,
    private router: Router,
    private _encryptDecryptService: RdEncryptDecryptService,
    private rdAuthenticateService: RdAuthenticateService,
    private spinner: NgxSpinnerService
  ) {
    //
    this.currentUser = this.rdAuthenticateService.getLocalStorageData();
    if (this.currentUser !== null) {
      this.projectFilePath =
        this.currentUser.firstName +
        "_" +
        this.currentUser.username.split("@")[0] +
        "/Event/";
      this.routerData.UserId = this.currentUser.id;
    }
  }
  ngOnInit() {
    var rellaxHeader = new Rellax(".rellax-header");

    var body = document.getElementsByTagName("body")[0];
    body.classList.add("profile-page");
    var navbar = document.getElementsByTagName("nav")[0];
    navbar.classList.add("navbar-transparent");
    this.getUserEvents();
  }
  getUserEvents() {
    this.spinner.hide();
    this.rdUserService
      .getUserEvents(new RdCommon(this.routerData))
      .pipe(first())
      .subscribe(
        (res) => {
          this.spinner.hide();
          if (res !== "") {
            res.data.forEach((element) => {
              element.EventStatus = element.EventStatus === "1" ? true : false;
              element.EventSkill =
                element.EventSkill === "" ? [] : JSON.parse(element.EventSkill);
              element.EventCategory =
                element.EventCategory === ""
                  ? []
                  : JSON.parse(element.EventCategory);
              element.EventMedia =
                element.EventMedia === "" || element.EventMedia.length === 0
                  ? []
                  : this.GetEventImagePath(element);
              element.EventLocation =
                element.EventLocation === ""
                  ? []
                  : JSON.parse(element.EventLocation);
            });
            this.projectPath = res.projectPath;
            this.userEvents = res.data;
            this.selectedEvent = res.data[0];
            this.GetUserList(res.data[0]);
            this.eventImagePath =
              this.selectedEvent.EventMedia.length > 0
                ? this.selectedEvent.EventMedia[0].Name
                : "";
          }
        },
        (error) => {
          // ();
        }
      );
  }
  openImageDialog(data, index) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.maxWidth = "756px";
    dialogConfig.maxHeight = "550px";
    (dialogConfig.panelClass = "image-popup"),
      (dialogConfig.data = { imageArray: data, imageActive: index });
    this.matDialog.open(PopupImageSliderComponent, dialogConfig);
  }

  getVideo(url) {
    return this.embedService.embed(url);
  }
  openEdit(data: Number) {
    this.router.navigate([
      "/member/event_edit",
      this._encryptDecryptService.set(data),
    ]);
  }
  GetEventImagePath(element) {
    const imageArry = [];
    if (element.EventMedia !== "") {
      if (element.EventMedia.split(",").length > 1) {
        element.EventMedia.split(",").forEach((data) => {
          if (
            data.indexOf("youtu.be") === -1 &&
            data.indexOf("youtube") === -1 &&
            data.indexOf("pdf") === -1
          ) {
            imageArry.push({
              Name:
                environment.apiCommon +
                "radianApi/media/" +
                this.projectFilePath +
                element.EventName.toString().replace(/\s/g, "") +
                "/" +
                data,
              IsImage: "image",
            });
          } else if (
            data.indexOf("youtu.be") === -1 &&
            data.indexOf("youtube") === -1 &&
            data.indexOf("pdf") !== -1
          ) {
            imageArry.push({
              Name:
                environment.apiCommon +
                "radianApi/media/" +
                this.projectFilePath +
                element.EventName.toString().replace(/\s/g, "") +
                "/" +
                data,
              IsImage: "pdf",
            });
          } else {
            this.embedService
              .embed_image(data, { image: "mqdefault" })
              .then((res) => {
                imageArry.push({
                  Name: this.embedService.embed(data),
                  IsImage: "video",
                  Image: res.link,
                });
              });
          }
        });
      } else {
        if (
          element.EventMedia.indexOf("youtu.be") === -1 &&
          element.EventMedia.indexOf("youtube") === -1 &&
          element.EventMedia.indexOf("pdf") === -1
        ) {
          imageArry.push({
            Name:
              environment.apiCommon +
              "radianApi/media/" +
              this.projectFilePath +
              element.EventName.toString().replace(/\s/g, "") +
              "/" +
              element.EventMedia,
            IsImage: "image",
          });
        } else if (
          element.EventMedia.indexOf("youtu.be") === -1 &&
          element.EventMedia.indexOf("youtube") === -1 &&
          element.EventMedia.indexOf("pdf") !== -1
        ) {
          imageArry.push({
            Name:
              environment.apiCommon +
              "radianApi/media/" +
              this.projectFilePath +
              element.EventName.toString().replace(/\s/g, "") +
              "/" +
              element.EventMedia,
            IsImage: "pdf",
          });
        } else {
          this.embedService
            .embed_image(element.EventMedia, { image: "mqdefault" })
            .then((res) => {
              imageArry.push({
                Name: this.embedService.embed(element.EventMedia),
                IsImage: "video",
                Image: res.link,
              });
            });
        }
      }
    }
    return imageArry;
  }
  DeleteEvent(data) {
    const dialogRef = this.matDialog.open(RdDeleteConfirmationBoxComponent, {
      width: "250px",
      data: { id: data.id, name: data.EventName, type: "Event" },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result !== "Cancel") {
        this.getUserEvents();
      }
    });
  }
  OpenUserList(data) {
    const dialogRef = this.matDialog.open(RdUserListBoxComponent, {
      width: "700px",
      height: "auto",
      data: { id: data },
    });
  }
  downloadPdf(filePath) {
    modifyPdf(filePath, PDFDocument, StandardFonts, rgb);
  }
  GetUserList(data) {
    this.selectedEvent = data;
    this.getEventUserParameter.EventId = data.id;
    this.rdUserService
      .getEventInterestedUserList(
        new RdEventIntUser(this.getEventUserParameter)
      )
      .pipe(first())
      .subscribe(
        (res) => {
          if (res.status) {
            res.data.forEach((element) => {
              element.userContactDetail = JSON.parse(element.userContactDetail);
            });
            this.userList = res.data;
          }
        },
        (error) => {}
      );
    this.eventImagePath =
      this.selectedEvent.EventMedia.length > 0
        ? this.selectedEvent.EventMedia[0].Name
        : "";
  }
  ngOnDestroy() {
    var body = document.getElementsByTagName("body")[0];
    body.classList.remove("profile-page");
    var navbar = document.getElementsByTagName("nav")[0];
    navbar.classList.remove("navbar-transparent");
  }
}

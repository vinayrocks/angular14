import { Component, OnInit } from "@angular/core";
import * as Rellax from "rellax";
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from "@angular/forms";
import { RdUserService } from "src/app/shared/services/user/rd-user-service";
import { RdEncryptDecryptService } from "src/app/shared/services/encrypt-decrypt/rd-encrypt-decrypt.service";
import { Router, ActivatedRoute } from "@angular/router";
import { first } from "rxjs/operators";
import { EmbedVideoService } from "ngx-embed-video";
import { NotificationService } from "src/app/shared/services/common/rd-notification/notification.service";
import { RdPortfolio } from "src/app/shared/core/models/rd-portfolio/rd-portfolio";
import { RdCommon } from "src/app/shared/core/models/rd-common/rd-common";
import { RdAuthenticateService } from "src/app/shared/services/authentication/rd-authenticate.service";
import { AngularEditorConfig } from "@kolkov/angular-editor";
import { NgxSpinnerService } from "ngx-spinner";
import { animate, style, transition, trigger } from "@angular/animations";
@Component({
  selector: "app-rd-portfolio-edit",
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
  templateUrl: "./rd-portfolio-edit.component.html",
  styleUrls: ["./rd-portfolio-edit.component.scss"],
})
export class RdPortfolioEditComponent implements OnInit {
  editPortfolioFormGroup: FormGroup;
  isUploaded: Boolean = false;
  urls: any = [];
  routerData: any = [];
  userPortfolio: any = "";
  isImageType: Boolean = true;
  addMoreImageArray: any = [1];
  imageIndex: number = 0;
  linkURL: string = "";
  serverFile = [];
  PortfolioMediaModel: any = [];
  projectFilePath: String = "";
  projectPath: String = "";
  portfolioName: String = "";
  currentUser: any;
  config: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: "auto",
    minHeight: "auto",
    placeholder: "Enter text here...",
    translate: "no",
    defaultParagraphSeparator: "p",
    defaultFontName: "Open Sans",
    showToolbar: true,
    toolbarHiddenButtons: [
      ["bold", "italic"],
      ["fontSize", "insertImage", "insertVideo", "insertHorizontalRule"],
    ],
  };
  userPortfolioMedia: any = [];
  profileImagePath: String = "";
  coverImagePath: String = "";
  defaultImagePath: string =
    "../../../../../../assets/img/radian/userAvatar.png";
  constructor(
    private _formBuilder: FormBuilder,
    private rdUserService: RdUserService,
    private router: Router,
    private _encryptDecryptService: RdEncryptDecryptService,
    private route: ActivatedRoute,
    private embedService: EmbedVideoService,
    private notificationService: NotificationService,
    private spinner: NgxSpinnerService,
    private rdAuthenticateService: RdAuthenticateService
  ) {
    this.routerData.Id = this.route.snapshot.paramMap.get("id");

    this.currentUser = this.rdAuthenticateService.getLocalStorageData();
    if (this.currentUser !== null) {
      this.projectFilePath =
        this.currentUser.firstName +
        "_" +
        this.currentUser.username.split("@")[0] +
        "/Portfolio";
      this.routerData.UserId = this.currentUser.id;
      this.currentUser.ProfileSkillName = JSON.parse(
        this.currentUser.ProfileSkillName
      );
    }

    if (this.routerData !== "") {
      this.routerData = this._encryptDecryptService.decryptModel(
        this.routerData
      );
      this.getUserPorfolio(this.routerData);
    } else {
      this.router.navigate(["/member/portfolio_view"]);
    }
  }
  ngOnInit() {
    var rellaxHeader = new Rellax(".rellax-header");
    var body = document.getElementsByTagName("body")[0];
    body.classList.add("profile-page");
    var navbar = document.getElementsByTagName("nav")[0];
    navbar.classList.add("navbar-transparent");
    this.editPortfolioFormGroup = this._formBuilder.group({
      Id: [this.routerData.Id, Validators.required],
      PortfolioName: ["", Validators.required],
      PortfolioArtifacts: ["", Validators.required],
      PortfolioMedia: [""],
      UserPortfolioMedia: [""],
      linkURL: [""],
    });
    if (this.currentUser !== null) {
      this.profileImagePath = this.GetProfilePath();
      this.coverImagePath = this.GetCoverPicture();
    }
  }
  get editPortfolioForm() {
    return this.editPortfolioFormGroup.controls;
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
      this.currentUser.ProfileName.replace(" ", "") +
      "/CoverImages/" +
      this.currentUser.CoverPicture
    );
  }
  setFormGroup() {
    this.editPortfolioForm.PortfolioName.setValue(
      this.userPortfolio.PortfolioName
    );
    this.editPortfolioForm.PortfolioMedia.setValue(
      this.userPortfolio.PortfolioMedia
    );
    this.editPortfolioForm.PortfolioArtifacts.setValue(
      this.userPortfolio.PortfolioArtifacts
    );
    // this.editPortfolioForm.UserPortfolioMedia.setValue(this.userPortfolioMedia);
  }
  getUserPorfolio(data) {
    this.spinner.show();
    this.rdUserService
      .getUserPorfolio(new RdCommon(data))
      .pipe(first())
      .subscribe(
        (res) => {
          this.spinner.hide();
          res.UserPortfolioMedia.forEach((el) => {
            el.userPortfolioIsRatingAllowed =
              parseInt(el.userPortfolioIsRatingAllowed) === 1 ? true : false;
            if (
              el.userPortfolioAttachment.indexOf("youtu.be") === -1 &&
              el.userPortfolioAttachment.indexOf("youtube") === -1 &&
              el.userPortfolioAttachment.indexOf("pdf") === -1
            ) {
              el.IsImage = "image";
            } else if (
              el.userPortfolioAttachment.indexOf("youtu.be") === -1 &&
              el.userPortfolioAttachment.indexOf("youtube") === -1 &&
              el.userPortfolioAttachment.indexOf("pdf") !== -1
            ) {
              el.IsImage = "pdf";
            } else {
              const img = this.embedService
                .embed_image(el.userPortfolioAttachment, { image: "mqdefault" })
                .then((res) => {
                  el.IsImage = "video";
                  el.userPortfolioAttachment = res.link;
                  el.IsImage = "video";
                });
            }
          });
          this.userPortfolioMedia = res.UserPortfolioMedia;
          this.userPortfolio = res.data[0];
          this.portfolioName = res.data[0].PortfolioName;
          this.portfolioName = this.portfolioName.replace(/\s/g, "");
          this.projectPath = res.projectPath;
          this.setFormGroup();
        },
        (error) => {
          this.spinner.hide();
        }
      );
  }
  addMoreImage(index: number) {
    const data: any = [];
    if (this.validateYouTubeUrl(index)) {
      data.type = "video";
      data.imageMovieURL = this.editPortfolioForm.linkURL.value;
      const img = this.embedService
        .embed_image(this.editPortfolioForm.linkURL.value, {
          image: "mqdefault",
        })
        .then((res) => {
          this.urls.push({
            Name: res.link,
            IsImage: "video",
            FileName: data.imageMovieURL,
            AllowRating: false,
            Rating: 0,
          });
          this.PortfolioMediaModel.push(
            JSON.stringify({
              Name: res.link,
              IsImage: "video",
              FileName: data.imageMovieURL,
              AllowRating: false,
              Rating: 0,
            })
          );
          this.editPortfolioForm.PortfolioMedia.setValue(
            this.PortfolioMediaModel.join(",")
          );
          this.editPortfolioForm.linkURL.setValue("");
        });
      this.imageIndex = index + 1;
      this.addMoreImageArray.push(index + 1);
      this.isImageType = true;
      this.isUploaded = true;
    } else {
      this.notificationService.error("Not a valid link.Please try again.");
      this.editPortfolioForm.linkURL.setValue("");
    }
  }
  validateYouTubeUrl(index: number) {
    if (
      this.editPortfolioForm.linkURL.value != undefined ||
      this.editPortfolioForm.linkURL.value != ""
    ) {
      var regExp =
        /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|\?v=)([^#\&\?]*).*/;
      var match = this.editPortfolioForm.linkURL.value.match(regExp);
      if (match && match[2].length == 11) {
        return true;
      }
      return false;
    }
  }
  getVideo(url) {
    return this.embedService.embed(url);
  }
  selectMediaType(event: any) {
    if (event !== "image") {
      this.isImageType = false;
    } else {
      this.isImageType = true;
    }
  }
  fileChangeEvent(event: any, index: number): void {
    const data: any = [];
    const serverData: any = [];
    if (event.target.files && event.target.files[0]) {
      var filesAmount = event.target.files.length;
      for (let i = 0; i < filesAmount; i++) {
        serverData.File = event.target.files[i];
        this.serverFile.push(serverData);
        if (
          event.target.files[i].type === "image/jpeg" ||
          event.target.files[i].type === "image/png"
        ) {
          data.type = "image";
          var reader = new FileReader();
          reader.onload = (event: any) => {
            // data.imageMovieURL = event.target.result;
            this.urls.push({
              Name: event.target.result,
              IsImage: "image",
              AllowRating: false,
              Rating: 0,
            });
            // this.urls.push(data);
          };
          reader.readAsDataURL(event.target.files[i]);
        } else if (event.target.files[i].type === "application/pdf") {
          // data.type='document';
          // data.imageMovieURL='';
          this.urls.push({ Name: "", IsImage: "pdf" });
        } else {
          this.notificationService.warn(
            "File format not accepted [Valid format: .jpg, .png, .pdf]"
          );
        }
      }
      this.isUploaded = true;
      this.imageIndex = index + 1;
      this.addMoreImageArray.push(index + 1);
    }
  }
  removeMedia(index) {
    this.urls.splice(index, 1);
    this.serverFile.splice(index, 1);
  }
  onSubmit() {
    // stop here if form is invalid
    if (this.editPortfolioFormGroup.invalid) {
      this.notificationService.error("Please fill in the required fields");
      this.validateAllFormFields(this.editPortfolioFormGroup);
      return;
    }
    if (this.serverFile.length != 0) {
      this.spinner.show();
      this.rdUserService
        .UploadUserPortfolioFile(
          this.serverFile,
          this.editPortfolioForm.PortfolioName.value
        )
        .pipe(first())
        .subscribe(
          (res) => {
            var dataReposne = res.data.split(",");
            this.serverFile = [];
            this.PortfolioMediaModel = [];
            this.urls.forEach((element: any, index: number) => {
              if (element.IsImage !== "video") {
                const dxDat = {
                  FileName: dataReposne[index],
                  AllowRating: element.AllowRating,
                  Rating: 0,
                };
                this.PortfolioMediaModel.push(JSON.stringify(dxDat));
              } else {
                const dxDat = {
                  FileName: element.FileName,
                  AllowRating: element.AllowRating,
                  Rating: 0,
                };
                this.PortfolioMediaModel.push(JSON.stringify(dxDat));
              }
            });
            this.editPortfolioForm.PortfolioMedia.setValue(
              this.PortfolioMediaModel.join(",")
            );
            this.submitDetail();
          },
          (error) => {
            this.spinner.hide();
            this.notificationService.error(
              "Something went wrong.Please try again."
            );
          }
        );
    } else {
      this.spinner.show();
      //this.editPortfolioForm.PortfolioMedia.setValue("");
      this.submitDetail();
    }
  }
  validateAllFormFields(formGroup: FormGroup) {
    //{1}
    Object.keys(formGroup.controls).forEach((field) => {
      //{2}
      const control = formGroup.get(field); //{3}
      if (control instanceof FormControl) {
        //{4}
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        //{5}
        this.validateAllFormFields(control); //{6}
      }
    });
  }
  submitDetail() {
    // this.editPortfolioForm.UserPortfolioMedia.setValue("");
    const data = this.editPortfolioFormGroup.value;
    data.UserPortfolioMedia =
      this.userPortfolioMedia.length > 0
        ? JSON.stringify(this.userPortfolioMedia)
        : "";

    this.rdUserService.addUserPortfolio(new RdPortfolio(data)).subscribe(
      (res) => {
        this.spinner.hide();
        if (res.status) {
          this.notificationService.success(res.message);
          this.router.navigate(["/member/portfolio_view"]);
        } else {
          this.notificationService.error(res.message);
        }
      },
      (error) => {
        this.spinner.hide();
      }
    );
  }
  changeUserType(event: any, index: number) {
    if (event.target.checked) {
      // this.serverFile[index].AllowRating = true;
      this.urls[index].AllowRating = true;
    } else {
      // this.serverFile[index].AllowRating = false;
      this.urls[index].AllowRating = false;
    }
  }
  allowRating(event: any, index: number) {
    if (event.target.checked) {
      // this.serverFile[index].AllowRating = true;
      this.userPortfolioMedia[index].userPortfolioIsRatingAllowed = true;
    } else {
      // this.serverFile[index].AllowRating = false;
      this.userPortfolioMedia[index].userPortfolioIsRatingAllowed = false;
    }
  }
  ngOnDestroy() {}
}

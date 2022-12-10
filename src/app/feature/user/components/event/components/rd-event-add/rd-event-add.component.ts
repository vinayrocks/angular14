import { Component, OnInit } from "@angular/core";
import * as Rellax from "rellax";
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from "@angular/forms";
import { RdUserService } from "src/app/shared/services/user/rd-user-service";
import { EmbedVideoService } from "ngx-embed-video";
import * as skillsInterest from "src/app/shared/core/json-data/skillsInterest.json";
import { first } from "rxjs/operators";
import { NotificationService } from "src/app/shared/services/common/rd-notification/notification.service";
import { RdEvent } from "src/app/shared/core/models/rd-event/rd-event";
import { Router } from "@angular/router";
import { AngularEditorConfig } from "@kolkov/angular-editor";
import { NgxSpinnerService } from "ngx-spinner";
import * as countryState from "src/app/shared/core/json-data/countryState.json";
import * as countryCode from "src/app/shared/core/json-data/countryCodes.json";
import * as moment from "moment";
import { RdAuthenticateService } from "src/app/shared/services/authentication/rd-authenticate.service";
@Component({
  selector: "app-rd-event-add",
  templateUrl: "./rd-event-add.component.html",
  styleUrls: ["./rd-event-add.component.scss"],
})
export class RdEventAddComponent implements OnInit {
  addEventFormGroup: FormGroup;
  focusEventName;
  focusEventDescription;
  focusEventCategory;
  isUploaded: Boolean = false;
  urls = [];
  isImageType: Boolean = true;
  skills: any;
  skillsSubcategory: any;
  tempArr: any = [];
  addMoreImageArray: any = [1];
  imageIndex: number = 0;
  linkURL: string = "";
  serverFile = [];
  EventPictureModel: any = [];
  config: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: "150px",
    minHeight: "150px",
    placeholder: "Enter text here...",
    translate: "no",
    defaultParagraphSeparator: "p",
    defaultFontName: "Open Sans",
    showToolbar: true,
    toolbarHiddenButtons: [
      ["bold", "italic"],
      ["fontSize", "insertHorizontalRule"],
    ],
  };
  _EventDateTime: any = "";
  countryState: any;
  countryCode: any;
  state: any;
  countryConfig: any = {
    displayKey: "country",
    search: true,
    placeholder: "Select",
    searchPlaceholder: "Search",
    searchOnKey: "country",
    height: "150px",
  };
  stateConfig: any = {
    displayKey: "",
    search: true,
    placeholder: "Select",
    searchPlaceholder: "Search",
    searchOnKey: "country",
    height: "150px",
  };
  skillCategoryConfig: any = {
    displayKey: "radianSkillCategoryName",
    search: true,
    placeholder: "Select",
    searchPlaceholder: "Search",
    searchOnKey: "country",
    height: "150px",
  };
  currentUser:any=[];
  constructor(
    private _formBuilder: FormBuilder,
    private rdUserService: RdUserService,
    private embedService: EmbedVideoService,
    private spinner: NgxSpinnerService,
    private notificationService: NotificationService,
    private router: Router,
    private rdAuthenticateService:RdAuthenticateService
  ) {
    //PortfolioMedia
    this.skills = (skillsInterest as any).default;
    this.countryState = (countryState as any).default;
    this.countryCode = (countryCode as any).default;
    this.currentUser = this.rdAuthenticateService.getLocalStorageData();
    //
  }
  ngOnInit() {
    var body = document.getElementsByTagName("body")[0];
    body.classList.add("profile-page");
    var navbar = document.getElementsByTagName("nav")[0];
    navbar.classList.add("navbar-transparent");
    this.addEventFormGroup = this._formBuilder.group({
      EventName: ["", Validators.required],
      EventDescription: ["", Validators.required],
      EventMedia: [""],
      EventSkill: [""],
      EventCategory: ["", Validators.required],
      IsEventOnline: [false],
      EventLink: [
        "",
        this.requiredIfValidator(() => this.addEventForm.IsEventOnline.value),
      ],
      country: [
        "",
        this.requiredIfValidator(() => !this.addEventForm.IsEventOnline.value),
      ],
      street: [
        "",
        this.requiredIfValidator(() => !this.addEventForm.IsEventOnline.value),
      ],
      city: [
        "",
        this.requiredIfValidator(() => !this.addEventForm.IsEventOnline.value),
      ],
      state: [
        "",
        this.requiredIfValidator(() => !this.addEventForm.IsEventOnline.value),
      ],
      zip: [
        "",
        this.requiredIfValidator(() => !this.addEventForm.IsEventOnline.value),
      ],
      EventStartDateTime: ["", Validators.required],
      EventEndDateTime: ["", Validators.required],
      linkURL: [""],
    });
  }
  get addEventForm() {
    return this.addEventFormGroup.controls;
  }
  changeEventType(event: any) {
    this.addEventForm.EventLink.updateValueAndValidity();
    this.addEventForm.country.updateValueAndValidity();
    this.addEventForm.street.updateValueAndValidity();
    this.addEventForm.city.updateValueAndValidity();
    this.addEventForm.state.updateValueAndValidity();
    this.addEventForm.zip.updateValueAndValidity();
  }
  getSkillSubCategory(event: any) {
    // console.log(event);
    this.skillsSubcategory = event.radianSkillSubCategories;
  }
  getStates(event: any) {
    // console.log(event);
    this.state = event.states;
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
            this.urls.push({ Name: event.target.result, IsImage: "image" });
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
  addMoreImage(index: number) {
    const data: any = [];
    if (this.validateYouTubeUrl(index)) {
      data.type = "video";
      data.imageMovieURL = this.addEventForm.linkURL.value;
      const img = this.embedService
        .embed_image(this.addEventForm.linkURL.value, { image: "mqdefault" })
        .then((res) => {
          this.urls.push({
            Name: this.embedService.embed(data.imageMovieURL),
            IsImage: "video",
            Image: res.link,
          });
        });
      // this.urls.push({Name:this.embedService.embed(this.editPortfolioForm.linkURL.value),IsImage:'video',
      // Image:res.link});
      this.imageIndex = index + 1;
      this.addMoreImageArray.push(index + 1);
      this.isImageType = true;
      this.isUploaded = true;
      this.EventPictureModel.push(data.imageMovieURL);
      this.addEventForm.linkURL.setValue("");
    } else {
      this.notificationService.error("Not a valid link.Please try again.");
      this.addEventForm.linkURL.setValue("");
    }
  }
  validateYouTubeUrl(index: number) {
    if (
      this.addEventForm.linkURL.value != undefined ||
      this.addEventForm.linkURL.value != ""
    ) {
      var regExp =
        /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|\?v=)([^#\&\?]*).*/;
      var match = this.addEventForm.linkURL.value.match(regExp);
      if (match && match[2].length == 11) {
        return true;
      }
      return false;
    }
  }
  onSelectExperties(event, item: any) {
    if (event.target.checked) {
      this.tempArr.push(item.id);
    } else {
      const index: number = this.tempArr.indexOf(item.id);
      if (index !== -1) {
        this.tempArr.splice(index, 1);
      }
    }
    this.addEventForm.EventCategory.setValue(this.tempArr.join(","));
  }
  removeMedia(index) {
    this.urls.splice(index, 1);
    this.serverFile.splice(index, 1);
  }
  onSubmit() {
    const dt = this.addEventFormGroup.value;
    dt.EventStartDateTime.setValue(
      moment(dt.EventStartDateTime).format("YYYY-MM-DD HH:mm:ss")
    );
    dt.EventEndDateTime.setValue(
      moment(dt.EventEndDateTime).format("YYYY-MM-DD HH:mm:ss")
    );
    dt.country = dt.country.country;
    this.spinner.show();
    // stop here if form is invalid
    if (this.addEventFormGroup.invalid) {
      this.spinner.hide();
      this.notificationService.error("Please fill in the required fields");
      this.validateAllFormFields(this.addEventFormGroup);
      return;
    }
    if (this.serverFile.length > 0) {
      // this.addEventForm.EventStartDateTime.setValue(moment(this.addEventForm.EventStartDateTime.value).format('YYYY-MM-DD HH:mm:ss'));
      // this.addEventForm.EventEndDateTime.setValue(moment(this.addEventForm.EventEndDateTime.value).format('YYYY-MM-DD HH:mm:ss'));
      this.rdUserService
        .UploadUserEventImage(this.serverFile, dt.EventName)
        .pipe(first())
        .subscribe(
          (res) => {
            this.spinner.hide();
            var dataReposne = res.data.split(",");
            this.serverFile = [];
            dataReposne.forEach((element) => {
              this.EventPictureModel.push(element);
            });
            dt.EventMedia = this.EventPictureModel.join(",");
            this.rdUserService
              .addUserEvent(new RdEvent(dt))
              .subscribe((res) => {
                if (res.status) {
                  this.notificationService.success(res.message);
                  this.router.navigate(["/member/event_view"]);
                } else {
                  this.notificationService.error(res.message);
                }
              });
          },
          (error) => {
            this.spinner.hide();
            this.notificationService.error(
              "Something went wrong.Please try again."
            );
          }
        );
    } else {
      dt.EventMedia = "";
      this.rdUserService.addUserEvent(new RdEvent(dt)).subscribe((res) => {
        this.spinner.hide();
        if (res.status) {
          this.notificationService.success(res.message);
          this.router.navigate(["/member/event_view"]);
        } else {
          this.notificationService.error(res.message);
        }
      });
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
  requiredIfValidator(predicate) {
    return (formControl) => {
      if (!formControl.parent) {
        return null;
      }
      if (predicate()) {
        return Validators.required(formControl);
      }
      return null;
    };
  }
  ngOnDestroy() {
    var body = document.getElementsByTagName("body")[0];
    body.classList.remove("profile-page");
    var navbar = document.getElementsByTagName("nav")[0];
    navbar.classList.remove("navbar-transparent");
  }
}

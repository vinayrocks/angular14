import { Component, OnInit } from "@angular/core";
import * as Rellax from "rellax";
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
  FormArray,
} from "@angular/forms";
import { RdUserService } from "src/app/shared/services/user/rd-user-service";
import * as skillsInterest from "src/app/shared/core/json-data/skillsInterest.json";
import { first } from "rxjs/operators";
import { ImageCroppedEvent } from "ngx-image-cropper";
import { Router, ActivatedRoute } from "@angular/router";
import { RdEncryptDecryptService } from "src/app/shared/services/encrypt-decrypt/rd-encrypt-decrypt.service";
import { NotificationService } from "src/app/shared/services/common/rd-notification/notification.service";
import { RdRadian } from "src/app/shared/core/models/rd-radian/rd-radian";
import { RdCommon } from "src/app/shared/core/models/rd-common/rd-common";
import { RdAuthenticateService } from "src/app/shared/services/authentication/rd-authenticate.service";
import { AngularEditorConfig } from "@kolkov/angular-editor";
import { NgxSpinnerService } from "ngx-spinner";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import * as moment from "moment";
import { animate, style, transition, trigger } from "@angular/animations";
@Component({
  selector: "app-rd-radian-edit",
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
  templateUrl: "./rd-radian-edit.component.html",
  styleUrls: ["./rd-radian-edit.component.scss"],
})
export class RdRadianEditComponent implements OnInit {
  editRadianFormGroup: FormGroup;
  skills: any;
  skillsSubcategory: any;
  url: any = "";
  tempArr: any = [];
  tempArrPortfolio: any = [];
  userPortfolio: any;
  imageChangedEvent: any = "";
  croppedImage: any = "";
  isUploaded: Boolean = false;
  routerData: any = [];
  userProfile: any = "";
  tempSubCategory: any = [];
  serverFile: any = [];
  profileImagePath: String = "";
  coverImagePath: String = "";
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
  eduNameConfig: any = {
    displayKey: "name",
    search: true,
    placeholder: "Select",
    searchPlaceholder: "Search",
    searchOnKey: "name",
    height: "150px",
  };
  skillConfig: any = {
    displayKey: "radianSkillCategoryName",
    search: true,
    placeholder: "Select",
    searchPlaceholder: "Search",
    searchOnKey: "radianSkillCategoryName",
    height: "150px",
  };
  degreeName: any = [
    { id: 10, name: "SSC", status: "enabled" },
    { id: 11, name: "HSC", status: "enabled" },
    { id: 12, name: "Graduate", status: "enabled" },
    { id: 13, name: "Post Graduate", status: "enabled" },
    { id: 14, name: "PhD", status: "enabled" },
    { id: 15, name: "Others", status: "enabled" },
  ];
  tempDegreeName: any = [];
  maxDate = new Date();
  minDate = new Date();
  _disableOther: boolean = false;
  constructor(
    private _formBuilder: FormBuilder,
    private rdUserService: RdUserService,
    private router: Router,
    private _encryptDecryptService: RdEncryptDecryptService,
    private route: ActivatedRoute,
    private notificationService: NotificationService,
    private spinner: NgxSpinnerService,
    private modalService: NgbModal,
    private rdAuthenticateService: RdAuthenticateService
  ) {
    this.skills = (skillsInterest as any).default;
    this.tempDegreeName = Object.assign([], this.degreeName);
    this.currentUser = this.rdAuthenticateService.getLocalStorageData();
    // this.projectFilePath =
    //   this.currentUser.firstName +
    //   "_" +
    //   this.currentUser.username.split("@")[0] +
    //   "/Profile";
    this.routerData.Id = this.route.snapshot.paramMap.get("id");
    if (this.routerData.Id !== "") {
      this.routerData.Id = this._encryptDecryptService.get(this.routerData.Id);
      this.routerData.UserId = this.currentUser.id;
      this.editRadianFormGroup = this._formBuilder.group({
        Id: [this.routerData.Id, Validators.required],
        ProfileName: [""],
        ProfilePicture: [""],
        CoverPicture: [""],
        ProfileDescription: ["", Validators.required],
        ProfileSkill: [""],
        ProfileExpertise: ["", Validators.required],
        LinkedPortfolio: ["", Validators.required],
        Education: this._formBuilder.array([]),
        CertificationLicense: this._formBuilder.array([]),
        Experience: this._formBuilder.array([]),
      });
      this.getUserProfile(this.routerData);
    } else {
      this.router.navigate(["/member/radian_view"]);
    }
  }
  ngOnInit() {
    var body = document.getElementsByTagName("body")[0];
    body.classList.add("profile-page");
    var navbar = document.getElementsByTagName("nav")[0];
    navbar.classList.add("navbar-transparent");
  }
  GetProfilePath() {
    return (
      "http://itechprovisions.com/radianApi/media/" +
      this.currentUser.firstName +
      "_" +
      this.currentUser.username.split("@")[0] +
      "/Profile/" +
      this.currentUser.ProfileName.replace(" ", "") +
      "/ProfileImages/" +
      this.userProfile.ProfilePicture
    );
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
      this.userProfile.CoverPicture
    );
  }
  getDate(value: any) {
    return new Date(value);
  }
  setFormGroup() {
    this.editRadianFormGroup.controls["ProfileSkill"].setValue(
      this.userProfile.ProfileSkill.name === undefined
        ? ""
        : this.userProfile.ProfileSkill.name
    );
    this.editRadianFormGroup.controls["ProfileName"].setValue(
      this.userProfile.ProfileName
    );
    this.editRadianFormGroup.controls["ProfilePicture"].setValue(
      this.userProfile.ProfilePicture
    );
    this.editRadianFormGroup.controls["CoverPicture"].setValue(
      this.userProfile.CoverPicture
    );
    this.editRadianFormGroup.controls["ProfileDescription"].setValue(
      this.userProfile.ProfileDescription
    );
    const data = this.userProfile.ProfileSkill.id;
    this.userProfile.ProfileExpertise.forEach((element) => {
      this.tempArr.push(element.id);
    });

    this.editRadianFormGroup.controls["ProfileExpertise"].setValue(
      this.tempArr.join(",")
    );
    this.skillsSubcategory = this.skills.filter(function (item) {
      return item.radianSkillCategoryId === data;
    })[0].radianSkillSubCategories;
    this.skillsSubcategory.forEach((element) => {
      if (this.tempArr.indexOf(element.id) !== -1) {
        this.tempSubCategory.push({
          Id: element.id,
          name: element.subCategoryName,
          isChecked: true,
        });
      } else {
        this.tempSubCategory.push({
          Id: element.id,
          name: element.subCategoryName,
          isChecked: false,
        });
      }
    });
    if (this.userProfile.isDefaultProfile) {
      if (this.userProfile.CertificationDetails !== null) {
        this.userProfile.CertificationDetails.forEach((element) => {
          this.addCertificationLicensed(element);
        });
      } else {
        this.addCertificationLicensed(null);
      }

      if (this.userProfile.EducationDetails !== null) {
        this.userProfile.EducationDetails.forEach((element) => {
          this.addEducation(element);
          this.degreeName = this.degreeName.filter(
            (x) => x.name.toLowerCase() !== element.EducationName.toLowerCase()
          );
        });
      } else {
        this.addEducation(null);
      }

      if (this.userProfile.ExperienceDetails !== null) {
        this.userProfile.ExperienceDetails.forEach((element) => {
          this.addExperience(element);
        });
      } else {
        this.addExperience(null);
      }
    }
  }

  getUserProfile(data) {
    // this.spinner.show()

    this.rdUserService
      .getUserProfile(new RdCommon(data))
      .pipe(first())
      .subscribe(
        (res) => {
          res.data[0].isDefaultProfile =
            parseInt(res.data[0].isDefaultProfile) === 1 ? true : false;
          if (res.data[0].isDefaultProfile) {
            res.data.forEach((element) => {
              element.ProfileExpertise =
                element.ProfileExpertise === ""
                  ? ""
                  : JSON.parse(element.ProfileExpertise);
              element.ProfileSkill =
                element.ProfileSkill === ""
                  ? ""
                  : JSON.parse(element.ProfileSkill);
              element.LinkedPortfolio =
                element.LinkedPortfolio === ""
                  ? ""
                  : JSON.parse(element.LinkedPortfolio);

              element.CertificationDetails =
                element.CertificationDetails === ""
                  ? ""
                  : JSON.parse(element.CertificationDetails);
              element.EducationDetails =
                element.EducationDetails === ""
                  ? ""
                  : JSON.parse(element.EducationDetails);
              element.ExperienceDetails =
                element.ExperienceDetails === ""
                  ? ""
                  : JSON.parse(element.ExperienceDetails);
            });
          }

          this.userProfile = res.data[0];
          if (this.currentUser !== null) {
            this.profileImagePath =
              this.userProfile.ProfilePicture !== null
                ? this.GetProfilePath()
                : "";
            this.coverImagePath =
              this.userProfile.CoverPicture !== null
                ? this.GetCoverPicture()
                : "";
          }
          this.setFormGroup();
          this.getUserPorfolio();
        },
        (error) => {
          this.spinner.hide();
        }
      );
  }

  getSkillSubCategory(event: any) {
    this.skillsSubcategory = event.radianSkillSubCategories;
  }
  onSelectPortfolio(event, item: any) {
    if (event.target.checked) {
      if (this.tempArrPortfolio.filter((x: any) => x.Id === item.Id) === -1) {
        const data = this.userPortfolio.filter((x: any) => x.id === item.Id)[0];
        this.tempArrPortfolio.push({
          Id: data.id,
          name: data.PortfolioName,
          isChecked: true,
        });
      }
    } else {
      const data = this.tempArrPortfolio.filter(
        (x: any) => x.Id === item.Id
      )[0];
      const index: number = this.tempArrPortfolio.indexOf(data);
      if (index !== -1) {
        this.tempArrPortfolio.splice(index, 1);
      }
    }
    this.editRadianFormGroup.controls["LinkedPortfolio"].setValue(
      this.tempArrPortfolio.map((x: any) => x.Id).toString()
    );
  }
  getUserPorfolio() {
    this.rdUserService
      .getUserPorfolios(new RdCommon(this.routerData))
      .pipe(first())
      .subscribe(
        (res) => {
          this.spinner.hide(res);
          this.userPortfolio = res.data;
          var dbData = [];
          dbData = this.userProfile.LinkedPortfolio;
          const ids = dbData.map((x: any) => x.id);
          this.userPortfolio.forEach((element) => {
            // this.tempArrPortfolio.push(element.id);
            if (ids.indexOf(element.id) !== -1) {
              this.tempArrPortfolio.push({
                Id: element.id,
                name: element.PortfolioName,
                isChecked: true,
              });
            } else {
              this.tempArrPortfolio.push({
                Id: element.id,
                name: element.PortfolioName,
                isChecked: false,
              });
            }
          });
          this.editRadianFormGroup.controls["LinkedPortfolio"].setValue(
            this.tempArrPortfolio.map((x: any) => x.Id).toString()
          );
        },
        (error) => {
          this.spinner.hide();
        }
      );
  }
  onSubmit() {
    const edData = this.editRadianFormGroup.get("Education") as FormArray;
    edData.controls.map((x: any) =>
      x.controls["StartsOn"].setValue(
        moment(x.controls["StartsOn"].value).format("YYYY-MM-DD HH:mm:ss")
      )
    );
    edData.controls.map((x: any) =>
      x.controls["EndsOn"].setValue(
        moment(x.controls["EndsOn"].value).format("YYYY-MM-DD HH:mm:ss")
      )
    );

    const certData = this.editRadianFormGroup.get(
      "CertificationLicense"
    ) as FormArray;
    certData.controls.map((x: any) =>
      x.controls["CertifiedDate"].setValue(
        moment(x.controls["CertifiedDate"].value).format("YYYY-MM-DD HH:mm:ss")
      )
    );

    const expData = this.editRadianFormGroup.get("Experience") as FormArray;
    expData.controls.map((x: any) =>
      x.controls["StartDate"].setValue(
        moment(x.controls["StartDate"].value).format("YYYY-MM-DD HH:mm:ss")
      )
    );
    expData.controls.map((x: any) =>
      x.controls["ToDate"].setValue(
        moment(x.controls["ToDate"].value).format("YYYY-MM-DD HH:mm:ss")
      )
    );

    const dxData = this.editRadianFormGroup.value;
    if (this.editRadianFormGroup.invalid) {
      this.notificationService.error("Please fill in the required fields");
      this.validateAllFormFields(this.editRadianFormGroup);
      return;
    } else {
      dxData.ProfileSkill =
        dxData.ProfileSkill.radianSkillCategoryId === undefined
          ? this.skills.filter(function (item) {
              return item.radianSkillCategoryName === dxData.ProfileSkill;
            })[0].radianSkillCategoryId
          : dxData.ProfileSkill.radianSkillCategoryId;
      if (this.userProfile.isDefaultProfile) {
        dxData.Education.map(
          (x: any) =>
            (x.EducationName =
              x.EducationName.name === undefined
                ? x.EducationName
                : x.EducationName.name)
        );
        dxData.Education = JSON.stringify(dxData.Education);
        dxData.Experience = JSON.stringify(dxData.Experience);
        dxData.CertificationLicense = JSON.stringify(
          dxData.CertificationLicense
        );
      }
    }
    if (this.serverFile.length != 0) {
      this.spinner.show();
      this.rdUserService
        .UploadUserRadianProfileImage(
          this.croppedImage,
          this.serverFile,
          this.editRadianFormGroup.controls["ProfileName"].value
        )
        .pipe(first())
        .subscribe(
          (res) => {
            this.serverFile = [];
            dxData.ProfilePicture = res.data.ProfilePicture;
            dxData.CoverPicture = res.data.CoverPicture;
            this.rdUserService
              .addUserProfile(new RdRadian(dxData))
              .subscribe((res) => {
                this.spinner.hide();
                if (res.status) {
                  this.notificationService.success(res.message);
                  this.router.navigate(["/member/hunar_view"]);
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
      this.spinner.show();
      dxData.isDefaultProfile = this.userProfile.isDefaultProfile;
      this.rdUserService
        .addUserProfile(new RdRadian(dxData))
        .subscribe((res) => {
          this.spinner.hide();
          if (res.status) {
            this.notificationService.success(res.message);
            this.router.navigate(["/member/hunar_view"]);
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

  fileChangeEvent(event: any, content: any): void {
    this.imageChangedEvent = event;
    this.isUploaded = true;
  }
  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
  }
  CoverFileChangeEvent(event: any): void {
    if (event.target.files && event.target.files[0]) {
      var filesAmount = event.target.files.length;
      for (let i = 0; i < filesAmount; i++) {
        this.serverFile.push(event.target.files[i]);
      }
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
    this.editRadianFormGroup.controls["ProfileExpertise"].setValue(
      this.tempArr.join(",")
    );
  }
  openProfilePopup(content: any) {
    this.modalService.open(content, { centered: true, size: "lg" });
  }
  openCoverPopup(content: any) {
    this.modalService.open(content, { centered: true, size: "lg" });
  }

  educationFormarray(): FormArray {
    return this.editRadianFormGroup.get("Education") as FormArray;
  }
  newEducation(item): FormGroup {
    return this._formBuilder.group({
      EducationName: [
        item !== null ? item.EducationName : "",
        Validators.required,
      ],
      Other: [item !== null ? item.Other : ""],
      StartsOn: [item !== null ? item.StartsOn : "", Validators.required],
      EndsOn: [item !== null ? item.EndsOn : "", Validators.required],
      showOther: [
        item !== null && item !== ""
          ? item.Other !== "" && item.Other !== null
            ? true
            : false
          : false,
      ],
    });
  }

  addEducation(item: any) {
    this.educationFormarray().push(this.newEducation(item));
  }
  getEducationControls() {
    return (this.editRadianFormGroup.get("Education") as FormArray).controls;
  }
  deleteEducation(index: number) {
    let dxData: any = this.getEducationControls()[index];
    this.degreeName.push(
      this.tempDegreeName.filter(
        (x) =>
          x.name.toLowerCase() ===
          dxData.controls["EducationName"].value.name.toLowerCase()
      )[0]
    );
    this.degreeName.sort(function (a, b) {
      return -(b.id - a.id);
    });
    this.educationFormarray().removeAt(index);
  }

  CertificationLicensedFormarray(): FormArray {
    return this.editRadianFormGroup.get("CertificationLicense") as FormArray;
  }
  newCertificationLicensed(item): FormGroup {
    return this._formBuilder.group({
      CertificationName: [
        item !== null ? item.CertificationName : "",
        Validators.required,
      ],
      CertifiedDate: [
        item !== null ? new Date(item.CertifiedDate) : "",
        Validators.required,
      ],
      CertificationLicenseNumber: [
        item !== null ? item.CertificationLicenseNumber : "",
      ],
    });
  }

  addCertificationLicensed(item) {
    this.CertificationLicensedFormarray().push(
      this.newCertificationLicensed(item)
    );
  }
  getCertificationLicensedControls() {
    return (this.editRadianFormGroup.get("CertificationLicense") as FormArray)
      .controls;
  }
  deleteCertificationLicensed(index: number) {
    this.CertificationLicensedFormarray().removeAt(index);
  }
  ExperienceFormarray(): FormArray {
    return this.editRadianFormGroup.get("Experience") as FormArray;
  }
  newExperience(item): FormGroup {
    return this._formBuilder.group({
      ExperienceName: [
        item !== null ? item.ExperienceName : "",
        Validators.required,
      ],
      StartDate: [item !== null ? item.StartDate : "", Validators.required],
      ToDate: [item !== null ? item.ToDate : "", Validators.required],
    });
  }

  addExperience(item) {
    this.ExperienceFormarray().push(this.newExperience(item));
  }
  getExperienceControls() {
    return (this.editRadianFormGroup.get("Experience") as FormArray).controls;
  }
  deleteExperience(index: number) {
    this.ExperienceFormarray().removeAt(index);
  }
  onOpenCalendar(container) {
    container.monthSelectHandler = (event: any): void => {
      container._store.dispatch(container._actions.select(event.date));
    };
    container.setViewMode("year");
  }
  degreeSelect(event: any, index) {
    let dx: any = this.getEducationControls()[index];
    if (event.name.toLowerCase() === "other") {
      this._disableOther = true;
      dx.controls["Other"].addValidators(Validators.required);
      dx.controls["showOther"].setValue(true);
    } else {
      this._disableOther = false;
      dx.controls["Other"].removeValidators(Validators.required);
      dx.controls["showOther"].setValue(false);
    }
    this.degreeName = this.degreeName.filter(
      (x) => x.name.toLowerCase() !== event.name.toLowerCase()
    );
  }
  ngOnDestroy() {
    var body = document.getElementsByTagName("body")[0];
    body.classList.remove("profile-page");
    var navbar = document.getElementsByTagName("nav")[0];
    navbar.classList.remove("navbar-transparent");
  }
}

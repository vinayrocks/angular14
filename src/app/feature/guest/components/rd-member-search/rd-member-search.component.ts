import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import * as Rellax from "rellax";
import * as countryState from "src/app/shared/core/json-data/countryState.json";
import * as skillsInterest from "src/app/shared/core/json-data/skillsInterest.json";
import { FormGroup, FormBuilder } from "@angular/forms";
import { RdUserService } from "src/app/shared/services/user/rd-user-service";
import { NotificationService } from "src/app/shared/services/common/rd-notification/notification.service";
import { Router } from "@angular/router";
import { RdSearchMember } from "src/app/shared/core/models/rd-search-member/rd-search-member";
import { MatDialog } from "@angular/material/dialog";
import { RdEncryptDecryptService } from "src/app/shared/services/encrypt-decrypt/rd-encrypt-decrypt.service";
import { RdUrlLinkBoxComponent } from "src/app/core/components/rd-url-link-box/rd-url-link-box.component";
import { RdLikeEventProfile } from "src/app/shared/core/models/rd-common/rd-common";
import { first } from "rxjs/operators";
import { RdAuthenticateService } from "src/app/shared/services/authentication/rd-authenticate.service";
import { NgxSpinnerService } from "ngx-spinner";
@Component({
  selector: "app-rd-member-search",
  templateUrl: "./rd-member-search.component.html",
  styleUrls: ["./rd-member-search.component.scss"],
})
export class RdMemberSearchComponent implements OnInit {
  searchMemberFormGroup: FormGroup;
  skills: any;
  countryState: any;
  state: any;
  panelOpenState = false;
  rdMemberSearch: any;
  showLoadMore: Boolean = true;
  radianLikeData: any = [];
  routerData: any = [];
  currentUser: any;
  UserLiked: String = "";
  skillCategoryConfig: any = {
    displayKey: "radianSkillCategoryName",
    search: true,
    placeholder: "Select",
    searchPlaceholder: "Search",
    searchOnKey: "country",
    height: "150px",
  };
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
  defaultImagePath: string = "../../../../assets/img/radian/userAvatar.png";
  constructor(
    private _formBuilder: FormBuilder,
    private rdUserService: RdUserService,
    private spinner: NgxSpinnerService,
    private notificationService: NotificationService,
    private router: Router,
    private rdAuthenticateService: RdAuthenticateService,
    public matDialog: MatDialog,
    private _encryptDecryptService: RdEncryptDecryptService
  ) {
    this.skills = (skillsInterest as any).default;
    this.countryState = (countryState as any).default;
    this.rdMemberSearch = [];
    this.currentUser = this.rdAuthenticateService.getLocalStorageData();
    this.routerData = this._encryptDecryptService.decryptModel(this.routerData);
    if (this.currentUser === null) {
      this.radianLikeData.UserId = "";
      this.routerData.UserId = "";
    } else {
      this.radianLikeData.UserId = this.currentUser.id;
      this.routerData.UserId = this.currentUser.id;
    }
  }
  ngOnInit() {
    var body = document.getElementsByTagName("body")[0];
    body.classList.add("profile-page");
    var navbar = document.getElementsByTagName("nav")[0];
    navbar.classList.add("navbar-transparent");

    this.searchMemberFormGroup = this._formBuilder.group({
      SearchBySkill: [""],
      SearchByCountry: [""],
      SearchByState: [""],
      SearchByZipCode: [""],
      SearchByText: [""],
      SearchCount: [0],
    });
    this.onSubmit(0);
  }
  get searchMemberForm() {
    return this.searchMemberFormGroup.controls;
  }
  getStates(event: any) {
    this.state = event.states;
  }
  // getSKillSubCategory(data: any) {
  //   this.skillsSubcategory = data.radianSkillSubCategories;
  // }
  onSubmit(SearchCount: Number, showLoader: boolean = false) {
    if (showLoader) {
      this.spinner.show();
    }
    if (this.searchMemberFormGroup.invalid) {
      this.spinner.hide();
      return;
    }
    this.searchMemberForm.SearchCount.setValue(SearchCount);
    const dxData = this.searchMemberFormGroup.value;
    dxData.SearchBySkill =
      dxData.SearchBySkill.radianSkillCategoryId === undefined
        ? ""
        : dxData.SearchBySkill.radianSkillCategoryId;
    dxData.SearchByCountry =
      dxData.SearchByCountry.country === undefined
        ? ""
        : dxData.SearchByCountry.country;

    this.rdUserService
      .searchMember(new RdSearchMember(this.searchMemberFormGroup.value))
      .subscribe((res) => {
        this.spinner.hide();
        if (res.data !== "No Results Found!") {
          if (this.currentUser !== null) {
            res.data = res.data.filter(
              (x: any) => x.ProfileId !== this.currentUser.id
            );
          }
          res.data.forEach((element) => {
            // element.UserLiked=true;
            element.ContactDetails =
              element.ContactDetails === ""
                ? []
                : JSON.parse(element.ContactDetails);
            element.ProfileAddress =
              element.ProfileAddress === ""
                ? []
                : JSON.parse(element.ProfileAddress);
            element.ProfileExpertise =
              element.ProfileExpertise === ""
                ? []
                : JSON.parse(element.ProfileExpertise);
            element.ProfilePortfolio =
              element.ProfilePortfolio === ""
                ? []
                : JSON.parse(element.ProfilePortfolio);
            element.ProfileSkills =
              element.ProfileSkills === ""
                ? []
                : JSON.parse(element.ProfileSkills);
            element.ProfilePicture = this.getProfilefilePath(element);
            element.CoverPicture = this.getCoverfilePath(element);
            //element.isUserLiked = element.isUserLiked === "0" ? false : true;
            if (SearchCount !== 0) {
              this.rdMemberSearch.push(element);
            }
          });
          if (SearchCount === 0) {
            this.rdMemberSearch = res.data;
          }
          this.showLoadMore = true;
        } else {
          this.showLoadMore = false;
          if (SearchCount === 0) {
            this.rdMemberSearch = [];
          }
        }
      });
  }
  getProfilefilePath(data: any) {
    if (data.ProfilePicture != null) {
      return (
        "http://itechprovisions.com/radianApi/media/" +
        data.FirstName +
        "_" +
        data.Email.split("@")[0] +
        "/Profile/" +
        data.ProfileName.replace(" ", "") +
        "/ProfileImages/" +
        data.ProfilePicture
      );
    } else {
      return this.defaultImagePath;
    }
  }
  getCoverfilePath(data: any) {
    if (data.CoverPicture != null) {
      return (
        "http://itechprovisions.com/radianApi/media/" +
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
  GetMemberDetail(element) {
    // const dialogConfig = new MatDialogConfig();
    // dialogConfig.disableClose = false;
    // dialogConfig.autoFocus = true;
    // dialogConfig.width = '1000px';
    // dialogConfig.height = '500px';
    // dialogConfig.data=element;
    // this.matDialog.open(RdMemberDetailComponent, dialogConfig);
    this.router.navigate([
      "/member-detail",
      this._encryptDecryptService.set(element.ProfileId),
    ]);
  }
  getShareLink(item) {
    const data = this.notificationService.showLinkUrl();
    const key = this._encryptDecryptService.set(item.ProfileId);
    this.matDialog.open(RdUrlLinkBoxComponent, {
      width: "500px",
      data: { link: data + "/" + key },
    });
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
          // this.notificationService.success(res.message);
          this.onSubmit(0);
        },
        (error) => { }
      );
  }
  ngOnDestroy() {
    var body = document.getElementsByTagName("body")[0];
    body.classList.remove("profile-page");
    var navbar = document.getElementsByTagName("nav")[0];
    navbar.classList.remove("navbar-transparent");
  }

  reset() { }
}

import { Component, HostListener, OnInit, ViewChild } from "@angular/core";
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from "@angular/forms";
import { RdRegister } from "src/app/shared/core/models/register/rd-register";
import { first } from "rxjs/operators";
import { Router } from "@angular/router";
import { RdAuthenticateService } from "src/app/shared/services/authentication/rd-authenticate.service";
import * as skillsInterest from "src/app/shared/core/json-data/skillsInterest.json";
import * as memberShipCategory from "src/app/shared/core/json-data/membershipCategory.json";
import * as countryState from "src/app/shared/core/json-data/countryState.json";
import * as countryCode from "src/app/shared/core/json-data/countryCodes.json";

import {
  codeValidation,
  emailValidation,
  numberValidation,
  passwordValidation,
} from "src/app/shared/core/regx-expression/RegxExpression";
import { NotificationService } from "src/app/shared/services/common/rd-notification/notification.service";
import { RdForgotPassword } from "src/app/shared/core/models/forgot-password/rd-forgot-password";
import { NgxSpinnerService } from "ngx-spinner";
import { AngularEditorConfig } from "@kolkov/angular-editor";
import { EmbedVideoService } from "ngx-embed-video";
import { RdUserService } from "src/app/shared/services/user/rd-user-service";
declare var Razorpay: any;
@Component({
  selector: "app-rd-signup",
  templateUrl: "./rd-signup.component.html",
  styleUrls: ["./rd-signup.component.scss"],
})
export class RdSignupComponent implements OnInit {
  skills: any;
  skillsSubcategory: any;
  membership: any;
  membershipAmount: Number;
  membershipDuration: any;
  countryState: any;
  countryCode: any;
  state: any;
  billStates: any;
  registerFormGroup: FormGroup;
  currentUser: any;
  tempArr: any = [];
  setSameAddress: Boolean;
  @ViewChild("radioBtn") radioBtn: any;
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
  mobileConfig: any = {
    displayKey: "dial_code",
    search: true,
    placeholder: "Select",
    searchPlaceholder: "Search",
    searchOnKey: "dial_code",
    height: "150px",
  };
  radianSkillConfig: any = {
    displayKey: "radianSkillCategoryName",
    search: true,
    placeholder: "Select",
    searchPlaceholder: "Search",
    searchOnKey: "radianSkillCategoryName",
    height: "150px",
  };
  focusPortfolioName: any = "";
  focusPortfolioArtifacts: any = "";
  isUploaded: Boolean = false;
  urls: any = [];
  addMoreImageArray: any = [1];
  isImageType: Boolean = true;
  imageIndex: Number = 0;
  linkURL: String = "";
  serverFile: any = [];
  PortfolioMediaModel: any = [];

  constructor(
    private _formBuilder: FormBuilder,
    private rdAuthenticateService: RdAuthenticateService,
    private spinner: NgxSpinnerService,
    private router: Router,
    private notificationService: NotificationService,
    private embedService: EmbedVideoService,
    private userService: RdUserService
  ) {
    // this.skills = skillsInterest.SkillsInterest;
    // this.membership = memberShipCategory.MembershipCategories;
    // this.countryState = countryState.Countries;
    // this.countryCode = countryCode.CountryCodes;

    this.skills = (skillsInterest as any).default;
    //this.membership = (memberShipCategory as any).default;
    this.membership = (memberShipCategory as any).default.filter(
      (x: any) =>
        x.name === "Basic" ||
        x.name === "Premium Monthly" ||
        x.name === "Premium Annual"
    );
    this.countryState = (countryState as any).default;
    this.countryCode = (countryCode as any).default;
    this.setSameAddress = false;
  }

  ngOnInit(): void {
    this.initRegisterForm();
  }
  initRegisterForm() {
    this.registerFormGroup = this._formBuilder.group({
      isUser: [true, Validators.required],
      organizationName: [""],
      uniqueNumber: [""],
      firstName: ["", Validators.required],
      middleName: [""],
      lastName: ["", Validators.required],
      country: ["", Validators.required],
      street: ["", Validators.required],
      city: ["", Validators.required],
      state: ["", Validators.required],
      zip: ["", Validators.required],
      memberShip: ["", Validators.required],
      membershipAmount: [""],
      membershipDuration: [""],
      email: ["", [Validators.required, Validators.email, emailValidation]],
      password: ["", [Validators.required, passwordValidation]],
      confirmPassword: ["", Validators.required],
      profileSkillName: ["", Validators.required],
      profileSkillSubCategory: ["", Validators.required],
      paymentMethod: [""],
      cardName: [""],
      cardNumber: [""],
      cardSecurity: [""],
      cardExpiry: [""],
      billingAddress: ["", Validators.required],
      billCountry: ["", Validators.required],
      billStreet: ["", Validators.required],
      billCity: ["", Validators.required],
      billState: ["", Validators.required],
      billZip: ["", Validators.required],
      termCondition: ["", Validators.required],
      mobileCountryCode: ["", [Validators.required]],
      cell: ["", [Validators.required, numberValidation]],
      altMmobileCountryCode: [""],
      altMobileNumber: [""],
      // PortfolioName: new FormControl(
      //   "",
      //   Validators.compose([Validators.required])
      // ),
      // PortfolioArtifacts: new FormControl(
      //   "",
      //   Validators.compose([Validators.required])
      // ),
      // PortfolioMedia: new FormControl(""),
      linkURL: new FormControl(""),
    });
  }
  // convenience getter for easy access to form fields
  get registerForm() {
    return this.registerFormGroup.controls;
  }
  getStates(event: any) {
    this.registerForm.country.setValue(event.country);
    this.state = event.states;
    this.registerForm.state.setValue("");
  }
  getBillingStates(event: any) {
    this.billStates = event.states;
    this.registerForm.billState.setValue("");
  }
  getSkillSubCategory(event: any) {
    this.registerForm.profileSkillName.setValue(event.radianSkillCategoryId);
    this.skillsSubcategory = event.radianSkillSubCategories;
  }
  mobileCode(event: any) {
    this.registerForm.mobileCountryCode.setValue(event.dial_code);
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
    this.registerForm.profileSkillSubCategory.setValue(this.tempArr.join(","));
  }
  onSelectMembership(event, item: any) {
    if (event.target.checked) {
      this.registerForm.membershipAmount.setValue(item.amount);
      this.registerForm.membershipDuration.setValue(item.name);
    }
  }

  checkEmailExists() {
    this.registerFormGroup.controls["email"].setValue(
      this.registerFormGroup.controls["email"].value.split(" ").join("")
    );
    this.rdAuthenticateService
      .checkEmailExists(new RdForgotPassword(this.registerFormGroup.value))
      .pipe(first())
      .subscribe(
        (res) => {
          if (res.status) {
            this.notificationService.success("Email already is in use.");
            this.registerFormGroup.controls.email.setValue("");
          }
        },
        (error) => {
          this.notificationService.error(
            "Something went wrong.Pleased try again."
          );
        }
      );
  }
  setBilingAddress() {
    if (this.registerForm.billingAddress.value) {
      this.registerFormGroup.controls["billCountry"].setValue(
        this.registerForm.country.value
      );
      this.registerFormGroup.controls["billCountry"].disabled;
      this.registerFormGroup.controls["billStreet"].setValue(
        this.registerForm.street.value
      );
      this.registerFormGroup.controls["billStreet"].disabled;
      this.registerFormGroup.controls["billCity"].setValue(
        this.registerForm.city.value
      );
      this.registerFormGroup.controls["billCity"].disabled;
      this.registerFormGroup.controls["billState"].setValue(
        this.registerForm.state.value
      );
      this.registerFormGroup.controls["billState"].disabled;
      this.registerFormGroup.controls["billZip"].setValue(
        this.registerForm.zip.value
      );
      this.registerFormGroup.controls["billZip"].disabled;
      this.registerFormGroup.updateValueAndValidity();
    } else {
      this.registerFormGroup.controls["billCountry"].setValue("");
      this.registerFormGroup.controls["billCountry"].enabled;
      this.registerFormGroup.controls["billStreet"].setValue("");
      this.registerFormGroup.controls["billStreet"].enabled;
      this.registerFormGroup.controls["billCity"].setValue("");
      this.registerFormGroup.controls["billCity"].enabled;
      this.registerFormGroup.controls["billState"].setValue("");
      this.registerFormGroup.controls["billState"].enabled;
      this.registerFormGroup.controls["billZip"].setValue("");
      this.registerFormGroup.controls["billZip"].enabled;
      this.registerFormGroup.updateValueAndValidity();
    }
  }
  onSubmit() {
    console.log(this.registerForm.memberShip.value)
    // Stop here if form is invalid
    if (this.registerFormGroup.invalid) {
      this.notificationService.error("Please fill in the required fields");
      this.validateAllFormFields(this.registerFormGroup);
      this.spinner.hide();
      return;
    } else {

      console.log(this.registerFormGroup.controls["memberShip"].value)
      if (parseInt(this.registerFormGroup.controls["memberShip"].value) === 1) {
        this.spinner.show();
        this.createUserDirect()
      } else {
        this.createUser();
      }

    }
  }
  createUserDirect() {
    this.rdAuthenticateService
      .registerDirect(new RdRegister(this.registerFormGroup.value))
      .pipe(first())
      .subscribe(
        (res) => {
          if (res.status) {
            this.notificationService.success('Congratulations, Successfully Registered!');
            setTimeout(() => {
              this.spinner.hide();
              this.router.navigate(["/home"]);
            }, 1000);
          }
        },
        (error) => {
          console.log(error)
          this.spinner.hide();
          this.notificationService.error(
            "Something went wrong.Please try again."
          );
        }
      );
  }
  createUser() {
    this.rdAuthenticateService
      .register(new RdRegister(this.registerFormGroup.value))
      .pipe(first())
      .subscribe(
        (res) => {
          if (res.status) {
            const options: any = {
              order_id: res.razorPayOrderId, // order_id created by you in backend
              theme: {
                color: "#0c238a",
              },
              handler: function (response) {
                var event = new CustomEvent("payment.success", {
                  detail: response,
                  bubbles: true,
                  cancelable: true,
                });
                window.dispatchEvent(event);
              },
              modal: {
                escape: false,
                ondismiss: function (response) {
                  if (confirm("Are you sure, you want to close the form?")) {
                    var event = new CustomEvent("modal.ondismiss", {
                      detail: response,
                      bubbles: true,
                      cancelable: true,
                    });
                    window.dispatchEvent(event);
                  }
                },
              },
            };
            var rzp1 = new Razorpay(options);
            rzp1.open();

            rzp1.on("payment.failed", function (response) {
              // Todo - store this information in the server
              this.error = response.error.reason;
              this.spinner.hide();
            });
          }
        },
        (error) => {
          this.spinner.hide();
          this.notificationService.error(
            "Something went wrong.Please try again."
          );
        }
      );
  }
  @HostListener("window:payment.success", ["$event"])
  onPaymentSuccess(event): void {
    event.detail.UserId = "";
    event.detail.MembershipId = "";
    this.rdAuthenticateService.verifyPayment(event.detail).subscribe(
      (data) => {
        this.notificationService.success(data.message);
        setTimeout(() => {
          this.spinner.hide();
          this.router.navigate(["/home"]);
        }, 1000);
      },
      (err) => {
        this.spinner.hide();
      }
    );
  }
  @HostListener("window:modal.ondismiss", ["$event"])
  onPaymentModelClose(event): void {
    this.spinner.hide();
    this.router.navigate(["/home"]);
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
  reset() {
    this.urls = [];
    this.initRegisterForm();
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
  changeUserType(event: any) {
    this.membership = [];
    if (this.registerForm.isUser.value) {
      this.registerForm.organizationName.removeValidators(Validators.required);
      this.registerForm.uniqueNumber.removeValidators(Validators.required);
      this.registerForm.organizationName.setValue("");
      this.registerForm.uniqueNumber.setValue("");
      this.membership = (memberShipCategory as any).default.filter(
        (x: any) =>
          x.name === "Basic" ||
          x.name === "Premium Monthly" ||
          x.name === "Premium Annual"
      );
    } else {
      this.registerForm.organizationName.addValidators(Validators.required);
      this.registerForm.uniqueNumber.addValidators(Validators.required);
      this.membership = (memberShipCategory as any).default.filter(
        (x: any) =>
          //x.name === "Premium Monthly" ||
          //x.name === "Premium Annual" ||
          x.name === "Corporate Monthly" ||
          x.name === "Corporate Annual"
      );

      this.membership = [...this.membership];
      this.registerForm.memberShip.setValue(this.membership[0].Id);
    }
    // if (this.registerForm.isUser.value === true) {
    //   this.registerForm.organizationName.removeValidators(Validators.required);
    //   this.registerForm.uniqueNumber.removeValidators(Validators.required);
    //   this.membership = (memberShipCategory as any).default;
    // } else {
    //   this.registerForm.organizationName.addValidators(Validators.required);
    //   this.registerForm.uniqueNumber.addValidators(Validators.required);
    //   this.membership = (memberShipCategory as any).default.filter(
    //     (x: any) =>
    //       x.name === "Premium Monthly" ||
    //       x.name === "Premium Annual" ||
    //       x.name === "Corporate Monthly" ||
    //       x.name === "Corporate Annual"
    //   );
    //   this.membership = [...this.membership];
    //   this.registerForm.memberShip.setValue(this.membership[0].Id);
    // }
  }
}

import { animate, style, transition, trigger } from "@angular/animations";
import { Component, HostListener, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { Router } from "@angular/router";
import { NgxSpinnerService } from "ngx-spinner";
import { first } from "rxjs/operators";
import * as memberShipCategory from "src/app/shared/core/json-data/membershipCategory.json";
import { RdUserAccount } from "src/app/shared/core/models/rd-common/rd-common";
import { RdAuthenticateService } from "src/app/shared/services/authentication/rd-authenticate.service";
import { NotificationService } from "src/app/shared/services/common/rd-notification/notification.service";
import { RdUserService } from "src/app/shared/services/user/rd-user-service";
declare var Razorpay: any;
@Component({
  selector: "app-rd-my-account",
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
  templateUrl: "./rd-my-account.component.html",
  styleUrls: ["./rd-my-account.component.scss"],
})
export class RdMyAccountComponent implements OnInit {
  upgradeMembershipCategoryFormGroup: FormGroup;
  membershipData: any = [];
  // membershipAmount: Number;
  label: any = "";
  loggedUser: any = [];
  selectedMemberShip: any = "";
  currentUser: any = [];
  selectedmemberShip: any = [];
  constructor(
    private _formBuilder: FormBuilder,
    private rdAuthenticateService: RdAuthenticateService,
    private spinner: NgxSpinnerService,
    private notificationService: NotificationService,
    private rdUserService: RdUserService,
    private router: Router
  ) {
    this.loggedUser = this.rdAuthenticateService.getLocalStorageData();

    this.currentUser = this.rdAuthenticateService.getLocalStorageData();

    if (this.currentUser.userType === "1") {
      this.membershipData = (memberShipCategory as any).default.filter(
        (x: any) =>
          x.name === "Premium Monthly" ||
          x.name === "Premium Annual"
      );
    } else {
      this.membershipData = (memberShipCategory as any).default.filter(
        (x: any) =>
          x.name === "Corporate Monthly" ||
          x.name === "Corporate Annual"
      );
    }
    this.selectedMemberShip = this.membershipData.filter((x: any) => x.Id === parseInt(this.loggedUser.membership))[0];
  }

  ngOnInit() {
    this.initRegisterForm();
  }
  initRegisterForm() {
    this.upgradeMembershipCategoryFormGroup = this._formBuilder.group({
      memberShip: [this.selectedMemberShip.Id, Validators.required],
      membershipAmount: [this.selectedMemberShip.amount],
      membershipDuration: [this.selectedMemberShip.name],
    });
    this.upgradeMembershipCategoryFormGroup.controls["memberShip"].setValue(
      this.loggedUser.membership
    );
    this.label = (memberShipCategory as any).default.filter(
      (x: any) => x.Id === parseInt(this.loggedUser.membership)
    )[0].name;
  }

  onSelectMembership(event, item: any) {
    if (event.target.checked) {
      this.selectedMemberShip = item.Id;
      this.upgradeMembershipCategoryFormGroup.controls[
        "membershipAmount"
      ].setValue(item.amount);
      this.upgradeMembershipCategoryFormGroup.controls[
        "membershipDuration"
      ].setValue(item.name);
    }
  }

  onSubmit() {
    this.spinner.show();
    // Stop here if form is invalid
    if (this.upgradeMembershipCategoryFormGroup.invalid) {
      this.notificationService.error("Please fill in the required fields");
      this.validateAllFormFields(this.upgradeMembershipCategoryFormGroup);
      this.spinner.hide();
      return;
    }
    this.rdUserService
      .upgradePlan(
        new RdUserAccount(this.upgradeMembershipCategoryFormGroup.value)
      )
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
                this.spinner.hide();
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
                    this.spinner.hide();
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
    event.detail.UserId = parseInt(this.loggedUser.id);
    event.detail.MembershipId = this.selectedMemberShip;
    this.rdAuthenticateService.verifyPayment(event.detail).subscribe(
      (data) => {
        this.notificationService.success(data.message);
        setTimeout(() => {
          this.spinner.hide();
          this.rdAuthenticateService.logout();
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
    // this.router.navigate(['/home']);
    this.spinner.hide();
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
}

import { Component, HostListener, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { first } from 'rxjs/operators';
import * as memberShipCategory from 'src/app/shared/core/json-data/membershipCategory.json';
import { RdUserAccount } from 'src/app/shared/core/models/rd-common/rd-common';
import { RdAuthenticateService } from 'src/app/shared/services/authentication/rd-authenticate.service';
import { NotificationService } from 'src/app/shared/services/common/rd-notification/notification.service';
import { RdUserService } from 'src/app/shared/services/user/rd-user-service';
declare var Razorpay: any;
@Component({
  selector: 'app-rd-my-account',
  templateUrl: './rd-my-account.component.html',
  styleUrls: ['./rd-my-account.component.scss']
})
export class RdMyAccountComponent implements OnInit {

  upgradeMembershipCategoryFormGroup: FormGroup;
  membershipData: any;
  // membershipAmount: Number;
  label: any='';
  loggedUser:any=[];
  selectedMemberShip:any='';
  constructor(private _formBuilder: FormBuilder,private rdAuthenticateService: RdAuthenticateService,
    private spinner: NgxSpinnerService,private notificationService: NotificationService,private rdUserService:RdUserService,
    private router: Router) { 
    this.loggedUser = this.rdAuthenticateService.getLocalStorageData();
    
    this.membershipData = (memberShipCategory as any).default.filter(
      (x: any) =>
        x.name === 'Monthly' ||
        x.name === 'Quarterly' ||
        x.name === 'Semi Annual' ||
        x.name === 'Annual'
    );
  }

  ngOnInit() {
    this.initRegisterForm();
  }
  initRegisterForm() {
    this.upgradeMembershipCategoryFormGroup = this._formBuilder.group({
      memberShip: [this.loggedUser.membership, Validators.required],
      membershipAmount: [''],
      membershipDuration: ['']
    });
    this.upgradeMembershipCategoryFormGroup.controls['memberShip'].setValue(this.loggedUser.membership);
    this.label =  (memberShipCategory as any).default.filter((x:any)=>x.Id===parseInt(this.loggedUser.membership))[0].name;
    
  }

  onSelectMembership(event, item: any) {
    if (event.target.checked) {
      this.selectedMemberShip = item.Id;
      this.upgradeMembershipCategoryFormGroup.controls['membershipAmount'].setValue(item.amount);
      this.upgradeMembershipCategoryFormGroup.controls['membershipDuration'].setValue(item.name);
    }
  }

  onSubmit(){
    this.spinner.show();
    // Stop here if form is invalid
    if (this.upgradeMembershipCategoryFormGroup.invalid) {
      this.notificationService.error('Please fill in the required fields');
      this.validateAllFormFields(this.upgradeMembershipCategoryFormGroup);
      this.spinner.hide();
      return;
    }
    this.rdUserService
      .upgradePlan(new RdUserAccount(this.upgradeMembershipCategoryFormGroup.value))
      .pipe(first())
      .subscribe(
        (res) => {
          if (res.status) {
            const options: any = {
              order_id: res.razorPayOrderId, // order_id created by you in backend
              theme: {
                color: '#0c238a',
              },
              handler: function (response) {
                var event = new CustomEvent('payment.success', {
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
                    var event = new CustomEvent('modal.ondismiss', {
                      detail: response,
                      bubbles: true,
                      cancelable: true,
                    });
                    window.dispatchEvent(event);
                  }
                }
              }
            };
            var rzp1 = new Razorpay(options);
            rzp1.open();
          
            rzp1.on('payment.failed', function (response) {
              // Todo - store this information in the server
              console.log(response.error.code);
              console.log(response.error.description);
              console.log(response.error.source);
              console.log(response.error.step);
              console.log(response.error.reason);
              console.log(response.error.metadata.order_id);
              console.log(response.error.metadata.payment_id);
              this.error = response.error.reason;
              this.spinner.hide();
            });
          }
        },
        (error) => {
          this.spinner.hide();
          this.notificationService.error(
            'Something went wrong.Please try again.'
          );
        }
      );
  }
  @HostListener('window:payment.success', ['$event'])
  onPaymentSuccess(event): void {
    event.detail.UserId = parseInt(this.loggedUser.id);
    event.detail.MembershipId = this.selectedMemberShip;
    this.rdAuthenticateService
      .verifyPayment(event.detail)
      .subscribe(
        (data) => {
          
          this.notificationService.success(data.message);
          setTimeout(() => {
            this.spinner.hide();
            this.rdAuthenticateService.logout();
            this.router.navigate(['/home']);
          }, 1000);
        },
        (err) => {
          this.spinner.hide();
        }
      );
  }
  @HostListener('window:modal.ondismiss', ['$event'])
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

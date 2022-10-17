import { HostListener, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { RdLogin } from '../../core/models/login/rd-login';
import { RdRegister } from '../../core/models/register/rd-register';
import { RdEncryptDecryptService } from '../encrypt-decrypt/rd-encrypt-decrypt.service';
import { environment } from 'src/environments/environment';
import { WindowRefService } from '../razor-pay/window-ref.service';
@Injectable({
  providedIn: 'root',
})
export class RdAuthenticateService {
  public currentUserSubject: any;
  constructor(
    private winRef: WindowRefService,
    private http: HttpClient,
    private _encryptDecryptService: RdEncryptDecryptService
  ) {
    this.currentUserSubject = this.getLocalStorageData();
  }
  login(RdLogin: RdLogin) {
    var data = this._encryptDecryptService.ecryptModel(RdLogin);
    return this.http
      .post<any>(
        environment.apiCommon + 'radianApi/Users/loginDetails.php',
        data
      )
      .pipe(
        map((res) => {
          if (res.status) {
            
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            this.setLocalStorageData(res.data);
          }
          return res;
        })
      );
  }
  register(RdRegister: RdRegister) {
    
    var data = this._encryptDecryptService.ecryptModel(RdRegister);
    return this.http
      .post<any>(
        environment.apiCommon + 'radianApi/Users/registrationDetailsTemp.php',
        JSON.stringify(data)
      )
      .pipe(
        map((res) => {
          return res;
          // return this.razorPayment(res);
        })
      );
  }
  forgotPassword(rdForgotPassword: any) {
    var data = this._encryptDecryptService.ecryptModel(rdForgotPassword);
    
    return this.http
      .post<any>(
        environment.apiCommon + 'radianApi/Users/forgotPassword.php',
        
        JSON.stringify(data)
      )
      .pipe(
        map((res) => {
          return res;
        })
      );
    // return null
  }
  resetPassword(rdResetPassword: any) {
    var data = this._encryptDecryptService.ecryptModel(rdResetPassword);
    return this.http
      .post<any>(
        environment.apiCommon + 'radianApi/Users/resetPassword.php',
        JSON.stringify(data)
      )
      .pipe(
        map((res) => {
          return res;
        })
      );
    // return null
  }
  checkEmailExists(rdForgotPassword: any) {
    var data = this._encryptDecryptService.ecryptModel(rdForgotPassword);
    return this.http
      .post<any>(
        environment.apiCommon + 'radianApi/Users/checkUserExists.php',
        JSON.stringify(data)
      )
      .pipe(
        map((res) => {
          return res;
        })
      );
  }
  // razorPayment(data:any):any{
  //   
  //   const options: any = {
  //     amount: 125500, // amount should be in paise format to display Rs 1255 without decimal point
  //     currency: 'INR',
  //     name: '', // company name or product name
  //     description: '',  // product description
  //     // image: './assets/img/logo-for-razorpay-checkout.png', // company logo or product image
  //     order_id: data.razorPayOrderId, // order_id created by you in backend
  //     modal: {
  //       // We should prevent closing of the form when esc key is pressed.
  //       escape: false,
  //     },
  //     notes: {
  //       // include notes if any
  //     },
  //     theme: {
  //       color: '#0c238a'
  //     },
  //     handler: function (response){
  //       var event = new CustomEvent("payment.success", 
  //           {
  //               detail: response,
  //               bubbles: true,
  //               cancelable: true
  //           }
  //       );    
  //       window.dispatchEvent(event);
  //     }
  //   };
  //   const rzp = new this.winRef.nativeWindow.Razorpay(options);
  //   rzp.open();
  // }
  verifyPayment(response: any):any {
    
    var data = this._encryptDecryptService.ecryptModel(response);
    
    return this.http
      .post<any>(environment.apiCommon + 'radianApi/verify.php', data)
      .pipe(
        map(
          (res) => {
            
            return res;
          },
          (error) => {
            return;
          }
        )
      );
  }

  logout() {
    // remove user from local storage and set current user to null
    localStorage.removeItem('currentUser');
    localStorage.clear();
    this.currentUserSubject = [];
  }
  getLocalStorageData() {
    return localStorage.getItem('currentUser') === null
      ? null
      : JSON.parse(localStorage.getItem('currentUser'));
  }
  setLocalStorageData(data) {
    if (data !== null) {
      localStorage.setItem('currentUser', JSON.stringify(data));
    }
  }
}

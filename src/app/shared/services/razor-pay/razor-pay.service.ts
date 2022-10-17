import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RdEncryptDecryptService } from '../encrypt-decrypt/rd-encrypt-decrypt.service';
import { WindowRefService } from './window-ref.service';

@Injectable({
  providedIn: 'root'
})
export class RazorPayService {

  constructor(private winRef: WindowRefService) { }
  payWithRazor(data:any):any {
    
    const options: any = {
      amount: 125500, // amount should be in paise format to display Rs 1255 without decimal point
      currency: 'INR',
      name: '', // company name or product name
      description: '',  // product description
      // image: './assets/img/logo-for-razorpay-checkout.png', // company logo or product image
      order_id: data.razorPayOrderId, // order_id created by you in backend
      modal: {
        // We should prevent closing of the form when esc key is pressed.
        escape: false,
      },
      notes: {
        // include notes if any
      },
      theme: {
        color: '#0c238a'
      }
    };
    options.handler = ((response:any, error:any) => {
        return response
        // call your backend api to verify payment signature & capture transaction
      });
      options.modal.ondismiss = (() => {
        // handle the case when user closes the form while transaction is in progress
        return null
      });
      
    const rzp = new this.winRef.nativeWindow.Razorpay(options);
    rzp.open();
  }
  // managePayment(response:any){
  //   
  //   var data=this._encryptDecryptService.ecryptModel(response);
  //     // write the new webapi path in following API
  //     return this.http.post<any>(environment.apiCommon+'radianApi/verify.php', data)
  //     .pipe(map(res => {
  //       return res;
  //     },error => {
  //       
  //       return
  //     }));
  // }
}

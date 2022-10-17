import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { NotificationService } from 'src/app/shared/services/common/rd-notification/notification.service';

@Component({
  selector: 'app-rd-contact-us',
  templateUrl: './rd-contact-us.component.html',
  styleUrls: ['./rd-contact-us.component.scss']
})
export class RdContactUsComponent implements OnInit {
  name_focus;
  email_focus;
  message_focus;
  contactUsFormGroup: FormGroup;
  constructor(private _formBuilder: FormBuilder,private notificationService:NotificationService) { }
  ngOnInit(): void {
   this.setLoadForm();
  }

  setLoadForm(){
    this.contactUsFormGroup = this._formBuilder.group({
      FirstName: new FormControl('', [Validators.required]),
      LastName: new FormControl('', [Validators.required]),
      Email: new FormControl('', [Validators.required]),
      ContactNumber: new FormControl('', [Validators.required]),
      Message: new FormControl('', [Validators.required])
    });
  }
   // convenience getter for easy access to form fields
   get contactUsForm() { return this.contactUsFormGroup.controls; }
  onSubmit() {
    // stop here if form is invalid
    if (this.contactUsFormGroup.invalid) {
      this.notificationService.error('Please fill in the required fields');
      this.validateAllFormFields(this.contactUsFormGroup);
      return;
    }
    // display form values on success
    this.setLoadForm();
  }
  validateAllFormFields(formGroup: FormGroup) {         //{1}
    Object.keys(formGroup.controls).forEach(field => {  //{2}
      const control = formGroup.get(field);             //{3}
      if (control instanceof FormControl) {             //{4}
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {        //{5}
        this.validateAllFormFields(control);            //{6}
      }
    });
  }

}

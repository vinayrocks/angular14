import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRoutingModule } from './user-routing.module';
import { RdUserLayoutComponent } from './layout/rd-user-layout/rd-user-layout.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NgxMatDateFormats, NgxMatDatetimePickerModule, NGX_MAT_DATE_FORMATS } from '@angular-material-components/datetime-picker';
import { NgxMatMomentModule } from '@angular-material-components/moment-adapter';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { RadianAccountModule } from './components/radian-account/radian-account.module';
const CUSTOM_DATE_FORMATS: NgxMatDateFormats = {
  parse: {
    dateInput: 'l, LTS'
  },
  display: {
    dateInput: 'YYYY-MM-DD HH:mm:ss',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  }
};
@NgModule({
  declarations: [RdUserLayoutComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
    RouterModule,
    MatExpansionModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    NgxMatDatetimePickerModule,
    NgxMatMomentModule,
    MatDatepickerModule,
    RadianAccountModule
  ],
  providers: [{ provide: NGX_MAT_DATE_FORMATS, useValue: CUSTOM_DATE_FORMATS }]
})
export class UserModule { 
 
}

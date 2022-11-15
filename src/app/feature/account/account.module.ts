import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountRoutingModule } from './account-routing.module';
import { RdSignupComponent } from './components/rd-signup/rd-signup.component';
import { RouterModule } from '@angular/router';
import { RdAccountLayoutComponent } from './layout/rd-account-layout/rd-account-layout.component';
import {MatStepperModule} from '@angular/material/stepper';
import {ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from 'src/app/shared/shared.module';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { NgxSpinnerModule } from 'ngx-spinner';
import { SelectDropDownModule } from 'ngx-select-dropdown';
import { LoginComponent } from './components/login/login.component'

@NgModule({
  declarations: [RdSignupComponent, RdAccountLayoutComponent, LoginComponent],
  imports: [
    CommonModule,
    AccountRoutingModule,
    RouterModule ,
    MatStepperModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatAutocompleteModule,
    NgxSpinnerModule,
    SelectDropDownModule,
    SharedModule.forRoot()
  ]
})
export class AccountModule { }

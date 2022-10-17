import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RadianAccountRoutingModule } from './radian-account-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RdMyAccountComponent } from './components/rd-my-account/rd-my-account.component';


@NgModule({
  declarations: [RdMyAccountComponent],
  imports: [
    CommonModule,
    RadianAccountRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule.forRoot(),
    NgbModule
  ]
})
export class RadianAccountModule { }

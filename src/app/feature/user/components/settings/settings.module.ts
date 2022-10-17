import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsRoutingModule } from './settings-routing.module';
import { RdSettingComponent } from './components/rd-setting/rd-setting.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { JwBootstrapSwitchNg2Module } from 'jw-bootstrap-switch-ng2';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgxSpinnerModule } from 'ngx-spinner';

@NgModule({
  declarations: [RdSettingComponent],
  imports: [
    FormsModule,
    CommonModule,
    SettingsRoutingModule,
    NgbModule,
    JwBootstrapSwitchNg2Module,
    ReactiveFormsModule,
    NgxSpinnerModule,
    SharedModule.forRoot(),
  ]
})
export class SettingsModule { }

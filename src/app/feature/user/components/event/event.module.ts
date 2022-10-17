import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventRoutingModule } from './event-routing.module';
import { RdEventListComponent } from './components/rd-event-list/rd-event-list.component';
import { RdEventAddComponent } from './components/rd-event-add/rd-event-add.component';
import { RdEventEditComponent } from './components/rd-event-edit/rd-event-edit.component';
import { JwBootstrapSwitchNg2Module } from 'jw-bootstrap-switch-ng2';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatStepperModule } from '@angular/material/stepper';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { MatDialogModule } from '@angular/material/dialog';
import { EmbedVideoService } from 'ngx-embed-video';
import { NgxMatDateAdapter, NgxMatDateFormats, NgxMatDatetimePickerModule, NGX_MAT_DATE_FORMATS } from '@angular-material-components/datetime-picker';
import { NgxMatMomentModule, NGX_MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular-material-components/moment-adapter';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DATE_LOCALE } from '@angular/material/core';
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
  declarations: [RdEventListComponent, RdEventAddComponent, RdEventEditComponent],
  imports: [
    CommonModule,
    EventRoutingModule,
    JwBootstrapSwitchNg2Module,
    MatExpansionModule,
    MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule.forRoot(),
    AngularEditorModule,
    MatDialogModule,
    NgxMatDatetimePickerModule,
    NgxMatMomentModule,
    MatDatepickerModule
  ],
  providers: [EmbedVideoService,
    { provide: NGX_MAT_DATE_FORMATS, useValue: CUSTOM_DATE_FORMATS }]
})
export class EventModule { }

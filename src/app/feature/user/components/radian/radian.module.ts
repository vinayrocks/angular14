import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmbedVideo, EmbedVideoService } from 'ngx-embed-video';
import { RadianRoutingModule } from './radian-routing.module';
import { RdRadianListComponent } from './components/rd-radian-list/rd-radian-list.component';
import { RdRadianAddComponent } from './components/rd-radian-add/rd-radian-add.component';
import { RdRadianEditComponent } from './components/rd-radian-edit/rd-radian-edit.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { JwBootstrapSwitchNg2Module } from 'jw-bootstrap-switch-ng2';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatStepperModule } from '@angular/material/stepper';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { ImageCropperModule } from 'ngx-image-cropper';
import { RadianLayoutComponent } from './radian-layout/radian-layout.component';
@NgModule({
  declarations: [RdRadianListComponent, RdRadianAddComponent, RdRadianEditComponent, RadianLayoutComponent],
  imports: [
    CommonModule,
    RadianRoutingModule,
    NgbModule,
    JwBootstrapSwitchNg2Module,
    MatExpansionModule,
    MatStepperModule,
    EmbedVideo.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    SharedModule.forRoot(),
    AngularEditorModule,
    ImageCropperModule
  ],
  providers: [EmbedVideoService],
})
export class RadianModule { }

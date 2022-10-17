import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortfolioRoutingModule } from './portfolio-routing.module';
import { RdPortfolioListComponent } from './components/rd-portfolio-list/rd-portfolio-list.component';
import { RdPortfolioAddComponent } from './components/rd-portfolio-add/rd-portfolio-add.component';
import { RdPortfolioEditComponent } from './components/rd-portfolio-edit/rd-portfolio-edit.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { JwBootstrapSwitchNg2Module } from 'jw-bootstrap-switch-ng2';
import {MatExpansionModule} from '@angular/material/expansion'
import { MatStepperModule } from '@angular/material/stepper';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { ImageCropperModule } from 'ngx-image-cropper';
import { EmbedVideoService } from 'ngx-embed-video';
@NgModule({
  declarations: [RdPortfolioListComponent, RdPortfolioAddComponent, RdPortfolioEditComponent],
  imports: [
    CommonModule,
    PortfolioRoutingModule,
    NgbModule,
    JwBootstrapSwitchNg2Module,
    MatExpansionModule,
    MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule.forRoot(),
    AngularEditorModule,
    ImageCropperModule
  ],
  providers: [EmbedVideoService]
})
export class PortfolioModule { 
}

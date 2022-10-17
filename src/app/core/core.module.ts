import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RdNavbarComponent } from './components/rd-navbar/rd-navbar.component';
import { RdFooterComponent } from './components/rd-footer/rd-footer.component';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { RdLoginComponent } from './components/rd-login/rd-login.component';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { RdForgotPasswordComponent } from './components/rd-forgot-password/rd-forgot-password.component';
import {MatButtonModule} from '@angular/material/button';
import { RdDeleteConfirmationBoxComponent } from './components/rd-delete-confirmation-box/rd-delete-confirmation-box.component';
import { RdUrlLinkBoxComponent } from './components/rd-url-link-box/rd-url-link-box.component';
import { RdUserListBoxComponent } from './components/rd-user-list-box/rd-user-list-box.component';
import {ClipboardModule} from '@angular/cdk/clipboard';

@NgModule({
  declarations: [RdNavbarComponent, RdFooterComponent,RdLoginComponent, 
    RdForgotPasswordComponent, RdDeleteConfirmationBoxComponent, RdUrlLinkBoxComponent, RdUserListBoxComponent],
  imports: [
    CommonModule,
    RouterModule,
    BrowserModule,
    NgbModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule.forRoot(),
    AngularEditorModule,
    MatButtonModule,
    ClipboardModule
  ],
  exports:[
    RdNavbarComponent,
    RdFooterComponent,
    RdDeleteConfirmationBoxComponent
  ],
  entryComponents: [
    RdLoginComponent,
    RdForgotPasswordComponent
  ],
})
export class CoreModule { }

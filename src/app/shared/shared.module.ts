import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RequiredFieldComponent } from './components/required-field/required-field.component';
import { RdAuthenticateService } from './services/authentication/rd-authenticate.service';
import { RdUserService } from './services/user/rd-user-service';
import { RequiredValidationMessageComponent } from './components/required-validation-message/required-validation-message.component';
import { FormatValidationMessageComponent } from './components/format-validation-message/format-validation-message.component';
import { NotmatchedValidationMessageComponent } from './components/notmatched-validation-message/notmatched-validation-message.component';
import { RdEncryptDecryptService } from './services/encrypt-decrypt/rd-encrypt-decrypt.service';
import { PopupImageSliderComponent } from './components/popup-image-slider/popup-image-slider.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { EmbedVideoService } from 'ngx-embed-video';
import { HeaderImageSliderComponent } from './components/header-image-slider/header-image-slider.component';
import { ScriptService } from './services/custom-script/script.service';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BlockCopyDirective } from './components/directives/block-copy.directive';
import { NgxSpinnerService } from 'ngx-spinner';
@NgModule({
  declarations: [RequiredFieldComponent, RequiredValidationMessageComponent, FormatValidationMessageComponent,
     NotmatchedValidationMessageComponent,
     PopupImageSliderComponent,
     HeaderImageSliderComponent,
     BlockCopyDirective],
  imports: [
    CommonModule,
    NgbModule,
    MatSnackBarModule
  ],
  exports:[RequiredFieldComponent,RequiredValidationMessageComponent,FormatValidationMessageComponent,
    NotmatchedValidationMessageComponent,PopupImageSliderComponent,HeaderImageSliderComponent,BlockCopyDirective]
})
export class SharedModule {
  static forRoot(){
    return {
      ngModule:SharedModule,
      providers:[RdAuthenticateService,RdUserService,RdEncryptDecryptService,
        EmbedVideoService,ScriptService,NgxSpinnerService]
    }
  }
 }

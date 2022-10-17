import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GuestRoutingModule } from './guest-routing.module';
import { RdRadianUpdateComponent } from './components/rd-radian-update/rd-radian-update.component';
import { RdMemberSearchComponent } from './components/rd-member-search/rd-member-search.component';
import { RdHomeComponent } from './components/rd-home/rd-home.component';
import { RdGuestLayoutComponent } from './layout/rd-guest-layout/rd-guest-layout.component';
import { RdAboutUsComponent } from './components/rd-about-us/rd-about-us.component';
import { RdContactUsComponent } from './components/rd-contact-us/rd-contact-us.component';
import { RdHowItWorksComponent } from './components/rd-how-it-works/rd-how-it-works.component';
import { RdPrivacyPolicyComponent } from './components/rd-privacy-policy/rd-privacy-policy.component';
import { RdTermsOfUseComponent } from './components/rd-terms-of-use/rd-terms-of-use.component';
import { RdVisionMissionComponent } from './components/rd-vision-mission/rd-vision-mission.component';
import { RdWhoWeAreComponent } from './components/rd-who-we-are/rd-who-we-are.component'
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import {MatExpansionModule} from '@angular/material/expansion';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { MatIconModule } from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field'
import { AngularEditorModule } from '@kolkov/angular-editor';
import { RdRadianDetailComponent } from './components/rd-radian-detail/rd-radian-detail.component';
import { RdMemberDetailComponent } from './components/rd-member-detail/rd-member-detail.component';
import { RdMemberPortfolioComponent } from './components/rd-member-portfolio/rd-member-portfolio.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { RdSubscriptionRefundPolicyComponent } from './components/rd-subscription-refund-policy/rd-subscription-refund-policy.component';
import { RdConversationComponent } from './components/rd-conversation/rd-conversation.component';
@NgModule({
  declarations: [RdRadianUpdateComponent, RdMemberSearchComponent, RdHomeComponent,
    RdGuestLayoutComponent, RdAboutUsComponent, RdContactUsComponent, RdHowItWorksComponent,
    RdPrivacyPolicyComponent, RdTermsOfUseComponent, RdVisionMissionComponent, 
    RdWhoWeAreComponent,RdRadianDetailComponent, RdMemberDetailComponent, RdMemberPortfolioComponent, RdSubscriptionRefundPolicyComponent, RdConversationComponent],
  imports: [
    CommonModule,
    GuestRoutingModule,
    ReactiveFormsModule,
    MatExpansionModule,
    FormsModule,
    NgbModule,
    SlickCarouselModule,
    MatIconModule,
    MatFormFieldModule,
    AngularEditorModule,
    NgxSpinnerModule,
    SharedModule.forRoot()
  ]
})
export class GuestModule { }

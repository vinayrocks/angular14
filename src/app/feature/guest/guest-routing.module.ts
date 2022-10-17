import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RdHomeComponent } from './components/rd-home/rd-home.component';
import { RdRadianUpdateComponent } from './components/rd-radian-update/rd-radian-update.component';
import { RdMemberSearchComponent } from './components/rd-member-search/rd-member-search.component';
import { RdGuestLayoutComponent } from './layout/rd-guest-layout/rd-guest-layout.component';
import { RdAboutUsComponent } from './components/rd-about-us/rd-about-us.component';
import { RdWhoWeAreComponent } from './components/rd-who-we-are/rd-who-we-are.component';
import { RdVisionMissionComponent } from './components/rd-vision-mission/rd-vision-mission.component';
import { RdHowItWorksComponent } from './components/rd-how-it-works/rd-how-it-works.component';
import { RdContactUsComponent } from './components/rd-contact-us/rd-contact-us.component';
import { RdTermsOfUseComponent } from './components/rd-terms-of-use/rd-terms-of-use.component';
import { RdPrivacyPolicyComponent } from './components/rd-privacy-policy/rd-privacy-policy.component';
import { RdRadianDetailComponent } from './components/rd-radian-detail/rd-radian-detail.component';
import { RdMemberDetailComponent } from './components/rd-member-detail/rd-member-detail.component';
import { RdMemberPortfolioComponent } from './components/rd-member-portfolio/rd-member-portfolio.component';
import { RdSubscriptionRefundPolicyComponent } from './components/rd-subscription-refund-policy/rd-subscription-refund-policy.component';
import { RdConversationComponent } from './components/rd-conversation/rd-conversation.component';


const routes: Routes = [
  {
    path:'',
    component: RdGuestLayoutComponent,
    children: [
     {path: '',redirectTo: 'home'},
     {path:'home',component:RdHomeComponent},
     {path:'about-us',component:RdAboutUsComponent},
     {path:'contact-us',component:RdContactUsComponent},
     {path:'conversations',component:RdConversationComponent},
     {path:'our-process',component:RdHowItWorksComponent},
     {path:'updates',component:RdRadianUpdateComponent},
     {path:'detail/:id',component:RdRadianDetailComponent},
     {path:'search',component:RdMemberSearchComponent},
     {path:'member-detail/:id',component:RdMemberDetailComponent},
     {path:'our-purpose',component:RdWhoWeAreComponent},
     {path:'vission-mission',component:RdVisionMissionComponent},
     {path:'term-of-use',component:RdTermsOfUseComponent},
     {path:'privacy-policy',component:RdPrivacyPolicyComponent},
     {path:'subscription-refund-policy',component:RdSubscriptionRefundPolicyComponent},
     {path:'portfolio-detail/:id',component:RdMemberPortfolioComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GuestRoutingModule { }

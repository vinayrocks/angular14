import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RdResetPasswordComponent } from './rd-reset-password/rd-reset-password.component';
import { RdAuthGuard } from './shared/authentication/guard/rd-auth.guard';

const routes: Routes = [
  {
    path:'',
    pathMatch: 'full',
    redirectTo: ''
  },
  {
    path:'',
    loadChildren: () => import('./feature/guest/guest.module').then(x => x.GuestModule)
  },
  {
    path:'account',
    loadChildren: () => import('./feature/account/account.module').then(x => x.AccountModule)
  },
  {
    path:'resetpassword',
    component: RdResetPasswordComponent
  },
  {
    path:'member',
    loadChildren: () => import('./feature/user/user.module').then(x => x.UserModule),
    canActivate: [RdAuthGuard] 
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

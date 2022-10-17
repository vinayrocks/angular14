import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RdSettingComponent } from './components/rd-setting/rd-setting.component';


const routes: Routes = [
  {
    path:"",
    redirectTo: 'view'
  },
  {
    path:'view',
    component:RdSettingComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule { }

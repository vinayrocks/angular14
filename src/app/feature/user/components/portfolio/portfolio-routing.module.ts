import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RdPortfolioListComponent } from './components/rd-portfolio-list/rd-portfolio-list.component';
import { RdPortfolioAddComponent } from './components/rd-portfolio-add/rd-portfolio-add.component';
import { RdPortfolioEditComponent } from './components/rd-portfolio-edit/rd-portfolio-edit.component';


const routes: Routes = [
  {
    path:'',
    redirectTo: 'view'
  },
  {
    path:'view',
    component:RdPortfolioListComponent
  },
  {
    path:'add',
    component:RdPortfolioAddComponent
  },
  {
    path:'edit/:id',
    component:RdPortfolioEditComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PortfolioRoutingModule { }

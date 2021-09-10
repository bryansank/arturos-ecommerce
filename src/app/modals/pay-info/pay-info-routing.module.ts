import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PayInfoPage } from './pay-info.page';

const routes: Routes = [
  {
    path: '',
    component: PayInfoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PayInfoPageRoutingModule {}

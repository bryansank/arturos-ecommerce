import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ForgotPasswordViewPage } from './forgot-password-view.page';

const routes: Routes = [
  {
    path: '',
    component: ForgotPasswordViewPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ForgotPasswordViewPageRoutingModule {}

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LogoutViewPage } from './logout-view.page';

const routes: Routes = [
  {
    path: '',
    component: LogoutViewPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LogoutViewPageRoutingModule {}

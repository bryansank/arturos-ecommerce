import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NotfoundViewPage } from './notfound-view.page';

const routes: Routes = [
  {
    path: '',
    component: NotfoundViewPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NotfoundViewPageRoutingModule {}

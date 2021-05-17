import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PromotionsViewPage } from './promotions-view.page';

const routes: Routes = [
  {
    path: '',
    component: PromotionsViewPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PromotionsViewPageRoutingModule {}

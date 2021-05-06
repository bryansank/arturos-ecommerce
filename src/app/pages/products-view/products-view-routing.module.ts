import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductsViewPage } from './products-view.page';

const routes: Routes = [
  {
    path: '',
    component: ProductsViewPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductsViewPageRoutingModule {}

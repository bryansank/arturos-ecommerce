import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CartViewPageRoutingModule } from './cart-view-routing.module';

import { CartViewPage } from './cart-view.page';
import { OurComponentsModule } from 'src/app/components/components.module';
import { BuildOrderPageModule } from 'src/app/modals/build-order/build-order.module';
import { BuildOrderPage } from 'src/app/modals/build-order/build-order.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CartViewPageRoutingModule,
    OurComponentsModule,
    BuildOrderPageModule
  ],
  declarations: [CartViewPage],
  entryComponents: [
    BuildOrderPage
  ]
})
export class CartViewPageModule {}

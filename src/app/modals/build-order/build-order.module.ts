import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BuildOrderPageRoutingModule } from './build-order-routing.module';

import { BuildOrderPage } from './build-order.page';
import { PayInfoPage } from '../pay-info/pay-info.page';
import { PayInfoPageModule } from '../pay-info/pay-info.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BuildOrderPageRoutingModule,
    PayInfoPageModule,
  ],
  declarations: [BuildOrderPage],
  entryComponents: [
    PayInfoPage
  ]
})
export class BuildOrderPageModule {}

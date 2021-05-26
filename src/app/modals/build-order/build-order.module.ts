import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BuildOrderPageRoutingModule } from './build-order-routing.module';

import { BuildOrderPage } from './build-order.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BuildOrderPageRoutingModule
  ],
  declarations: [BuildOrderPage]
})
export class BuildOrderPageModule {}

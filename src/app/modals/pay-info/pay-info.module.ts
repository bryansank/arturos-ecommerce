import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PayInfoPageRoutingModule } from './pay-info-routing.module';

import { PayInfoPage } from './pay-info.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PayInfoPageRoutingModule
  ],
  declarations: [PayInfoPage]
})
export class PayInfoPageModule {}

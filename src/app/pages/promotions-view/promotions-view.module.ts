import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PromotionsViewPageRoutingModule } from './promotions-view-routing.module';

import { PromotionsViewPage } from './promotions-view.page';
import { OurComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PromotionsViewPageRoutingModule,
    OurComponentsModule
  ],
  declarations: [PromotionsViewPage]
})
export class PromotionsViewPageModule {}

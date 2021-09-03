import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomeViewPageRoutingModule } from './home-view-routing.module';

import { HomeViewPage } from './home-view.page';
import { OurComponentsModule } from 'src/app/components/components.module';
import { BuildOrderPageModule } from 'src/app/modals/build-order/build-order.module';
import { BuildOrderPage } from 'src/app/modals/build-order/build-order.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomeViewPageRoutingModule,
    OurComponentsModule,

    //Para Modal
    BuildOrderPageModule
  ],
  declarations: [HomeViewPage],
  //Para Modal
  entryComponents: [
    BuildOrderPage
  ]
})
export class HomeViewPageModule {}

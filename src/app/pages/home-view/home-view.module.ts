import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomeViewPageRoutingModule } from './home-view-routing.module';

import { HomeViewPage } from './home-view.page';
import { OurComponentsModule } from 'src/app/components/components.module';
import { BuildOrderPageModule } from 'src/app/modals/build-order/build-order.module';
import { BuildOrderPage } from 'src/app/modals/build-order/build-order.page';
import { ChoiceRestaurantPageModule } from 'src/app/modals/choice-restaurant/choice-restaurant.module';
import { ChoiceRestaurantPage } from 'src/app/modals/choice-restaurant/choice-restaurant.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomeViewPageRoutingModule,
    OurComponentsModule,

    //Para Modal order
    BuildOrderPageModule,
    //modal rest
    ChoiceRestaurantPageModule,
  ],
  declarations: [HomeViewPage],
  //Para Modal
  entryComponents: [
    BuildOrderPage,
    ChoiceRestaurantPage,
  ]
})
export class HomeViewPageModule {}

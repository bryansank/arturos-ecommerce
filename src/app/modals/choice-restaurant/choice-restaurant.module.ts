import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChoiceRestaurantPageRoutingModule } from './choice-restaurant-routing.module';

import { ChoiceRestaurantPage } from './choice-restaurant.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChoiceRestaurantPageRoutingModule
  ],
  declarations: [ChoiceRestaurantPage]
})
export class ChoiceRestaurantPageModule {}

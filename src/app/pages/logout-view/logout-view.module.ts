import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LogoutViewPageRoutingModule } from './logout-view-routing.module';

import { LogoutViewPage } from './logout-view.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LogoutViewPageRoutingModule
  ],
  declarations: [LogoutViewPage]
})
export class LogoutViewPageModule {}

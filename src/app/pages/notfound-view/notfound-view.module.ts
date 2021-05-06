import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NotfoundViewPageRoutingModule } from './notfound-view-routing.module';

import { NotfoundViewPage } from './notfound-view.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NotfoundViewPageRoutingModule
  ],
  declarations: [NotfoundViewPage]
})
export class NotfoundViewPageModule {}

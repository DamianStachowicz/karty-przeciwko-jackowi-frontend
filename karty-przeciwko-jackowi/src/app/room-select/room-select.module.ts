import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RoomSelectPageRoutingModule } from './room-select-routing.module';

import { RoomSelectPage } from './room-select.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RoomSelectPageRoutingModule
  ],
  declarations: [RoomSelectPage]
})
export class RoomSelectPageModule {}

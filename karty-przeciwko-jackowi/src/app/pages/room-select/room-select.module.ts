import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { RoomSelectPage } from './room-select.page';
import { RoomSelectPageRoutingModule } from './room-select-routing.module';

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

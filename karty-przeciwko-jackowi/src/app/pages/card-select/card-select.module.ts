import { CardSelectPage } from './card-select.page';
import { CardSelectPageRoutingModule } from './card-select-routing.module';
import { CommonModule } from '@angular/common';
import { ComponentsModule } from '../../components/components.module';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CardSelectPageRoutingModule,
    ComponentsModule
  ],
  declarations: [
    CardSelectPage
  ]
})
export class CardSelectPageModule {}

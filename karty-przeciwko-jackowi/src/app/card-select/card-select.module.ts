import { CardSelectPage } from './card-select.page';
import { CardSelectPageRoutingModule } from './card-select-routing.module';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { AnswerCardComponent } from '../answer-card/answer-card.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CardSelectPageRoutingModule,
  ],
  declarations: [
    CardSelectPage,
    AnswerCardComponent
  ]
})
export class CardSelectPageModule {}

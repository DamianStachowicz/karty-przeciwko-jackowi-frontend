import { CommonModule } from '@angular/common';
import { ComponentsModule } from '../../components/components.module';
import { CurrentQuestionPage } from './current-question.page';
import { CurrentQuestionPageRoutingModule } from './current-question-routing.module';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CurrentQuestionPageRoutingModule,
    ComponentsModule
  ],
  declarations: [
    CurrentQuestionPage
  ]
})
export class CurrentQuestionPageModule {}

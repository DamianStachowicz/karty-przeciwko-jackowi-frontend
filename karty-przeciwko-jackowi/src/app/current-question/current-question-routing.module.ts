import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CurrentQuestionPage } from './current-question.page';

const routes: Routes = [
  {
    path: '',
    component: CurrentQuestionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CurrentQuestionPageRoutingModule {}

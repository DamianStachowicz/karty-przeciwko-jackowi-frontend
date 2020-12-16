import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RoomSelectPage } from './room-select.page';

const routes: Routes = [
  {
    path: '',
    component: RoomSelectPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RoomSelectPageRoutingModule {}

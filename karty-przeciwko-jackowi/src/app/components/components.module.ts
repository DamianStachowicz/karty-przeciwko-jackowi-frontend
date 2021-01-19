import { CardComponent } from './card/card.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PlayersListComponent } from './players-list/players-list.component';
import { CardSelectComponent } from './card-select/card-select.page';
import { IonicModule } from '@ionic/angular';

@NgModule({
  imports: [
    CommonModule,
    IonicModule.forRoot(),
  ],
  declarations: [
    CardComponent,
    PlayersListComponent,
    CardSelectComponent
  ],
  exports: [
    CardComponent,
    PlayersListComponent,
    CardSelectComponent
  ]
})
export class ComponentsModule {}

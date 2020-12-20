import { CardComponent } from './card/card.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PlayersListComponent } from './players-list/players-list.component';
import { SpinnerComponent } from './spinner/spinner.component';
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
    SpinnerComponent,
    CardSelectComponent
  ],
  exports: [
    CardComponent,
    PlayersListComponent,
    SpinnerComponent,
    CardSelectComponent
  ]
})
export class ComponentsModule {}

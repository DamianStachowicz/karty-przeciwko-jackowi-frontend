import { CardComponent } from './card/card.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PlayersListComponent } from './players-list/players-list.component';
import { SpinnerComponent } from './spinner/spinner.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    CardComponent,
    PlayersListComponent,
    SpinnerComponent
  ],
  exports: [
    CardComponent,
    PlayersListComponent,
    SpinnerComponent
  ]
})
export class ComponentsModule {}

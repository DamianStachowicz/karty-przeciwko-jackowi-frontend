import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'room-select',
    loadChildren: () =>
      import('./room-select/room-select.module').then(
        (m) => m.RoomSelectPageModule
      ),
  },
  {
    path: 'card-select',
    loadChildren: () => import('./card-select/card-select.module').then( m => m.CardSelectPageModule)
  },
  {
    path: '',  redirectTo: '/card-select', pathMatch: 'full'
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}

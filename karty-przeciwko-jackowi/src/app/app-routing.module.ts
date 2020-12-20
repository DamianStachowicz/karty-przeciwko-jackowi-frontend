import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',  redirectTo: '/current-question', pathMatch: 'full'
  },
  {
    path: 'room-select',
    loadChildren: () =>
      import('./pages/room-select/room-select.module').then(
        (m) => m.RoomSelectPageModule
      ),
  },
  {
    path: 'current-question',
    loadChildren: () => import('./pages/current-question/current-question.module').then( m => m.CurrentQuestionPageModule)
  }

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}

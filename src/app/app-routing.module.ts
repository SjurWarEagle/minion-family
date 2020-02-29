import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WallComponent } from './components/wall/wall.component';
import { CustomizerComponent } from './components/customizer/customizer.component';

const routes: Routes = [
  {
    path: 'customizer',
    component: CustomizerComponent
  },
  {
    path: 'wall',
    component: WallComponent
  },
  {
    path: '',
    component: WallComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

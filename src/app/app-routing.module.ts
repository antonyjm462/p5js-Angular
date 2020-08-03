import { SnakeComponent } from './componets/snake/snake.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CanvasComponent } from './componets/canvas/canvas.component';


const routes: Routes = [
  { path: 'canvas', component: CanvasComponent },
  { path: '', component: SnakeComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

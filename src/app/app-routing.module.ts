import { SnakeComponent } from './componets/snake/snake.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CanvasComponent } from './componets/canvas/canvas.component';
import { HomeComponent } from './componets/home/home.component';


const routes: Routes = [
  { path: 'canvas', component: CanvasComponent },
  { path: 'snake', component: SnakeComponent },
  { path: '', component: HomeComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

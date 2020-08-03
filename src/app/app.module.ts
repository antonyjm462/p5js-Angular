import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CanvasComponent } from './componets/canvas/canvas.component';
import { SnakeComponent } from './componets/snake/snake.component';

@NgModule({
  declarations: [
    AppComponent,
    CanvasComponent,
    SnakeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

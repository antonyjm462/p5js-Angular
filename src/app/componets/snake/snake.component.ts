import { Component, OnInit } from '@angular/core';
import * as p5 from 'p5';
import { HostListener } from "@angular/core";
import { Snake } from "./snake";
import { identifierModuleUrl } from '@angular/compiler';

@Component({
  selector: 'app-snake',
  templateUrl: './snake.component.html',
  styleUrls: ['./snake.component.scss']
})
export class SnakeComponent implements OnInit {
  screenHeight: number;
  screenWidth: number;
  canvas: p5;
  score: any = 0;
  game_over: boolean = false;

  constructor() { 
    this.getScreenSize();
  }

  @HostListener('window:resize', ['$event'])
    getScreenSize(event?) {
          this.screenHeight = window.innerHeight;
          this.screenWidth = window.innerWidth;
          console.log(this.screenHeight, this.screenWidth);
    }

    getRandomInt(max) {
      return Math.floor(Math.random() * Math.floor(max));
    }

    scoreUpdate(score){
      this.score = score;
      console.log(this.score);
    }
    
    gameOver(game_over){
      this.game_over = game_over;
      if(this.game_over){
        setTimeout(() => {
          console.log("restart");
          this.game_over = false;
        }, 1000);
      }
      console.log(this.game_over);
    }

  ngOnInit() {

    const sketch = (s) => {
      let size = 500;
      let pix = 20;
      let col,row;
      let snake;
      let x,y;
      let food;

      s.preload = () => {

      }

      s.setup = () => {
        s.createCanvas(size, size).parent('sketch-holder');
        s.frameRate(10);
        col = Math.floor(size / pix);
        row = Math.floor(size / pix);
        console.log(col,row);
        snake = new Snake(pix,size);
        pickLoc();
      }

      const pickLoc = () => {
        food = s.createVector(this.getRandomInt(row),this.getRandomInt(col));
        food.mult(pix);
      }

      const death = () => {
        for(let i=0;i < snake.tail.length;i++){
            let pos = snake.tail[i];
            let d = s.dist(snake.x,snake.y,pos.x,pos.y);
            if(d < 1){
              console.log("death");
              snake.death();
              this.gameOver(true);
            }
        }
    }

      s.draw = () =>{
        this.scoreUpdate(snake.tail.length);
        s.background(51);
        death();
        if(!this.game_over){
          snake.update(s.createVector(snake.x,snake.y));

        x = s.constrain(snake.x, 0, size - pix);
        y = s.constrain(snake.y, 0, size - pix);
        snake.constrain(x,y);

        s.fill(255);
        for(let i=0;i < snake.total;i++){
          s.rect(snake.tail[i].x,snake.tail[i].y,pix,pix);
        }
        s.rect(snake.x,snake.y,pix,pix);

        let d = s.dist(snake.x,snake.y,food.x,food.y);
        if(snake.eat(d)){
          pickLoc();
        }

        s.fill(255,0,100);
        s.noStroke()
        s.rect(food.x,food.y,pix,pix);
        }
        

      }

      s.keyPressed = () =>{
        if(s.keyCode === s.UP_ARROW){
          snake.dir(0,-1);
        } else if(s.keyCode === s.DOWN_ARROW){
          snake.dir(0,1);
        }else if(s.keyCode === s.RIGHT_ARROW){
          snake.dir(1,0);
        }else if(s.keyCode === s.LEFT_ARROW){
          snake.dir(-1,0);
        }

      }

    }

    this.canvas = new p5(sketch);
  }


}
import { Component, OnInit } from '@angular/core';
import * as p5 from 'p5';
import { HostListener } from "@angular/core";

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.scss']
})
export class CanvasComponent implements OnInit {
  screenHeight: number;
  screenWidth: number;
  canvas: p5;
  field: Number[][];

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

    getState(a, b, c, d) {
      return a * 8 + b * 4 + c * 2 + d * 1;
    }

  ngOnInit() {
    let res = 30;
    let col,row;
    let weigth = res / 3.5;
    let bx;
    let by;
    let xOffset = 0.0;
    let yOffset = 0.0;
    let mid = this.screenWidth/2;
    let shift=0;
    let locked;

    const sketch = (s) => {

      s.preload = () => {
      }

      const drawLine = (v1, v2) => {
        s.line(v1.x, v1.y, v2.x, v2.y);
      }

      const fill = () => {
        for (let i = 0; i <= col; i++) {
          let k = [];
          for (let j = 0; j <= row; j++) {
            k.push(0);
          }
          this.field.push(k);
        }

        for(let i=0;i <= col;i++){
          for(let j=0;j <= row;j++){
            this.field[i][j] = Math.floor(this.getRandomInt(2));
          }
        }
      }

      s.setup = () => {
        let p = s.createCanvas(this.screenWidth, this.screenHeight - 100);
        p.parent('sketch-holder');
        col = 1 + Math.floor(this.screenWidth / res);
        row = 1 + Math.floor(this.screenHeight / res);

        this.field = [];
        fill();
        // for(var i: number = 0; i < col; i++) {
        //     this.field[i] = [];
        //     for(var j: number = 0; j < row; j++) {
        //         this.field[i][j] = new Number();
        //     }
        // }
      }

      s.draw = () => {
        s.background(0, 0, 255);
        s.stroke(235, 143, 52);
        s.strokeWeight(weigth);
        s.fill(0, 0, 255)
        s.rect(0,0,this.screenWidth, this.screenHeight - 100)
        for(let i=0;i < col;i++){
          for(let j=0;j< row;j++){
            let x = i * res;
            let y = j * res;
            let a = s.createVector(x + res * 0.5, y);
            let b = s.createVector(x + res, y + res * 0.5);
            let c = s.createVector(x + res * 0.5, y + res);
            let d = s.createVector(x, y + res * 0.5);
            let state = this.getState(
              s.ceil(this.field[i][j]),
              s.ceil(this.field[i + 1][j]),
              s.ceil(this.field[i + 1][j + 1]),
              s.ceil(this.field[i][j + 1])
            );
            s.stroke(235, 143, 52);
            s.strokeWeight(weigth);
            switch (state) {
              case 1:
                drawLine(c, d);
                break;
              case 2:
                drawLine(b, c);
                break;
              case 3:
                drawLine(b, d);
                break;
              case 4:
                drawLine(a, b);
                break;
              case 5:
                drawLine(a, d);
                drawLine(b, c);
                break;
              case 6:
                drawLine(a, c);
                break;
              case 7:
                drawLine(a, d);
                break;
              case 8:
                drawLine(a, d);
                break;
              case 9:
                drawLine(a, c);
                break;
              case 10:
                drawLine(a, b);
                drawLine(c, d);
                break;
              case 11:
                drawLine(a, b);
                break;
              case 12:
                drawLine(b, d);
                break;
              case 13:
                drawLine(b, c);
                break;
              case 14:
                drawLine(c, d);
                break;
            }
          }
        }
        
        // setTimeout(() => {
        //   fill();
        // }, 1000);
      }//draw

      // s.mouseDragged = () => {
      //     bx = s.mouseX - xOffset;
      //     by = s.mouseY - yOffset;
      //     locked = true;
      //     if(shift != s.floor(((bx-mid)/res)/2)){
      //       shift = s.floor(((bx-mid)/res)/2);
      //       console.log(shift);
      //       for(let k=0;k < shift;k++){
      //         for(let i = col-1;i > col-shift;i++){
      //           for(let j = row-1;j > row-shift;j++){
      //             this.field[i-1][j] = this.field[i][j];
      //             this.field[i][j] = Math.floor(this.getRandomInt(2));
      //             console.log(this.field[i][j]);
      //           }
      //         }
      //       }
      //     }
      // }

      s.mouseDragged = () => {
        fill();
        locked = true;
    }

      s.mouseReleased = () => {
        fill();
        locked = false;
      }


  }

  
  this.canvas = new p5(sketch);
}

}
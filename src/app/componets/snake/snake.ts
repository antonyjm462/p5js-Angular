class Snake{
    x: number = 0;
    y: number = 0;
    xspeed: number = 1;
    yspeed: number = 0;
    pix: number;
    s: any;
    size: number;
    total: number = 0;
    tail: number[] = [];

    constructor(pix: number,size: number){
        this.pix = pix;
        this.size = size;
    }

    update = (currPos) => {
        if(this.total === this.tail.length){
            for(let i=0; i < this.total-1;i++){
                this.tail[i] = this.tail[i+1];
            }
        }
        this.tail[this.total - 1] = currPos;
        this.x = this.x + this.xspeed * this.pix;
        this.y = this.y + this.yspeed * this.pix;
    }

    constrain = (x,y) => {
        this.x = x;
        this.y = y;
    }

    dir = (x,y) => {
        this.xspeed = x;
        this.yspeed = y;
    }

    eat = (d) => {
        if(d < 1){
            this.total+=1;
            return true;
        }else{
            return false;
        }
    }

    death = () => {
        this.total =0;
        this.tail = [];
    }
}

export { Snake };
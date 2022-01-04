const dragonSprite = new Image();
dragonSprite.src = 'spritesheet.png';

class Bird{
    constructor(){
        this.x = 150;
        this.y = 200;
        this.vy = 0; // velocity
        this.originalWidth = 819;
        this.originalHeight = 681;
        this.width = this.originalWidth/20;
        this.height = this.originalHeight/20;
        this.weight = 0.9;
        this.frameX = 0; // frame of sprite
    }

// CUSTOM CLASS METHODS

    update(){
        let curve = Math.sin(angle) * 20; // up & down while idle
        if(this.y > canvas.height - (this.height * 3) + curve) {
            this.y = canvas.height - (this.height * 3) + curve;
            this.vy = 0;
        }else {
            this.vy += this.weight; // the longer it falls the faster it falls
            this.vy *= 0.8;
            this.y += this.vy;
        }
        if (this.y < 0 + this.height){
            this.y = 0 + this.height;
            this.vy = 0;
        } 
        if (spacePressed && this.y > this.height * 3) this.flap();
    }

    draw(){
        ctx.fillStyle = 'red';
        // HITBOX ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.drawImage(dragonSprite, this.frameX * this.originalWidth, 0, this.originalWidth, this.originalHeight, this.x - 20, this.y - 13, this.width * 1.7, this.height * 1.7);
    }

    flap(){
        this.vy -= 1.4;
        if(this.frameX >= 4) this.frameX = 0;
        else if (frame%10 === 0) this.frameX++;
    }
}

const bird = new Bird();
class BulleBully extends Phaser.Sprite {
    constructor(game, x, y, callback, context , player, speed) {
        super(game, 0, 0, 'bullebully');
        this.canWalk = true;
        this.setPos(x, y);
        this.anchor.setTo(0.5, 0.5);
        this.game.physics.arcade.enable(this);
        this.animations.add('down', [2, 0, 1, 0], 6, true);
        this.animations.add('up', [3, 5, 4, 5], 6, true);
        this.animations.add('right', [6, 8, 7, 8], 6, true);
        this.animations.add('left', [9, 11, 10, 11], 6, true);
        this.body.setSize(32, 32, 16, 32);
        this.body.collideWorldBounds = true;
        this.game.world.add(this);
        this.signal = new Phaser.Signal();
        this.signal.add(callback, context);
        this.player=player;
        this.geschwindigkeit=speed;

    }
    setPos(x, y) {
        this.x = x * 64 + 32;
        this.y = y * 64 + 16;
    }

    update() {

    if(game.physics.arcade.collide(this.player, this)){
            return true;
    }

    this.body.velocity.set(0);

    if(((Math.abs(this.x - this.player.x)) < 999900)&&((Math.abs(this.y - this.player.y)) < 99900)){

        if(this.x < this.player.x){

            if (this.canWalk) {
                if (this.rightFree) {
                    this.tween = this.game.add.tween(this).to({
                        x: this.x + 64
                    }, this.geschwindigkeit);
                    this.tween.onComplete.add(() => {
                        this.canWalk = true;
                        this.signal.dispatch();
                    }, this);
                    this.canWalk = false;
                    this.tween.start();
                    this.play('right');
                    //this.body.velocity.x += 200;
                }
                else {
                    this.animations.stop();
                    this.animations.frame = 8;
                }
            }

        }

        if(this.x > this.player.x){

            if (this.canWalk) {
                if (this.leftFree) {
                    this.tween = this.game.add.tween(this).to({
                        x: this.x - 64
                    }, this.geschwindigkeit);
                    this.tween.onComplete.add(() => {
                        this.canWalk = true;
                        this.signal.dispatch();
                    }, this);
                    this.canWalk = false;
                    this.tween.start();
                    this.play('left');

                }
                else {
                    this.animations.stop();
                    this.animations.frame = 11;
                }
            }

        }

        if(this.y < this.player.y){

            if (this.canWalk) {
                if (this.downFree) {
                    this.tween = this.game.add.tween(this).to({
                        y: this.y + 64
                    }, this.geschwindigkeit);
                    this.tween.onComplete.add(() => {
                        this.canWalk = true;
                        this.signal.dispatch();
                    }, this);
                    this.canWalk = false;
                    this.tween.start();
                    this.play('down');
                }
                else {
                    this.animations.stop();
                    this.animations.frame = 0;
                }
            }


        }

        if(this.y > this.player.y){

            if (this.canWalk) {
                if (this.upFree) {
                    this.tween = this.game.add.tween(this).to({
                        y: this.y - 64
                    }, this.geschwindigkeit);
                    this.tween.onComplete.add(() => {
                        this.canWalk = true;
                        this.signal.dispatch();
                    }, this);
                    this.canWalk = false;
                    this.tween.start();
                    this.play('up');
                }
                else {
                    this.animations.stop();
                    this.animations.frame = 5;
                }
            }

        }

    }
    return false;

    }
}

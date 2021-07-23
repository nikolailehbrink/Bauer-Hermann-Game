class Anhaenger extends Phaser.Sprite {
  constructor(game, callback, context, x, y, speed) {

    super(game, 0, 0, 'anhaenger');
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
    this.follow = false;
    this.vordermann;
    this.speed = speed;
    this.anhaengerrichtung;
    this.pointx;
    this.pointy;
    this.play('right');

  }

  setPos(x, y) {
    this.x = x * 64 + 32;
    this.y = y * 64 + 16;
  }



  update(trecker) {

    if ((game.physics.arcade.collide(trecker, this)) && (this.follow == false)) {
      this.follow = true;
      this.vordermann = trecker;
      return true;
    }

    if (this.follow == true) {


      this.body.velocity.set(0);
      //RICHTUNG UP
      if ((this.x == this.vordermann.pointx) && (this.y > this.vordermann.pointy)) {
        this.play('up');
      }
      //RICHTUNG DOWN
      if ((this.x == this.vordermann.pointx) && (this.y < this.vordermann.pointy)) {
        this.play('down');
      }
      //RICHTTUNG RIGHT
      if ((this.x < this.vordermann.pointx) && (this.y == this.vordermann.pointy)) {
        this.play('right');
      }
      //RICHTTUNG Left
      if ((this.x > this.vordermann.pointx) && (this.y == this.vordermann.pointy)) {
        this.play('left');
      }

      if (this.canWalk) {
        if (true) {
          this.tween = this.game.add.tween(this).to({
            x: this.vordermann.pointx,
            y: this.vordermann.pointy
          }, this.speed);
          this.tween.onComplete.add(() => {
            this.canWalk = true;
            this.signal.dispatch();

            this.pointx = this.x;
            this.pointy = this.y;
          }, this);
          this.canWalk = false;
          this.tween.start();

        } else {
          this.animations.stop();
        }
      }

    }

    return false;
  }
}
class Player extends Phaser.Sprite {

  constructor(game, x, y, callback, context) {
    super(game, 0, 0, 'player');
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

  }

  setPos(x, y) {
    this.x = x * 64 + 32;
    this.y = y * 64 + 16;
  }


  update(collider) {

    if (game.physics.arcade.collide(collider, this)) {
      return true;
    }

    if ((this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT) || this.game.input.keyboard.isDown(Phaser.Keyboard.A)) && this.canWalk) {

      if (this.leftFree) {
        this.tween = this.game.add.tween(this).to({
          x: this.x - 64
        }, 500);
        this.tween.onComplete.add(() => {
          this.canWalk = true;
          this.signal.dispatch();
          if (!this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT) || !this.game.input.keyboard.isDown(Phaser.Keyboard.A)) {
            this.animations.stop();
            this.animations.frame = 11;
          }
        }, );
        this.canWalk = false;
        this.tween.start();
        this.play('left');
      } else {
        this.animations.stop();
        this.animations.frame = 11;
      }
    }

    //  Funktion für Rechts

    if ((this.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT) || this.game.input.keyboard.isDown(Phaser.Keyboard.D)) && this.canWalk) {


      if (this.rightFree) {
        this.tween = this.game.add.tween(this).to({
          x: this.x + 64
        }, 500);
        this.tween.onComplete.add(() => {
          this.canWalk = true;
          this.signal.dispatch();
          if (!this.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT) || !this.game.input.keyboard.isDown(Phaser.Keyboard.D)) {
            this.animations.stop();
            this.animations.frame = 8;
          }
        }, this);
        this.canWalk = false;
        this.tween.start();
        this.play('right');

      } else {
        this.animations.stop();
        this.animations.frame = 8;
      }
    }

    //  Funktion für Oben

    if ((this.game.input.keyboard.isDown(Phaser.Keyboard.UP) || this.game.input.keyboard.isDown(Phaser.Keyboard.W)) && this.canWalk) {

      if (this.upFree) {
        this.tween = this.game.add.tween(this).to({
          y: this.y - 64
        }, 500);
        this.tween.onComplete.add(() => {
          this.canWalk = true;
          this.signal.dispatch();
          if (!this.game.input.keyboard.isDown(Phaser.Keyboard.UP) || !this.game.input.keyboard.isDown(Phaser.Keyboard.W)) {
            this.animations.stop();
            this.animations.frame = 5;
          }
        }, this);
        this.canWalk = false;
        this.tween.start();
        this.play('up');
      } else {
        this.animations.stop();
        this.animations.frame = 5;
      }
    }


    //  Funktion für Unten
    if ((this.game.input.keyboard.isDown(Phaser.Keyboard.DOWN) || this.game.input.keyboard.isDown(Phaser.Keyboard.S)) && this.canWalk) {

      if (this.downFree) {
        this.tween = this.game.add.tween(this).to({
          y: this.y + 64
        }, 500);
        this.tween.onComplete.add(() => {
          this.canWalk = true;
          this.signal.dispatch();
          if (!this.game.input.keyboard.isDown(Phaser.Keyboard.DOWN) || !this.game.input.keyboard.isDown(Phaser.Keyboard.S)) {
            this.animations.stop();
            this.animations.frame = 0;
          }
        }, this);
        this.canWalk = false;
        this.tween.start();
        this.play('down');
        //this.body.velocity.y += 200;
      } else {
        this.animations.stop();
        this.animations.frame = 0;
      }
    }

    return false;
  }
}

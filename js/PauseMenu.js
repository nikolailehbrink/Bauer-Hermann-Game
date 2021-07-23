class PauseMenu {



  constructor(game, sprites, levelname, levelInit,hauptMenuState) {

    this.game = game;
    this.sprites = sprites;
    this.levelname = levelname;
    this.levelInit = levelInit;
    this.hauptMenuState= hauptMenuState;

    this.ButtonAudio = this.game.add.audio('ButtonAudio');


    this.game.pauseButton = this.game.add.text(200, 300, "||", {
      font: '25px Bangers',
      fill: '#fff'
    });
    this.game.pauseButton.inputEnabled = true;
    this.game.pauseButton.fixedToCamera = true;
    this.game.pauseButton.padding.set(100, 100);
    this.game.pauseButton.cameraOffset.setTo(750, 8);


    this.whiteback = this.game.add.sprite(800, 600, 'whiteBack');
    this.whiteback.fixedToCamera = true;
    this.whiteback.cameraOffset.setTo(0, 0);
    this.whiteback.visible = 0;
    this.whiteback.alpha = 0.65;

    this.resumeButton = this.game.add.button(this.game.world.centerX, this.game.world.centerY, 'menuButton', this.clickResume, this, 7, 6, 8);
    this.resumeButton.visible = 0;
    this.resumeButton.fixedToCamera = true;
    this.resumeButton.anchor.setTo(0.5)
    this.resumeButton.cameraOffset.setTo(400, 200);

    this.restartButton = this.game.add.button(this.game.world.centerX, this.game.world.centerY, 'menuButton', this.clickRestart, this, 4, 3, 5);
    this.restartButton.visible = 0;
    this.restartButton.fixedToCamera = true;
    this.restartButton.anchor.setTo(0.5)
    this.restartButton.cameraOffset.setTo(400, 300);

    this.homeButton = this.game.add.button(this.game.world.centerX, this.game.world.centerY, 'menuButton', this.clickHauptmenu, this, 1, 0, 2);
    this.homeButton.visible = 0;
    this.homeButton.fixedToCamera = true;
    this.homeButton.anchor.setTo(0.5)
    this.homeButton.cameraOffset.setTo(400, 400);

    this.loudButton = this.game.add.button(this.game.world.centerX, this.game.world.centerY, 'menuButton', this.clickLoud, this, 13, 12, 14);
    this.loudButton.visible = 0;
    this.loudButton.fixedToCamera = true;
    this.loudButton.anchor.setTo(0.5)
    this.loudButton.cameraOffset.setTo(400, 500);

    this.quietButton = this.game.add.button(this.game.world.centerX, this.game.world.centerY, 'menuButton', this.clickQuiet, this, 10, 9, 11);
    this.quietButton.visible = 0;
    this.quietButton.fixedToCamera = true;
    this.quietButton.anchor.setTo(0.5)
    this.quietButton.cameraOffset.setTo(400, 499);

    this.pauseText = this.game.add.text(200, 300, " PAUSE! ", {
      font: '75px Bangers',
      fill: '#fff'
    });
    this.pauseText.anchor.setTo(0.5);
    this.pauseText.setShadow(5, 5, 'rgba(0,0,0,0.7)', 8);
    this.pauseText.fixedToCamera = true;
    this.pauseText.cameraOffset.setTo(400, 80);
    this.pauseText.visible = 0;

  }

  clickResume() {
    this.ButtonAudio.play();

    this.pruefer = false;
    this.game.counter.visible = 1;
    this.game.muenzText.visible = 1;
    this.game.beispiel.visible = 1;

    this.resumeButton.visible = 0;
    this.restartButton.visible = 0;
    this.homeButton.visible = 0;
    this.loudButton.visible = 0;
    this.quietButton.visible = 0;
    this.whiteback.visible = 0;
    this.pauseText.visible = 0;
    this.game.pauseButton.visible = 1;

    for (let sprite of this.sprites) {
      if (sprite.tween) {
        sprite.tween.resume();

      }
      sprite.animations.paused = false;
    }

  }
  clickRestart() {
    this.game.sound.stopAll();
    this.ButtonAudio.play();

    this.game.state.start(this.levelname, true, false, this.levelInit);
  }

  clickHauptmenu() {
    this.game.sound.stopAll();
    this.ButtonAudio.play();
    // this.game.sound.stopAll();
    this.game.state.start(this.hauptMenuState, true, false, "RestartingMap");
  }

  clickLoud() {
    this.ButtonAudio.play();
    this.game.sound.mute = true;
    this.loudButton.visible = 0;
    this.quietButton.visible = 1;
  }

  clickQuiet() {
    this.ButtonAudio.play();
    this.game.sound.mute = false;
    this.quietButton.visible = 0;
    this.loudButton.visible = 1;
  }


  update() {


    if (this.pruefer == true) {
      if (this.game.input.keyboard.isDown(Phaser.Keyboard.C)) {
        this.game.coins += 1;
      }
      this.game.counter.visible = 0;
      this.game.beispiel.visible = 0;
      this.game.muenzText.visible = 0;
      this.whiteback.visible = 1;
      this.game.pauseButton.visible = 0;
      this.resumeButton.visible = 1;
      this.restartButton.visible = 1;
      this.homeButton.visible = 1;
      this.pauseText.visible = 1;
      if (this.game.sound.mute) {
        this.quietButton.visible = 1;
      } else {
        this.loudButton.visible = 1;

      }

      for (let sprite of this.sprites) {
        if (sprite.tween) {
          sprite.tween.pause();

        }
        sprite.animations.paused = true;
      }
    }

    this.game.pauseButton.events.onInputUp.add(function () {
      this.pruefer = true;
    }, this);
  }

}

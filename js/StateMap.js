class StateMap extends Phaser.State {

  init(previousMap) {
    if (previousMap == null) {
      //startposition
      this.startX = 10;
      this.startY = 10;
      this.gameStarterFunktion();


    } else if (previousMap == "LEVEL_ONE") {
      this.startX = 5;
      this.startY = 1;

    } else if (previousMap == "RestartingMap") {
      this.startX = 10;
      this.startY = 10;
    }

  }


  create() {
    this.randomZahl = 0;

    //  FPS-Anzeige
    this.game.time.desiredFps = 60;
    this.game.time.advancedTiming = true;
    //  Tilethis.map laden
    this.map = this.game.add.tilemap('Bauernhof_Overworld');

    this.game_width = this.map.widthInPixels;
    this.game_height = this.map.heightInPixels;

    this.game.world.setBounds(0, 0, this.game_width, this.game_height);
    //  TileSheet laden
    this.map.addTilesetImage('roguelikeSheet_transparent_64x64', 'tiles');
    //  Layer laden
    this.CollisionLayer = this.map.createLayer('CollisionLayer')
    this.GroundLayer = this.map.createLayer('GroundLayer');
    this.OverlayLayer = this.map.createLayer('OverlayLayer');
    this.ObjectLayer = this.map.createLayer('ObjectLayer');

    this.player = new Player(game, this.startX, this.startY, this.tiles, this);

    this.OverlappingLayer = this.map.createLayer('OverlappingLayer');
    this.ExtraLayer = this.map.createLayer('ExtraLayer');

    this.camera.follow(this.player);

    this.map.setCollisionBetween(0, 999, true, 'CollisionLayer');

    this.game.tweens.frameBased = false;
    this.tiles();

    this.introductionMenu = new IntroductionMenu(this.game, [this.player],"mainMenu");
    this.game.counter = new CoinMenu(this.game, 10, 50);
    this.pauseMenu = new PauseMenu(this.game, [this.player], "map", "RestartingMap",'menu');

    this.backgroundnoise = this.game.add.audio('backgroundnoise');
    this.vielzuteuer = this.game.add.audio('vielzuteuer');
    this.ey = this.game.add.audio('ey');
    this.scheissee = this.game.add.audio('scheissee');


    // this.counter.visible = 0;

    this.backgroundnoise.play();


    this.game.beispiel = this.game.add.text(1416, 1536, ' Du Brauchst Mindestens \n 3 Hermann Coins \n um dieses Level \n freizuschalten ! ', {
      font: '27px Bangers',
      fill: '#fff'
    });
    this.game.beispiel.setShadow(5, 5, 'rgba(0,0,0,0.3)', 5);
    this.game.beispiel.padding.set(2.5, 2.5);
    this.game.beispiel.align = 'center';
    this.game.beispiel.visible = 0;
    this.game.beispiel.alpha = 0;

    this.gameStarterBoolean = false;
    this.tweenpruefer = false;

  }


  update() {
    // this.game.debug.text(this.game.time.fps, 2, 14, "black");
    this.physics.arcade.collide(this.player, this.CollisionLayer);
    this.player.update();
    this.pauseMenu.update();
    this.game.counter.update();

    if (this.tweenpruefer) {
      this.introductionMenu.update();
      console.log("Ho")
    }
  }


  tiles() {

    this.xtilec = this.math.snapToFloor(Math.floor(this.player.x), 64) / 64;
    this.ytilec = this.math.snapToFloor(Math.floor(this.player.y), 64) / 64;

    var tileLeft = this.map.getTileLeft(0, this.xtilec, this.ytilec);
    this.player.leftFree = tileLeft.index != 1258;

    var tileRight = this.map.getTileRight(0, this.xtilec, this.ytilec);
    this.player.rightFree = tileRight.index != 1258;


    var tileBelow = this.map.getTileBelow(0, this.xtilec, this.ytilec);

    if (tileBelow != null) {
      this.player.downFree = tileBelow.index != 1258;
    } else if (tileBelow == null && this.game.coins >= 3) {
      this.player.downFree = false;
      this.startLeveTwo();

    } else if (tileBelow == null && this.game.coins < 3) {
      this.player.downFree = false;
      this.game.beispiel.visible = 1;
      this.tween = game.add.tween(this.game.beispiel).to({
        alpha: 1
      }, 2000, "Linear", true, 0, -1);
      this.tween.yoyo(true, 3000);

      this.randomZahl = this.game.rnd.integerInRange(0, 30);


      if (this.randomZahl <= 30 && this.randomZahl >= 20) {
        this.ey.play();
      } else if(this.randomZahl <= 20 && this.randomZahl >= 10){
        this.vielzuteuer.play();
      }
      else if(this.randomZahl <= 10 && this.randomZahl >= 0){
        this.scheissee.play();
      }


    }

    var tileAbove = this.map.getTileAbove(0, this.xtilec, this.ytilec);

    if (tileAbove != null) {
      this.player.upFree = tileAbove.index != 1258;
    } else {
      this.player.upFree = false;
      this.startLevelOne();


    }



  }
  startLeveTwo(){
    this.game.sound.stopAll();
    this.camera.fade(0x000000, 1500, false);
    this.time.events.add(1500, function () {
    this.game.state.start('level2');
    }, this);
  }





  startLevelOne() {
    this.game.sound.stopAll();
    this.camera.fade(0x000000, 1500, false);
    this.time.events.add(1500, function () {

    this.game.state.start('level1');
    }, this);
  }
  gameStarterFunktion() {

    this.time.events.add(800, function () {
      this.tweenpruefer = true;

    }, this);

  }

}

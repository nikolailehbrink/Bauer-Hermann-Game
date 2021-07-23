class LevelOne extends Phaser.State {



    create() {
        this.soundZaehler=true;
        this.backgroundnoise = this.game.add.audio('backgroundnoise');
        this.Root = this.game.add.audio('Root');


        this.backgroundnoise.play();
        this.Root.play();
        this.Root.loop=true;
        this.Root.volume=0.2;

        this.hoeraufhier = this.game.add.audio('hoeraufhier');
        this.heuAufgenommen = this.game.add.audio('heuAufgenommen');
        this.coinAudio = this.game.add.audio('coinAudio');

        
        this.GameOver = this.game.add.audio('GameOver');
        this.GameOver.volume=0.3;


        this.game.time.desiredFps = 60;
        this.game.time.advancedTiming = true;
        //  TileMap laden

        this.map = this.game.add.tilemap('Bauernhof_Level1');
        this.game_width = this.map.widthInPixels;
        this.game_height = this.map.heightInPixels;
        this.game.world.setBounds(0, 0, this.game_width, this.game_height);
        //  TileSheet laden
        this.map.addTilesetImage('roguelikeSheet_transparent_64x64', 'tiles');
        //  Layer laden
        this.CollisionLayer = this.map.createLayer('CollisionLayer')
        this.GroundLayer = this.map.createLayer('GroundLayer');
        this.OverlayLayer = this.map.createLayer('OverlayLayer');
        this.PlayerLayer = this.map.createLayer('PlayerLayer');


        this.player = new Player(game, 5, 18, this.tiles, this);

        this.heuBallen = [];
        this.heuBallen.push(new Heu(this.game, 3, 12));
        this.heuBallen.push(new Heu(this.game, 17, 18));
        this.heuBallen.push(new Heu(this.game, 1, 1));
        this.heuBallen.push(new Heu(this.game, 11, 3));

        this.bullebully = new BulleBully(game, 11, 3, this.bullebullytiles, this, this.player, 550);
        this.bullehansi = new BulleBully(game, 3, 9, this.bullebullytiles, this, this.player, 700);
        this.bulleschorrse = new BulleBully(game, 14, 12, this.bullebullytiles, this, this.player, 600);

        this.ObjectLayer = this.map.createLayer('ObjectLayer');
        this.ExtraLayer = this.map.createLayer('ExtraLayer');

        this.ziel = new Heu(this.game, 14, 0.85);
        this.ziel.visible = false;

        this.lives = [];
        this.lives.push(new Heu(this.game, this.camera.x, this.camera.y));
        this.lives.push(new Heu(this.game, this.camera.x + 0.6, this.camera.y));
        this.lives.push(new Heu(this.game, this.camera.x + 1.2, this.camera.y));
        this.lives.push(new Heu(this.game, this.camera.x + 1.8, this.camera.y));

        for (let h of this.lives) {
            h.fixedToCamera = true;
        }



        this.camera.follow(this.player);
        this.map.setCollisionBetween(0, 999, true, 'CollisionLayer');
        this.game.tweens.frameBased = false;
        this.tiles();
        this.bullebullytiles();


        this.player.animations.frame = 5;
        this.bullebully.animations.frame = 5;
        this.bullehansi.animations.frame = 5;
        this.bulleschorrse.animations.frame = 5;

        this.game.counter = new CoinMenu(this.game, 10, 50);

        this.pauseMenu = new PauseMenu(this.game, [this.player, this.bullebully, this.bullehansi, this.bulleschorrse], "level1","null","map");
        this.introductionMenu = new IntroductionMenu(this.game, [this.player, this.bullebully, this.bullehansi, this.bulleschorrse],"level1");

        this.heu = 0;

        this.korb = false;
        this.gameOver = false;
        this.gameOverPruefer = true;



    }

    update() {

      if (this.game.level1Zaehler==true) {
        this.introductionMenu.update();
      }

        this.pauseMenu.update();

        this.game.counter.update();


        if (this.gameOver && this.gameOverPruefer) {
            if (this.soundZaehler) {
                this.game.sound.stopAll();
                this.GameOver.play();
            }
            this.soundZaehler=false;
            this.camera.checkBounds();
            this.camera.shake(0.01, 200);
            this.camera.fade(0x000000, 1500, false);
            this.time.events.add(1500, function () {

                this.camera._shake.x = 0;
                this.camera._shake.y = 0;



                this.state.start('gameOverState', true, false, "l1");

                this.gameOverPruefer = false;


            }, this);
        }


        for (let h of this.lives) {
            h.visible = false;
        }

        for (var i = 0; i < this.heu; i++) {
            this.lives[i].visible = true;
        }


        this.physics.arcade.collide(this.player, this.CollisionLayer);
        //  X+Y-Tile Koordinaten
        this.xtilec = this.math.snapToFloor(Math.floor(this.player.x), 64) / 64;
        this.ytilec = this.math.snapToFloor(Math.floor(this.player.y), 64) / 64;

        this.bbxtilec = this.math.snapToFloor(Math.floor(this.bullebully.x), 64) / 64;
        this.bbytilec = this.math.snapToFloor(Math.floor(this.bullebully.y), 64) / 64;

        this.bhxtilec = this.math.snapToFloor(Math.floor(this.bullehansi.x), 64) / 64;
        this.bhytilec = this.math.snapToFloor(Math.floor(this.bullehansi.y), 64) / 64;

        this.bsxtilec = this.math.snapToFloor(Math.floor(this.bulleschorrse.x), 64) / 64;
        this.bsytilec = this.math.snapToFloor(Math.floor(this.bulleschorrse.y), 64) / 64;


        for (let h of this.heuBallen) {
            if (h.update(this.player)) {
                this.heu++;
                this.heuAufgenommen.play();
                
            }
        }

        if (this.bulleschorrse.update() || this.bullebully.update() || this.bullehansi.update()) {
            this.gameOver = true;
            this.heu = 0;
        }

        // this.game.debug.text(this.game.time.fps, 2, 14, "black");

    }


    tiles() {

        //Player
        this.xtilec = this.math.snapToFloor(Math.floor(this.player.x), 64) / 64;
        this.ytilec = this.math.snapToFloor(Math.floor(this.player.y), 64) / 64;

        var tileLeft = this.map.getTileLeft(0, this.xtilec, this.ytilec);
        this.player.leftFree = tileLeft.index != 1258;

        var tileRight = this.map.getTileRight(0, this.xtilec, this.ytilec);
        this.player.rightFree = tileRight.index != 1258;

        var tileAbove = this.map.getTileAbove(0, this.xtilec, this.ytilec);
        this.player.upFree = tileAbove.index != 1258;

        var tileBelow = this.map.getTileBelow(0, this.xtilec, this.ytilec);

        if (tileBelow != null) {
            this.player.downFree = tileBelow.index != 1258;
        } else {
            this.player.downFree = false;
            this.camera.fade(0x000000, 1500);
            this.time.events.add(1500, function () {
                this.game.state.start('map', true, false, "LEVEL_ONE");
              }, this);

        }

        var tileHeu = this.map.getTileAbove(4, this.xtilec, this.ytilec);
        if (tileHeu.index == 1076) {
            if (this.heu > 0) {
                for (var i = 1; i <= this.heu; i++) {
                    this.game.coins += 1;
                    this.coinAudio.play();

                }

                if (!this.ziel.visible) {
                    this.ziel.visible = true;
                    this.ziel.setPos(16.5, 0.85);
                }

                this.heu = 0;
            }
        }


    }



    bullebullytiles() {

        //Bullebully
        this.bbxtilec = this.math.snapToFloor(Math.floor(this.bullebully.x), 64) / 64;
        this.bbytilec = this.math.snapToFloor(Math.floor(this.bullebully.y), 64) / 64;

        var tileLeft = this.map.getTileLeft(0, this.bbxtilec, this.bbytilec);
        this.bullebully.leftFree = tileLeft.index != 1258;

        var tileRight = this.map.getTileRight(0, this.bbxtilec, this.bbytilec);
        this.bullebully.rightFree = tileRight.index != 1258;

        var tileAbove = this.map.getTileAbove(0, this.bbxtilec, this.bbytilec);
        this.bullebully.upFree = tileAbove.index != 1258;

        var tileBelow = this.map.getTileBelow(0, this.bbxtilec, this.bbytilec);
        this.bullebully.downFree = tileBelow.index != 1258;

        //Bullehansi
        this.bhxtilec = this.math.snapToFloor(Math.floor(this.bullehansi.x), 64) / 64;
        this.bhytilec = this.math.snapToFloor(Math.floor(this.bullehansi.y), 64) / 64;

        var tileLeft = this.map.getTileLeft(0, this.bhxtilec, this.bhytilec);
        this.bullehansi.leftFree = tileLeft.index != 1258;

        var tileRight = this.map.getTileRight(0, this.bhxtilec, this.bhytilec);
        this.bullehansi.rightFree = tileRight.index != 1258;

        var tileAbove = this.map.getTileAbove(0, this.bhxtilec, this.bhytilec);
        this.bullehansi.upFree = tileAbove.index != 1258;

        var tileBelow = this.map.getTileBelow(0, this.bhxtilec, this.bhytilec);
        this.bullehansi.downFree = tileBelow.index != 1258;

        //Bulleschorrse

        this.bsxtilec = this.math.snapToFloor(Math.floor(this.bulleschorrse.x), 64) / 64;
        this.bsytilec = this.math.snapToFloor(Math.floor(this.bulleschorrse.y), 64) / 64;

        var tileLeft = this.map.getTileLeft(0, this.bsxtilec, this.bsytilec);
        this.bulleschorrse.leftFree = tileLeft.index != 1258;

        var tileRight = this.map.getTileRight(0, this.bsxtilec, this.bsytilec);
        this.bulleschorrse.rightFree = tileRight.index != 1258;

        var tileAbove = this.map.getTileAbove(0, this.bsxtilec, this.bsytilec);
        this.bulleschorrse.upFree = tileAbove.index != 1258;

        var tileBelow = this.map.getTileBelow(0, this.bsxtilec, this.bsytilec);
        this.bulleschorrse.downFree = tileBelow.index != 1258;
    }
}

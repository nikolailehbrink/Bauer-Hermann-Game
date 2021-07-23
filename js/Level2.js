class LevelTwo extends Phaser.State {



    create() {
        this.nochniegehabt = this.game.add.audio('nochniegehabt');
        this.TraktorSound = this.game.add.audio('TraktorSound');
        this.coinAudio = this.game.add.audio('coinAudio');
        this.TraktorSound.play();
        this.TraktorSound.volume=0.5;
        // this.TraktorSound.addMarker(name, start, duration, volume, loop)

        this.backgroundnoise = this.game.add.audio('backgroundnoise');

        this.backgroundnoise.play();
        

        
        this.GameOver = this.game.add.audio('GameOver');
        this.GameOver.volume=0.3;


        this.game.stage.backgroundColor = "#8DC435";
        this.camera._shake.x = 0;
        this.camera._shake.y = 0;

        this.game.time.desiredFps = 60;
        this.game.time.advancedTiming = true;
        //  TileMap laden
        this.map = this.game.add.tilemap('Bauernhof_Level2');
        this.game_width = this.map.widthInPixels;
        this.game_height = this.map.heightInPixels;
        //  TileSheet laden
        this.map.addTilesetImage('roguelikeSheet_transparent_64x64', 'tiles');



        this.CollisionLayer = this.map.createLayer('CollisionLayer');

        this.GroundLayer = this.map.createLayer('GroundLayer');

        this.OverlayLayer = this.map.createLayer('OverlayLayer');
        this.BorderLayer = this.map.createLayer('BorderLayer');
        this.anhaenger = [];
        this.anhaenger.push(new Anhaenger(this.game, this.anhaengertiles, this, 1, 1, 500));
        this.player = new Trecker(game, 7, 2, this.tiles, this);

        this.BorderLayer2 = this.map.createLayer('BorderLayer2');
        this.TreeLayer = this.map.createLayer('TreeLayer');
        this.TreeLayer2 = this.map.createLayer('TreeLayer2');
        this.game.world.setBounds(0, 0, this.game_width, this.game_height);

        this.game.tweens.frameBased = false;

        this.player.animations.frame = 0;


        this.camera.follow(this.player);

        this.tiles();
        this.gameOver = false;
        this.game.counter = new CoinMenu(this.game, 10, 50);
        this.introductionMenu = new IntroductionMenu(this.game, [this.player],"level2");
        this.snake = [];
        this.snake.push(this.player);
        this.pauseMenu = new PauseMenu(this.game, this.snake, "level2","null","map");

        this.gameOverPruefer = true;

        this.anhaengertiles();
        this.soundZaehler=true;



    }

    getRandomCoordinates() {

        var randomx = Math.random() * 9;
        randomx = Math.floor(randomx);
        randomx += 1;
        var randomy = Math.random() * 7;
        randomy = Math.floor(randomy);
        randomy += 1;

        var xUndy = []
        xUndy[0] = randomx;
        xUndy[1] = randomy;
        return xUndy;


    }

    update() {
        this.pauseMenu.update();
        this.game.counter.update();
        if (this.game.level2Zaehler==true) {
          this.introductionMenu.update();
        }

        if (this.gameOver && this.gameOverPruefer) {
            
            if (this.soundZaehler) {
                this.game.sound.stopAll();
                this.GameOver.play();
            }

            this.soundZaehler=false;
            this.camera.checkBounds();
            this.camera.shake(0.01, 200);
            this.camera.fade(0x000000, 1500, false);
            this.time.events.add(2500, function () {

                this.camera._shake.x = 0;
                this.camera._shake.y = 0;



                this.state.start('gameOverState', true, false, "l2");

                this.gameOverPruefer = false;


            }, this);
        }



        for (let h of this.anhaenger) {
            if (h.update(this.snake[this.snake.length - 1])) {

                this.snake.push(h);


                var xUndy = this.getRandomCoordinates();
                var collide = true;
                while (collide) {
                    collide = false;
                    this.anhaenger.push(new Anhaenger(this.game, this.anhaengertiles, this, xUndy[0], xUndy[1], 500));
                    this.pauseMenu = new PauseMenu(this.game, this.snake, "level2");


                    for (let h of this.snake) {
                        if (game.physics.arcade.collide(h, this.anhaenger[this.anhaenger.length - 1])) {
                            this.anhaenger[this.anhaenger.length - 1].kill();
                            xUndy = this.getRandomCoordinates();
                            collide = true;
                        }
                    }

                }
                this.game.coins += 1;
                this.coinAudio.play();
            }

        }


        for (var i = 1; i < this.snake.length; i++) {
            if ((this.snake[i + 1] != null)) {
                this.snake[i].update(this.snake[i - 1]);
            }
        }

        for (var i = 2; i < this.snake.length; i++) {
            if (game.physics.arcade.collide(this.snake[0], this.snake[i]) && this.gameOverPruefer) {
                console.log("GAME OVER!");
                this.gameOver = true;
            }
        }

        // this.game.debug.text(this.game.time.fps, 2, 14, "black");

        this.xtilec = this.math.snapToFloor(Math.floor(this.player.x), 64) / 64;
        this.ytilec = this.math.snapToFloor(Math.floor(this.player.y), 64) / 64;

        for (let h of this.snake) {
            this.xtilec = this.math.snapToFloor(Math.floor(h.x), 64) / 64;
            this.ytilec = this.math.snapToFloor(Math.floor(h.y), 64) / 64;
        }




    }

    tiles() {


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
        }

    }


    anhaengertiles() {


        for (var i = 1; i < this.snake.length; i++) {
            this.bbxtilec = this.math.snapToFloor(Math.floor(this.snake[i].x), 64) / 64;
            this.bbytilec = this.math.snapToFloor(Math.floor(this.snake[i].y), 64) / 64;
            var tileLeft = this.map.getTileLeft(0, this.bbxtilec, this.bbytilec);
            this.snake[i].leftFree = tileLeft.index != 1258;

            var tileRight = this.map.getTileRight(0, this.bbxtilec, this.bbytilec);
            this.snake[i].rightFree = tileRight.index != 1258;

            var tileAbove = this.map.getTileAbove(0, this.bbxtilec, this.bbytilec);
            this.snake[i].upFree = tileAbove.index != 1258;

            var tileBelow = this.map.getTileBelow(0, this.bbxtilec, this.bbytilec);
            if (tileBelow != null) {
                this.snake[i].downFree = tileBelow.index != 1258;

            } else {
                this.player.downFree = false;
            }

        }

    }


}

class GameOverMenu extends Phaser.State {

    init(levelAuswahl) {

        if (levelAuswahl == 'l2') {
            this.levelname = 'level2';
        } else if (levelAuswahl == 'l1') {
            this.levelname = 'level1';
        }



    }


    create() {

        this.ButtonAudio = this.game.add.audio('ButtonAudio');

        this.scheisse1 = this.game.add.audio('scheisse1');
        this.game.time.events.add(825, function () {

        this.scheisse1.play();
        }, this);

        this.game.stage.backgroundColor = "#000";
        // this.blackBackground.visible = 0;


        this.restartButton = this.game.add.button(400, 275, 'menuButton', this.clickRestart, this, 4, 3, 5);
        // this.restartButton.visible = 0;
        this.restartButton.fixedToCamera = true;
        this.restartButton.anchor.setTo(0.5)
        // this.restartButton.cameraOffset.setTo(400, 300);

        this.homeButton = this.game.add.button(400, 375, 'menuButton', this.clickHauptmenu, this, 1, 0, 2);
        // this.homeButton.visible = 0;
        this.homeButton.fixedToCamera = true;
        this.homeButton.anchor.setTo(0.5)
        // this.homeButton.cameraOffset.setTo(400, 400);

        this.gameOverText = this.game.add.text(400, 120, " GAME OVER! ", {
            font: '75px Bangers',
            fill: '#fff'
        });
        this.gameOverText.anchor.setTo(0.5);
        this.gameOverText.fixedToCamera = true;



    }

    clickRestart() {
        this.ButtonAudio.play();
        this.game.state.start(this.levelname, true, false, this.levelInit);
    }

    clickHauptmenu() {
        this.ButtonAudio.play();
        this.game.state.start('map', true, false, "RestartingMap");
    }



}

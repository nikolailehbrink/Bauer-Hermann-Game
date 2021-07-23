class IntroductionMenu {

  constructor(game, sprites,levelName) {
    

    this.game = game;
    this.sprites = sprites;
    this.levelName=levelName;

    this.hallo1 = this.game.add.audio('hallo1');
    this.scheissee = this.game.add.audio('scheissee');





    if (this.game.mainMenuZaehler) {
      this.game.time.events.add(1000, function () {
        this.hallo1.play();
      }, this);

    }

    this.drueckmahier = this.game.add.audio('drueckmahier');
    this.ButtonAudio = this.game.add.audio('ButtonAudio');


    this.whiteback = this.game.add.sprite(800, 600, 'whiteBack');
    this.whiteback.fixedToCamera = true;
    this.whiteback.cameraOffset.setTo(0, 0);
    this.whiteback.visible = 0;
    this.whiteback.alpha = 0.65;

    this.resumeButton = this.game.add.button(this.game.world.centerX, this.game.world.centerY, 'menuButton', this.clickPlay, this, 7, 6, 8);
    this.resumeButton.visible = 0;
    this.resumeButton.fixedToCamera = true;
    this.resumeButton.anchor.setTo(0.5,0);
    this.resumeButton.cameraOffset.setTo(750, 487);
    this.resumeButton.inputEnabled = true;
    this.resumeButton.events.onInputOver.add(this.hierDruecken, this);


    this.hermanncoin2 = this.game.add.sprite(450, 400, 'hermannCoins');
    this.hermanncoin2.fixedToCamera = true;
    this.hermanncoin2.cameraOffset.setTo(452, 302);
    this.hermanncoin2.anchor.setTo(0.5);
    this.hermanncoin2.scale.setTo(0.5);
    this.hermanncoin2.animations.add('muenze', [0, 1, 2, 3, 4, 5, 6, 7], 10, true);
    this.hermanncoin2.animations.play('muenze');
    this.hermanncoin2.visible = 0;

    this.heu = this.game.add.sprite(450, 400, 'Heu');
    this.heu.fixedToCamera = true;
    this.heu.cameraOffset.setTo(504, 276);
    this.heu.anchor.setTo(0.5);
    this.heu.visible = 0;

    this.heuBehaelter = this.game.add.sprite(450, 400, 'Heubehaelter');
    this.heuBehaelter.fixedToCamera = true;
    this.heuBehaelter.cameraOffset.setTo(590, 435);
    this.heuBehaelter.anchor.setTo(0.5);
    this.heuBehaelter.visible = 0;
    this.heuBehaelter.scale.setTo(0.7);


    this.arrowKeys = this.game.add.sprite(600, 300, 'arrowKeys');
    this.arrowKeys.fixedToCamera = true;
    this.arrowKeys.cameraOffset.setTo(400, 450);
    this.arrowKeys.anchor.setTo(0.5,0);
    this.arrowKeys.scale.setTo(0.25);
    this.arrowKeys.visible = 0;

    this.pauseText = this.game.add.text(100, 300, "", {
      font: '31px Bangers',
      fill: '#8F673F',
      align: "center"
    });

    this.pauseText.padding.set(10, 10);
    this.pauseText.anchor.setTo(0.5);
    this.pauseText.fixedToCamera = true;
    this.pauseText.cameraOffset.setTo(400, 200);
    this.pauseText.visible = 0;

    if (this.levelName=="mainMenu") {

      this.pauseText.setText( "HALLLLLLOOOO, \n ich bin bauer hermann \n und du musst mir helfen \n meinen Hof zu retten! \n \n Sammle       \n und schalte neue Level frei! ");
    }

    if (this.levelName=="level1") {
      // this.game.scheisse

      this.pauseText.setText( "\n\n\n\n SCHEISSSSEEEEEE, \n die Bullen sind ausgebüchst!! \n Versuche an ihnen vorbeizukommen \n und sammle die herumliegenden \n Heuballen ein!!  \n\n Wirf das Heu in den \n dafür vorgesehenen Behälter \n um eine saftige Belohnung \n zu ergattern! ");
    }
    if (this.levelName=="level2") {

      this.pauseText.setText( "\n \n \n LECK MICH AM ARSCH!!! \n warum stehen die \n Anhänger denn hier so rum??  \n \n Versuche mit dem Trecker \n möglichst viele Anhänger \n zu chauffieren \n und erhalte für jeden \n eine fette Belohnung!!! ");
    }


    

    this.controlsText = this.game.add.text(100, 300, " CONTROLS: ", {
      font: '27px Bangers',
      fill: '#8DC435',
      align: "center"
    });
    this.controlsText.padding.set(10, 10);
    this.controlsText.anchor.setTo(0.5);
    this.controlsText.fixedToCamera = true;
    this.controlsText.cameraOffset.setTo(400, 435);
    this.controlsText.visible = 0;

    this.pruefer = true;

  }

  hierDruecken(){
    this.drueckmahier.play();
  }

  clickPlay() {
    this.ButtonAudio.play();
    this.pruefer = false;
    this.game.pauseButton.visible = 1;
    this.game.counter.visible = 1;
    this.game.muenzText.visible = 1;
    this.game.beispiel.visible = 1;
    this.resumeButton.visible = 0;
    this.whiteback.visible = 0;
    this.pauseText.visible = 0;
    this.arrowKeys.visible = 0;
    this.hermanncoin2.visible = 0;
    this.controlsText.visible = 0;
    this.heu.visible = 0;
    this.heuBehaelter.visible = 0;




    for (let sprite of this.sprites) {
      if (sprite.tween) {
        sprite.tween.resume();
      }
      sprite.animations.paused = false;
    }

    if(this.levelName=="mainMenu"){

      this.game.mainMenuZaehler=false;

    }else if (this.levelName=="level1") {
      this.game.level1Zaehler=false;      

    }
    else if (this.levelName=="level2") {

      this.game.level2Zaehler=false;
    }




    for (let sprite of this.sprites) {
      if (sprite.tween) {
        sprite.tween.resume();
      }
      sprite.animations.paused = false;
    }


  }

  update() {


    if (this.pruefer == true) {
      this.game.pauseButton.visible = 0;
      this.game.counter.visible = 0;
      this.game.beispiel.visible = 0;
      this.game.muenzText.visible = 0;
      this.whiteback.visible = 1;
      
      
      // this.game.time.events.add(4000, function () {
        this.resumeButton.visible = 1;
        // }, this);

      this.pauseText.visible = 1;
      if (this.levelName=="mainMenu") {
        this.arrowKeys.visible = 1;

        this.controlsText.visible = 1;
       
        this.hermanncoin2.visible = 1;
      }else if (this.levelName=="level1") {
        this.heu.visible = 1;
        this.heuBehaelter.visible = 1;
      }


      for (let sprite of this.sprites) {
        if (sprite.tween) {
          sprite.tween.pause();
        }
        sprite.animations.paused = true;
      }
    }
  }


}

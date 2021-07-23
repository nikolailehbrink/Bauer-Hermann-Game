class StateMenu extends Phaser.State {


  init(lastMap){
    if (lastMap == null ||lastMap == "RestartingMap") {
      // this.BauerHermannTheme.play();
      this.soundPruefer=false;      
    }else if (lastMap == "aboutUs") {
      this.soundPruefer=true;      

    }



  }
  create() {
    this.ButtonAudio = this.game.add.audio('ButtonAudio');

    this.auflosgehtslos = this.game.add.audio('auflosgehtslos');
    this.BauerHermannTheme = this.game.add.audio('BauerHermannTheme');
    if (this.soundPruefer==false) {
      this.BauerHermannTheme.play();
      this.BauerHermannTheme.loop=true;
      this.soundPruefer=true;
    }

    this.overViewVideo = this.game.add.video('mapOverview');
    this.overViewVideo.addToWorld();
    this.overViewVideo.play();
    this.overViewVideo.loop=true;

    this.playButton = this.game.add.button(400 - 95, 300 - 73.5, 'mainMenuButton', this.clickButton, this, 1, 0,2 );
    this.playButton.alpha=0;
    this.button = this.game.add.button(400 - 95, 300 + 24.5, 'mainMenuButton', this.aboutUsClick, this, 4, 3,5);
    this.button.alpha=0;
    
    this.time.events.add(1000, function () {
      
          this.game.add.tween(this.playButton).to({alpha:1},1500,Phaser.Easing.None,true);  
          this.game.add.tween(this.button).to({alpha:1},1500,Phaser.Easing.None,true);  

    }, this);

      this.time.events.add(2000, function () {
        this.playButton.events.onInputOver.add(function() {
          this.auflosgehtslos.play();
        }, this);
        this.button.events.onInputOver.add(function() {
          this.auflosgehtslos.play();
        }, this);
  
      }, this);
      
      
  

    this.game.coins = 0;
    this.game.level1Zaehler=true;
    this.game.level2Zaehler=true;
    this.game.mainMenuZaehler=true;

  }

   clickButton() {
    this.ButtonAudio.play();

    this.playButton.inputEnabled = false;
    this.camera.fade(0x000000, 500, false);
    this.time.events.add(500, function () {
      this.game.sound.stopAll();
      this.game.state.start('map');
    }, this);
  }

  aboutUsClick() {
    this.ButtonAudio.play();
    this.game.state.start('aboutUsState');


    // this.button.inputEnabled = false;

    // this.aboutUsVideo.addToWorld();
    // this.aboutUsVideo.play();
    // // this.button.visible=0;
    // // this.playButton.visible=0;
    
    // if(this.game.input.onTap.add(function(){
    //   this.game.state.start('map',"aboutUs");
    // }
    // , this));
    
    
  }

  // onTap(){
    
  //   // this.aboutUsVideo.visible=0;
  //   console.log("HALLO");
  //   this.button.visible=1;
  //   this.playButton.visible=1;

  // }

  // aufLosGehtsLos(){
    



  // }
}

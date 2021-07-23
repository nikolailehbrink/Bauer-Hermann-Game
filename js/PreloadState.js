class PreloadState extends Phaser.State {


  preload() {
    this.loadReady = false;
    this.preloadBar = this.game.add.sprite(400, 300, 'preloadBar');
    this.preloadBar.anchor.setTo(0.5);
    // this.preloadBar.scale.x=0.5;
    // this.preloadBar.scale.y=0.5;
    this.game.load.setPreloadSprite(this.preloadBar);

    //ganzes Laden hier rein
    this.game.load.video('mapOverview', 'assets/video/mapOverview.mp4');
    this.game.load.video('aboutUs', 'assets/video/aboutUs.mp4');
    this.game.load.spritesheet('button', 'assets/sprites/greenSheet.png', 190, 49, 5);
    this.game.load.spritesheet('player', 'assets/player.png', 64, 64);
    this.game.load.spritesheet('bullebully', 'assets/bullebully.png', 64, 64);
    this.game.load.spritesheet('trecker', 'assets/Traktor.png', 64, 64);
    this.game.load.spritesheet('anhaenger', 'assets/Anhaenger.png', 64, 64);
    this.game.load.spritesheet('menuButton', 'assets/Menu_Sprites.png', 80, 80);
    this.game.load.spritesheet('mainMenuButton', 'assets/Main_Menu_Sprites.png', 220, 80);

    this.game.load.spritesheet('hermannCoins', 'assets/hermannCoins.png', 64, 64);
    this.game.load.tilemap('Bauernhof_Overworld', 'assets/tilemaps/maps/Bauernhof_Overworld.json', null, Phaser.Tilemap.TILED_JSON);
    this.game.load.tilemap('Bauernhof_Level1', 'assets/tilemaps/maps/Bauernhof_Level1.json', null, Phaser.Tilemap.TILED_JSON);
    this.game.load.tilemap('Bauernhof_Level2', 'assets/tilemaps/maps/Bauernhof_Level2.json', null, Phaser.Tilemap.TILED_JSON);
    this.game.load.image('tiles', 'assets/tilemaps/tiles/roguelikeSheet_transparent_64x64.png');
    this.game.load.image('Heu', 'assets/Heu.png');
    this.game.load.image('Heubehaelter', 'assets/Heubehaelter.png');
    this.game.load.image('blackBackground', 'assets/blackBackground.png');
    this.game.load.image('heart', 'assets/heart.png');


    this.game.load.image('arrowKeys', 'assets/arrowKeys.png');

    this.game.load.image('whiteBack', 'assets/whiteBackground.png');


    this.game.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js');

    this.game.load.audio('hoeraufhier', 'assets/soundsneu/hoeraufhier.mp3');
    this.game.load.audio('hallo1', 'assets/soundsneu/hallo1.mp3');
    this.game.load.audio('drueckmahier', 'assets/soundsneu/drueckmahier.mp3');
    this.game.load.audio('vielzuteuer', 'assets/soundsneu/vielzuteuer.mp3');
    this.game.load.audio('backgroundnoise', 'assets/soundsneu/backgroundnoise.mp3');
    this.game.load.audio('ey', 'assets/soundsneu/ey.mp3');
    this.game.load.audio('scheissee', 'assets/soundsneu/scheissee.mp3');
    this.game.load.audio('nochniegehabt', 'assets/soundsneu/nochniegehabt.mp3');
    this.game.load.audio('auflosgehtslos', 'assets/soundsneu/auflosgehtslos.mp3');
    this.game.load.audio('BauerHermannTheme', 'assets/soundsneu/BauerHermannTheme.mp3');
    this.game.load.audio('heuAufgenommen', 'assets/soundsneu/heuAufgenommen.mp3');
    this.game.load.audio('GameOver', 'assets/soundsneu/GameOver.mp3');
    this.game.load.audio('scheisse1', 'assets/soundsneu/scheisse1.mp3');
    this.game.load.audio('coinAudio', 'assets/soundsneu/coinAudio.mp3');
    this.game.load.audio('ButtonAudio', 'assets/soundsneu/ButtonAudio.mp3');
    this.game.load.audio('TraktorSound', 'assets/soundsneu/TraktorSound.mp3');
    this.game.load.audio('Root', 'assets/soundsneu/Root.mp3');
    
    this.game.load.audio('scheissee', 'assets/soundsneu/scheissee.mp3');

    this.game.load.onLoadComplete.add(this.loadComplete, this);
  }
  loadComplete() {
    this.loadReady = true;
  }

  update() {
    if ((this.game.cache.isSoundDecoded('ey') && this.loadReady) == true) {
      this.time.events.add(500, function () {
        this.game.state.start('menu',null)
        }, this);
    }

  }





}

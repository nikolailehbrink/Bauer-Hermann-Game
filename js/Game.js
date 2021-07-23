class Game extends Phaser.Game {
  constructor(config) {
    super(config);
    this.state.add('bootState', BootState, false);
    this.state.add('preloadState', PreloadState, false);
    this.state.add('aboutUsState', AboutUsState, false);
    this.state.add('menu', StateMenu, false);
    this.state.add('gameOverState', GameOverMenu, false);
    this.state.add('map', StateMap, false);
    this.state.add('level1', LevelOne, false);
    this.state.add('level2', LevelTwo, false);
    this.state.start('bootState', true, false, null);
  }
}

WebFontConfig = {

    //  1-Sekunde Delay, weil Google Fonts sonst nicht richtig geladen werden
     function() { game.time.events.add(Phaser.Timer.SECOND, createText, this); },
     
    google: {
      families: ['Bangers']
    }

};

let config = {
  width: 800,
  height: 600,
  parent: 'game',
  antialiasing: false,
  renderer: Phaser.AUTO
};


var game = new Game(config);

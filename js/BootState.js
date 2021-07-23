class BootState extends Phaser.State {


  preload() {
    this.game.load.image('preloadBar', 'assets/preloadbar.png');
  }

  create() {
    this.game.stage.backgroundColor = '#fff';
    this.game.state.start('preloadState');



  }




}

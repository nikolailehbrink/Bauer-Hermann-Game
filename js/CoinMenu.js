class CoinMenu extends Phaser.Sprite{

constructor(game, x, y){

  super(game, x, y, 'hermannCoins');

  // super(game, 0, 0, 'hermannCoins');
  this.scale.setTo(0.5,0.5);

  this.animations.add('muenze', [0, 1, 2, 3,4,5,6,7], 10, true);
  this.animations.play('muenze');
  this.fixedToCamera = true;
  this.cameraOffset.setTo(650, 10);
  this.game.world.add(this);

  this.game.muenzText= this.game.add.text(690,0, '', { font: '25px Bangers', fill: '#fff' });
  this.game.muenzText.align = 'center';
  // this.muenzText.anchor.setTo(0.5);
  this.game.muenzText.fixedToCamera = true;
  this.game.muenzText.padding.set(100,100);
  // this.muenzText.setShadow(5, 5, 'rgba(0,0,0,0.5)', 5);
  // console.log(this.muenzText.padding);
  this.game.muenzText.cameraOffset.setTo(685, 8);



}
  update(){
    this.game.muenzText.text = ' x ' + this.game.coins;

  }


}

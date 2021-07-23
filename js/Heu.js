class Heu extends Phaser.Sprite {
    constructor(game, x, y) {
        super(game, 0, 0, 'Heu');
        this.canWalk = true;
        this.setPos(x, y);
        this.anchor.setTo(0.5, 0.5);
        this.game.physics.arcade.enable(this);
        this.body.setSize(32, 32, 16, 32);
        this.body.collideWorldBounds = true;
        this.game.world.add(this);
    }
    setPos(x, y) {
        this.x = x * 64 + 32;
        this.y = y * 64 + 28;
    }

    update(player) {


        if(game.physics.arcade.collide(player, this)){
            this.kill();

            return true;
        }

        return false;

    }
}
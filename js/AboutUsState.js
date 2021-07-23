class AboutUsState extends Phaser.State {

    create(){

        this.aboutUsVideo = this.game.add.video('aboutUs');
        
        this.aboutUsVideo.addToWorld();
         this.aboutUsVideo.play();
        
        
        if(this.game.input.onTap.add(function(){
            
            this.game.state.start('menu', true, false, "aboutUs");
            // this.aboutUsVideo.stop();
          }
          , this));


    }


}

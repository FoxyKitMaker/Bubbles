export default class Shark extends Phaser.Physics.Arcade.Sprite {
  constructor(config) {
    super(config.scene, config.x, config.y, 'shark')

    this.scene = config.scene;
    this.scene.add.existing(this);
    this.scene.physics.world.enable(this);

    this.setScale(4)
        .setImmovable(true)
  }
  // Ataque al juagdor    
  Attack(playerY){
    this.anims.play('attack');
    
    this.scene.tweens.chain({
      targets: this,
      persist: true,
      tweens: [
        {
          x: 100,
          y: playerY,
          duration: 500,
          yoyo: true
        },
        {
          x: -70,
          y: 500
        }
      ]
    });
  }
}
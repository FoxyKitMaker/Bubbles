export default class Player extends Phaser.Physics.Arcade.Sprite {
  constructor(config) {
    super(config.scene, config.x, config.y, 'player')

    this.scene = config.scene;
    this.scene.add.existing(this);
    this.scene.physics.world.enable(this);

    this.setScale(4)
        .setCollideWorldBounds(true)
        .setImmovable(true)
        
    this.scene.physics.world.setBounds(0, 90, this.scale.width, 760);
    this.setBounds(10, 10, 100, 130);
    this.update();
    this.anims.play('movement');
    
    this.cursors = this.scene.input.keyboard.createCursorKeys();
  }
  // Movimiento del jugador
  Movement(){
    if (this.cursors.up.isDown){
      this.setVelocityY(-360);
      this.setAngle(180);
      this.flipX = true;
      this.flipY = true;
    }
    else if (this.cursors.down.isDown){
      this.setVelocityY(360);
      this.body.rotation = -180;
      this.flipX = false;
      this.flipY = false;
    }
    else {
      this.setVelocityY(0);
    }
  }
  // Establecer los márgenes de movimiento
  setBounds(x, y, width, height) {
    this.bounds = new Phaser.Geom.Rectangle(x, y, width, height);
  }

  update() {
    if (this.x < this.bounds.x) {
      this.x = this.bounds.x;
    } else if (this.x > this.bounds.x + this.bounds.width) {
      this.x = this.bounds.x + this.bounds.width;
    }

    if (this.y < this.bounds.y) {
      this.y = this.bounds.y;
    } else if (this.y > this.bounds.y + this.bounds.height) {
      this.y = this.bounds.y + this.bounds.height;
    }
  }
}
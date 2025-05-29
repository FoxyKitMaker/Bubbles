export default class JellyFishGroup extends Phaser.Physics.Arcade.Group {
  constructor(data) {
    super(data.scene.physics.world, data.scene);
    this.scene = data.scene;
    this.qP = data.qP;
    this.Data = data.Data;

    this.subject = this.qP[this.Data.selected[0]][this.Data.selected[1]];
    this.question = this.subject[this.Data.question];
    console.log(this.subject.color);

    this.color = this.subject.color;
  }
  // Crear la medusa
  createJellyFish(x, y) {
    const jellyfish = this.create(x, y, 'jellyfish_red');
    jellyfish.setScale(4).flipX = true;
    jellyfish.setTint("0x" + this.color.slice(1));
    jellyfish.anims.play('jellyfish_red_idle');
    jellyfish.body.setVelocityX(Phaser.Math.Between(-200, -100));
    return jellyfish;
  }
  // Crear los hijos de la medusa con el texto
  update() {
    this.children.iterate(jellyfish => {
      if (jellyfish) {
        if (jellyfish.correct == null || jellyfish.correct == 'text'){
          var keys = Object.keys(this.question);
          Phaser.Utils.Array.Remove(keys, 'text');
          jellyfish.correct = Phaser.Utils.Array.GetRandom(keys);          
        }
        if (jellyfish.txt == null){
          var keys2 = this.question[jellyfish.correct];
          jellyfish.name = Phaser.Utils.Array.GetRandom(keys2);
          jellyfish.txt = this.scene.add.text(jellyfish.x, jellyfish.y - 45, jellyfish.name, { 
            fontFamily: 'VT323', fontSize: '30px', backgroundColor: 0xB0B0B0 });
        }
        else{
          jellyfish.txt.x = jellyfish.x;
        }
        if (jellyfish.x < -40) {
          if (jellyfish.correct == 'correctas'){
            this.scene.Attack();
          }
          jellyfish.destroy();
          jellyfish.txt.destroy();
        }
      }
    });
  }
}
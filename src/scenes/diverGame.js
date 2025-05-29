import Player from "../components/player.js";
import Shark from "../components/shark.js";
import JellyFishGroup from "../components/jellyfish.js";

export default class DiverGame extends Phaser.Scene {
  constructor() {
    super({key: 'DiverGame'});
    this.gameTime = 0;
    this. initialDelay = 3500;
    this.speedIncreaseFactor = 100;
  }

  init(){
    this.Data = this.cache.json.get('data_pack');
    this.Data['previous_scene'] = 'diverGame';

    this.scene.launch('UI');
    this.uiScene = this.game.scene.getScene('UI');
    
    this.qP = this.cache.json.get('questions_pack');

    this.subject = this.Data.selected[0];
    this.subSel = this.qP[this.subject][this.Data.selected[1]]
    this.QK = Object.keys(this.subSel).filter((key) => key !== "color");
    this.question = this.Data.question = Phaser.Math.Between(1, this.QK.length);
    this.questionTXT = document.getElementById('questionID').innerText = 'Busca: ' + this.subSel[this.question]['text'];
  }
  
  create(){
    // Audios
    if(!this.sceneActive){
      this.sound.removeByKey('audioGame');
      this.sound.removeByKey('audioGame2');
      this.sound.play('audioGame', {loop: true, volume: this.Data['music_volume']});
      this.sound.play('audioGame2', {loop: true, volume: this.Data['music_volume']});
    }
    
    this.sceneActive = true;
    this.cursors = this.input.keyboard.createCursorKeys();
    
    this.playerScript = new Player({
      scene: this,
      x: 100,
      y: this.scale.height/2,
    });
    
    this.shark = new Shark({
      scene: this,
      x: -70,
      y: 500,
    });
    // Aparición de las medusas
    this.jellyFishGroup = new JellyFishGroup({scene: this, qP: this.qP, Data: this.Data});
    this.jellyFishTween = this.time.addEvent({
      delay: this.initialDelay,
        callback: () => {
          const randomY = Phaser.Math.Between(110, this.scale.height - 150);
          this.jellyFishGroup.createJellyFish(this.scale.width + 5, randomY);
          this.resetDelay();
        },
        loop: true
    });
    // Añadirle físicas a los colliders
    this.physics.add.collider(this.playerScript, this.jellyFishGroup, this.handleCollision, null, this);
    // Tamaño del collider del jugador
    this.playerScript.setSize(20, 32, true);
  }
  
  update(){
    if (this.sceneActive){
      this.jellyFishGroup.update();
      this.playerScript.Movement();
    }
  }
  // Delay de aparición de las medusas
  resetDelay() {
    this.gameTime += this.game.loop.delta;
      if (this.jellyFishTween.delay > 500) {
      this.jellyFishTween.delay -= this.speedIncreaseFactor;
      }
  }
  // Colisión entre el jugador y las medusas
  handleCollision(player, jellyfish) {
    if (jellyfish.correct == 'correctas'){
      this.uiScene.updateScore();
      this.uiScene.setProgressBar(+10);
      this.sound.play('audioJellyfishCorrect', {volume: this.Data['sfx_volume']})
    }
    else{
      this.sound.play('audioJellyfishIncorrect', {volume: this.Data['sfx_volume']})
      this.Attack();
    }
    jellyfish.txt.destroy();
    jellyfish.destroy();
  }
  // Ataque del tiburón
  Attack(){
    this.shark.Attack(this.playerScript.y);
    this.uiScene.setProgressBar(-10);
  }
  // Esconder todas las animaciones
  hideAnimations() {
    this.sceneActive = false;
    this.playerScript.destroy();
    this.time.removeEvent(this.jellyFishTween);
    this.jellyFishTween = undefined;
    this.jellyFishGroup.setVisible(false);

    const jellyfishes = this.jellyFishGroup.getChildren();
    jellyfishes.forEach(jellyfish => {
      if (jellyfish.txt) {
        jellyfish.txt.destroy();
      }
    });
  }
}
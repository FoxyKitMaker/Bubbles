export default class Preloader extends Phaser.Scene {
  constructor() {
    super({ key: 'Preloader'});
  }

  preload(){
    //=======================================================================================================
    this.load.json('questions_pack', 'src/json/DGQuestions_copy.json');
    this.load.json('data_pack', 'src/json/Data.json');
    //=======================================================================================================
    this.load.audio('audioMainMenu', 'assets/audio/music/twilight-calm-cinematic-sound.mp3');
    this.load.audio('audioGame', 'assets/audio/music/water.mp3');
    this.load.audio('audioGame2', '/assets/audio/music/heavy-bubbles.mp3');
    this.load.audio('audioGameOver', 'assets/audio/music/game-over.mp3');
    this.load.audio('audioJellyfishCorrect', 'assets/audio/music/touch-correct-jellyfish.mp3');
    this.load.audio('audioJellyfishIncorrect', 'assets/audio/music/touch-incorrect-jellyfish.mp3');
    //=======================================================================================================
    this.load.image('o2Tank', 'assets/images/SpearFishing/sprites/o2Tank.png');
    this.load.image('o2Slider', 'assets/images/SpearFishing/sprites/o2Slider.png');
    //=======================================================================================================
    this.load.atlas('player', 'assets/images/SpearFishing/Sprites/Diver-32x32/Diver_3.png', 'src/json/player/player_atlas.json');
    this.load.animation('player_anim', 'src/json/player/player_anim.json');
    
    this.load.atlas('shark', 'assets/images/SpearFishing/Sprites/Shark - 32x32/Shark.png', 'src/json/shark/shark_atlas.json');
    this.load.animation('shark_anim', 'src/json/shark/shark_anim.json');
    
    this.load.atlas('jellyfish_red', 'assets/images/SpearFishing/Sprites/jellyfish_red.png', 'src/json/jellyFish/jellyfish_red_atlas.json');
    this.load.animation('jellyFish_red_anim', 'src/json/jellyFish/jellyfish_red_anim.json')
    //=======================================================================================================
    this.load.on('complete', () => {
      this.Data = this.cache.json.get('data_pack');
      this.sound.setVolume(this.Data['music_volume']);
      this.scene.start('MainMenu');
    });
  }
}
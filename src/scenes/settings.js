export default class Settings extends Phaser.Scene {
  constructor() {
    super({ key: 'Settings' });
    this.initialScore = 0;
    this.newScore = 100;
    this.initialAir = 100;
    this.actualAir = 100;
  }

  create() {
    this.Data = this.cache.json.get('data_pack');
    this.Data['previous_scene'] = 'settings';

    this.musicSliderSetup();
    this.sfxSliderSetup();
    this.DragDetector();
  }
  // Barra de música
  musicSliderSetup() {
    this.bar1 = this.add.nineslice(500, 400, 'o2Tank');
    this.fill1 = this.add.nineslice(this.bar1.x + 35, this.bar1.y, 'o2Slider', 0, 100, 60, 30, 20, 30, 20);

    this.bar1.setOrigin(0, 0.5)
      .setScale(2, 3)
      .setInteractive();

    this.fill1.setOrigin(0, 0.5)
      .setScale(0.4)
      .setInteractive({ draggable: true })
      .width = this.Data['music_volume'] * 1175;
    this.fill1.input.hitArea.setTo(0, 0, this.fill1.width, this.fill1.height);
  }
  // Barra de efectos
  sfxSliderSetup() {
    this.bar2 = this.add.nineslice(500, 500, 'o2Tank');
    this.fill2 = this.add.nineslice(this.bar2.x + 35, this.bar2.y, 'o2Slider', 0, 100, 60, 30, 20, 30, 20);

    this.bar2.setOrigin(0, 0.5)
      .setScale(2, 3)
      .setInteractive();

    this.fill2.setOrigin(0, 0.5)
      .setScale(0.4)
      .setInteractive({ draggable: true })
      .width = this.Data['sfx_volume'] * 1175;
    this.fill2.input.hitArea.setTo(0, 0, this.fill2.width, this.fill2.height);
  }
  // Detector de arrastre
  DragDetector(){
    this.input.on('drag', (pointer, gameObject, dragX) => {
      let slider;
      let data;
      if (gameObject.y == this.bar1.y){
        slider = this.bar1;
        data = 'music_volume';
      }
      else{
        slider = this.bar2;
        data = 'sfx_volume';
      }
      dragX = Phaser.Math.Clamp(pointer.x, slider.x + 15, slider.x + 470);
      
      gameObject.width = (dragX - slider.x) * 2.5;
      gameObject.input.hitArea.setTo(0, 0, gameObject.width, gameObject.height);
      this.Data[data] = (gameObject.width / 1175);
    });
  }
}
export default class UI extends Phaser.Scene {
  constructor() {
    super({ key: 'UI' });
    this.initialScore = 0;
    this.newScore = 100;
    this.initialAir = 100;
    this.actualAir = 100;
  }

  create() {
    this.Data = this.cache.json.get('data_pack');

    this.qTTxt = document.getElementById('scoreboardID');
    this.slider = document.getElementById('sliderID');
    this.qTTxt.innerText = "SCORE: " + this.initialScore;

    this.actualAir = this.initialAir;
    this.timer = 0;
    this.updateProgressBar();
    this.updateSlider();
  }
  //=======================================================================================================================
  // Actualizar la barra de tiempo
  updateSlider() {
    this.updateSliderTimer = this.time.addEvent({
      delay: 1000,
      callback: () => {
        this.timer ++;
        if (this.timer >= 10){
          this.actualAir -= 3; // CAMBIAR A aprox -3 PARA EL JUEGO
          
          if (this.actualAir > 100) {
            this.actualAir = 100;
          }
          
          if (this.actualAir <= 0) {
            this.gameOVER();
          }
          this.updateProgressBar();
        }
      },
      loop: true
    });
  }

  updateProgressBar() {
    this.slider = document.getElementById('sliderID');
    this.slider.style.width = Math.min(this.actualAir * 0.87, 87) + '%';
  }

  setProgressBar(input) {
    this.actualAir += input;
    this.updateProgressBar();
  }
  //=======================================================================================================================
  // Actualiza la puntuación
  updateScore() {
    let updateTween = this.tweens.addCounter({
      from: this.initialScore,
      to: this.newScore,
      duration: 300,
      ease: 'linear',
      onUpdate: tween => {
        const value = Math.round(tween.getValue());
        this.qTTxt.innerText = "SCORE: " + value;
      }
    });
    this.initialScore = this.newScore;
    this.newScore += 100;
    if (updateTween.isPlaying()) {
      updateTween.update('value', this.newScore);
    } else {
      updateTween = this.tweens.addCounter({
        from: this.initialScore,
        to: this.newScore,
        duration: 300,
        ease: 'linear',
        onUpdate: tween => {
          const value = Math.round(tween.getValue());
          this.qTTxt.innerText = "SCORE: " + value;
        }
      });
    }
  }
  // Resetear la puntuación
  resetScore() {
    this.qTTxt = document.getElementById('scoreboardID');
    this.initialScore = 0
    this.newScore = 100
    this.qTTxt.innerText = "SCORE: " + this.initialScore;
    this.updateProgressBar();
  }
  //=======================================================================================================================
  // Perder la partida
  gameOVER() {
    this.sound.removeByKey('audioGameOver');
    this.sound.play('audioGameOver', { volume: this.Data['sfx_volume'] });
    this.actualAir = 0;
    this.updateProgressBar();
    this.updateSliderTimer.remove();
    this.scene.stop('DiverGame');
    this.scene.stop();
    this.gameOver_Text = document.getElementById('gameOverTextID');
    this.gameOver_Text.style.visibility = 'visible';
    this.starButton = document.getElementsByClassName('background');
    for (let i = 0; i < this.starButton.length; i++) {
      this.starButton[i].style.visibility = 'visible';
    }
    this.spaceButton = document.getElementsByClassName('space');
    for (let i = 0; i < this.starButton.length; i++) {
      this.spaceButton[i].style.visibility = 'visible';
    }
  }
}
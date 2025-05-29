import MainMenu from '/src/scenes/main-menu.js';
import LoadingScene from '/src/scenes/loading.js';
import DiverGame from '/src/scenes/diverGame.js';
import Preloader from '/src/scenes/preloader.js';
import UI from '/src/scenes/ui.js';
import Settings from '/src/scenes/settings.js';

var config = {
  title: 'Bubbles',
  url: 'http://127.0.0.1:5500/index.html',
  version: '1.1.1',
  pixelArt: true,
  type: Phaser.AUTO,
  transparent: true,
  parent: 'container',
  scale: {
    mode: Phaser.Scale.RESIZE,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  banner: {
    hidePhaser: true,
    text: '#000000',
    background: ['#9edbf9', '#faf5ab', '#ef7135', '#ec4141', '#5fbb4e']
  },
  scene: [Preloader, MainMenu, Settings, LoadingScene, DiverGame, UI],
  physics: {
    default: 'arcade',
    arcade: {
      debug: false,
    }
  },
}
//=======================================================================================================
// Button Setup
const mainMenu = ['PreviousButton', 'NextButton', 'background', 'subject-container', 'SettingsButton'];
const diverGame = ['BackButton', 'scoreboard', 'question-text', 'sliderBG'];
const gameOver = ['gameOverText', 'BackButton', 'background'];
const settings = ['BackButton', 'settings-text', 'music-text', 'sfx-text'];
const loading = ['loader'];
const scenes = [mainMenu, diverGame, gameOver, settings, loading];

export var Category = 'mates';
export const ShowHide = (visible) => {
  for (var i = 0; i < scenes.length; i++) {
    var asset = scenes[i];
    for (var j = 0; j < asset.length; j++) {
      var Button = document.getElementsByClassName(asset[j])[0];
      Button.style.visibility = 'hidden';
    }
    for (var k = 0; k < visible.length; k++) {
      var Button = document.getElementsByClassName(visible[k])[0];
      Button.style.visibility = 'visible';
    }
  }
}

//Establecer estado inicial
ShowHide(mainMenu);

//Botón de Empezar
document.getElementById('startButton').addEventListener('click', () => {
  setTimeout(() => {
    const mainMenuScene = game.scene.getScene('MainMenu');
    Category = mainMenuScene.RefreshPtxt(0);
    const uiScene = game.scene.getScene('UI');

    game.sound.removeByKey('audioMainMenu');

    ShowHide(loading);
    game.scene.start('LoadingScene');
    uiScene.resetScore();
  }, 470);
  document.getElementsByClassName('space')[0].style.visibility = 'hidden';
});

//Botón de Volver
document.getElementById('backButton').addEventListener('click', () => {
  var Data = game.cache.json.get('data_pack');
  ShowHide(mainMenu);
  document.getElementsByClassName('space')[0].style.visibility = 'visible';
  game.scene.start('MainMenu');
  game.scene.stop('DiverGame');
  game.scene.stop('Settings');
  game.scene.stop('UI');

  game.sound.removeByKey('auidoGame');

  if (Data['previous_scene'] == 'diverGame') {
    const diverGameScene = game.scene.getScene('DiverGame');
    diverGameScene.hideAnimations();
    const uiScene = game.scene.getScene('UI');
    uiScene.resetScore();
  }
});

//Botón de Siguiente
document.getElementById('nextButton').addEventListener('click', () => {
  const mainMenuScene = game.scene.getScene('MainMenu');
  Category = mainMenuScene.RefreshPtxt(+1);
});

//Botón de Anterior
document.getElementById('previousButton').addEventListener('click', () => {
  const mainMenuScene = game.scene.getScene('MainMenu');
  Category = mainMenuScene.RefreshPtxt(-1);
});

//Botón de Ajustes
document.getElementById('settingsButton').addEventListener('click', () => {
  setTimeout(() => {
    ShowHide(settings);
    game.scene.start('Settings');
  }, 470);
  document.getElementsByClassName('space')[0].style.visibility = 'hidden';
})

//Para la escena de carga
export function Loader() {
  ShowHide(diverGame);
  game.scene.stop('LoadingScene');
  game.scene.start('DiverGame', { Category });
}
//=======================================================================================================
var game = new Phaser.Game(config)
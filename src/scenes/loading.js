import {Loader} from '/index.js'

export default class LoadingScene extends Phaser.Scene 
{
  constructor(){
    super({ key: 'LoadingScene'});
  }

  create(){
    this.Data = this.cache.json.get('data_pack');
    this.Data['previous_scene'] = 'loading';

    this.add.text(400,250, 'Utiliza las teclas "W" y "S" para subir y bajar \nAtrapa solo las medusas correctas, pero que no se te escapen',{
      fontSize: '50px',
      fontFamily: 'VT323',
      align: 'center',
      fill: '#fff',
      padding: { x: 25, y: -2 }
    });
    
    this.loadingTween = this.time.addEvent({
      delay: 5000, // CAMBIAR EN EL JUEGO A aprox 5000
        callback: () => {
          Loader();
        },
        loop: false
      });
  }
}
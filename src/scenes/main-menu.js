export default class MainMenu extends Phaser.Scene {
  constructor() {
    super({ key: 'MainMenu'});
  }

  create(){
    this.Data = this.cache.json.get('data_pack');

    this.sound.removeByKey('audioGame');
    //Sistema contra pistas repetidas
    if (this.Data['previous_scene'] != 'settings'){
      this.sound.removeByKey('audioMainMenu');
      this.sound.play('audioMainMenu', {loop: true, volume: this.Data['music_volume']});
    }
  
    this.questions = this.cache.json.get('questions_pack');
    this.categoriesN;
    this.categories = [];
    
    // Calling original functions
    this.getCategories();
    this.subject = this.Data.selected[0];
    this.PTxt = document.getElementById('subject-text').innerText = "Asignatura: " + Object.keys(this.questions[this.subject]);

    this.cursors = this.input.keyboard.createCursorKeys();
  }
   
  getCategories() {
    this.categories = Object.keys(this.questions);
    this.categoriesN = this.categories.length -1;
  }
  // Recarga el texto
  RefreshPtxt(add){
    if(this.subject < this.categoriesN && add > 0 ){
      this.subject = this.subject + add;
    }
    else if (this.subject > 0 && add < 0){
      this.subject = this.subject + add;
    }
    this.Data.selected = [this.subject, Object.keys(this.questions[this.subject])];
    this.PTxt = document.getElementById('subject-text').innerText = "Asignatura: " + this.Data.selected[1];
    return (this.categories[this.subject]);
  }
}
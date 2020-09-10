class Signature {
  constructor() {
    this.canvas = document.querySelector('#draw');
    this.ctx = this.canvas.getContext('2d');
    this.canvas.width = 240;
    this.canvas.height = 100;
    this.ctx.lineJoin = 'round'; //jointures entres les lignes
    this.ctx.lineCap = 'round'; // formes des lignes
    this.ctx.lineWidth = 4;
    this.ctx.strokeStyle = 'black';
    this.lastX = 0;
    this.lastY = 0;
    this.offsetX;
    this.offsetY;
    this.isDrawing = false;
    this.isEmpty = true;

    //  evenements clique souris et tactile
    this.canvas.addEventListener('mousemove', (e) => this.draw(e));
    this.canvas.addEventListener('mouseup', () => this.isDrawing = false); //desactiver mode dessin
    this.canvas.addEventListener('mouseout', () => this.isDrawing = false);
    this.canvas.addEventListener('mousedown', (e) => this.mouseCan());

    this.canvas.addEventListener('touchstart', () => { this.touchCan() });
    this.canvas.addEventListener('touchmove', (e) => { this.eventMove(e) });
    this.canvas.addEventListener('touchend', () => { this.isDrawing = false });

    //evenement qui supprime la signature au clique sur btn-effacer
    this.clear = document.getElementById("btn-effacer");
    this.clear.addEventListener('click', () => { this.clearCan() });
  }

  // appui souris sur canvas
  mouseCan() {
    this.isDrawing = true;
    [this.lastX, this.lastY] = [this.offsetX, this.offsetY]; //coordonnées = obtenir le dernier point de X et Y
  }

  // mouvement appuyé doigt sur canvas
  touchCan() {
    var rect = this.canvas.getBoundingClientRect(); //cible le canvas par rapport à la fenetre
    this.isDrawing = true;
    [this.lastX, this.lastY] = [event.touches[0].clientX - rect.x, event.touches[0].clientY - rect.y];
    //renvoie la coordonnée X du point de contact par rapport à la fenêtre

  }
  //methode qui permet d'effacer la signature
  clearCan() {
    this.isEmpty = true;
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.beginPath();
  }

  // mouvement du trait à l'appui sur la souris sur le canvas
  draw(e) {

    if (!this.isDrawing) return; //si isDrawing = true donc tracé visible return la valeur du parametre

    // event de mvt souris
    this.ctx.beginPath(); // debut mvt
    this.ctx.moveTo(this.lastX, this.lastY); // mvt a partir de la position
    this.ctx.lineTo(e.offsetX, e.offsetY); // creation ligne sur axes 
    this.ctx.stroke(); // trait continu (chemin du dessin)
    [this.lastX, this.lastY] = [e.offsetX, e.offsetY];
    this.isEmpty = false;
  }

  // mouvement tactile sur canvas
  eventMove(e) {
    if (!this.isDrawing) return;
    e.preventDefault();
    var rect = this.canvas.getBoundingClientRect();
    [this.lastX, this.lastY] = [event.touches[0].clientX - rect.x, event.touches[0].clientY - rect.y];
    this.ctx.lineTo(this.lastX, this.lastY);
    this.ctx.stroke();
    this.isEmpty = false;
    // le trait dépasse chaque coté du canvas alors stop
    if (this.lastX < 0 ||
      this.lastY < 0 ||
      this.lastX > (rect.x + rect.width) ||
      this.lastY > (rect.y + rect.height)) {
      return this.isDrawing = false;
    }
  }

}





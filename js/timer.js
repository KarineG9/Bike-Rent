class Timer {
  constructor() {
    this.resaVelo = document.getElementById('btn-valider');
    this.countdownElt = document.getElementById('countdown');
    this.startSeconds = sessionStorage.getItem('Seconds');
    this.interval = 0;
    this.resaEnCours = false;
    this.resaVelo.addEventListener('click', () => { this.startTimer() });
  }

  loadResa() {
    this.resaEnCours = true;
    this.startSeconds = sessionStorage.getItem('Seconds');
    this.interval = setInterval(() => { this.updateCountDown(); }, 1000);
  }

  startTimer() {
    clearInterval(this.interval);
    this.startSeconds = 1200;
    this.interval = setInterval(() => { this.updateCountDown(); }, 1000);
  }
  
  updateCountDown() {
    let minutes = Math.floor(this.startSeconds / 60); //nombre entier
    let seconds = this.startSeconds % 60;

    seconds = seconds < 10 ? '0' + seconds : seconds;

    this.countdownElt.innerHTML = `Temps restant : ${minutes}min ${seconds}sec`;

    this.startSeconds--;

    sessionStorage.setItem('Seconds', this.startSeconds);
    this.startSeconds = sessionStorage.getItem('Seconds');

    if (minutes <= 0 && seconds <= 0) {
      clearInterval(this.interval);
      this.countdownElt.innerHTML = "Temps écoulé, veuillez réserver à nouveau.";
      document.getElementById("resaText").style.display = 'none';
      sessionStorage.clear();
    }
  }

}





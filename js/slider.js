class Slider {
    constructor(idLeftElt, idRightElt, idPlayPauseElt, tabImages) {
        //Propriétés
        this.time = 5000;
        this.i = 0;
        this.btnLeftElt = document.getElementById(idLeftElt);
        this.btnRightElt = document.getElementById(idRightElt);
        this.btnPlayPauseElt = document.getElementById(idPlayPauseElt);
        this.tabImages = tabImages;
        this.slider = document.getElementById("slider-images");
        this.imagesElt = document.createElement("img");
        this.interval = null;

        //Creation Slider
        document.getElementById("slider-images").appendChild(this.imagesElt);
        this.showImage();
        this.interval = setInterval(() => this.nextImage(), this.time);
        document.querySelector(".fa-play-circle").style.display = 'none';

        //EventListener
        this.btnRightElt.addEventListener('click', () => this.nextImage());
        this.btnLeftElt.addEventListener('click', () => this.prevImage());
        document.addEventListener('keydown', (e) => this.eventKeyboard(e));

        document.querySelector(".fa-play-circle").addEventListener('click', () => this.playImage());
        document.querySelector(".fa-pause").addEventListener('click', () => this.pauseImage());
    }

    //methode qui met le slider sur play
    playImage() {
        document.querySelector(".fa-pause").style.display = 'block';
        document.querySelector(".fa-play-circle").style.display = 'none';
        this.interval = setInterval(() => this.nextImage(), this.time);
    }
    //methode qui met le slider sur pause
    pauseImage() {
        document.querySelector(".fa-pause").style.display = 'none';
        document.querySelector(".fa-play-circle").style.display = 'block';
        clearInterval(this.interval);
    }
    //methode qui affiche les images
    showImage() {
        this.imagesElt.src = this.tabImages[this.i];
    };

    //methode image suivante
    nextImage() {
        this.i++;
        if (this.i >= this.tabImages.length) {
            this.i = 0;
        }
        this.showImage();

    }
    // methode image precedente
    prevImage() {
        this.i--;
        if (this.i < 0) {
            this.i = this.tabImages.length - 1;
        }
        this.showImage();

    }


    // methode touche clavier
    eventKeyboard(Keypress) {
        if (Keypress.key === 'ArrowRight') {
            this.nextImage();
        } else if (Keypress.key === 'ArrowLeft') {
            this.prevImage();
        }

    }

}


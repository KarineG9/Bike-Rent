class Reservation {
    constructor() {
        this.timer = null;
        this.varcanvas = new Signature();
        this.stations = null;

        this.prenom = document.getElementById('prenom');
        this.nom = document.getElementById('nom');
        this.canvasDraw = document.getElementById('draw');
        this.formValid = document.getElementById('btn-form');
        this.annulBooking = document.getElementById('btn-annuler');
        this.resaVelo = document.getElementById('btn-valider');
        this.countdownElt = document.getElementById('countdown');
        this.panelResa = document.getElementById('container-booking');
        this.stationName = document.getElementById('nomstation');
        
        this.validationForm();
        this.confirmationResa();
        this.annulation();
        this.resaStorage();
    }

    // methode qui prend en parametre la variable des stations / affiche les informations suivantes au click sur un marqueur
    detailStations(markerStation) {
        
        document.getElementById("station-detail").style.display = "block";
        document.getElementById('annulationText').style.display = 'none';
        document.getElementById("map").style.width = "75%";
        document.getElementById("nomstation").innerHTML = `${markerStation.options.name}`;
        document.getElementById("addressStation").innerHTML = `Adresse : ${markerStation.options.address}`;
        document.getElementById("bike").innerHTML = `Vélos disponibles : ${markerStation.options.bike}`;
        document.getElementById("stands").innerHTML = `Places disponibles : ${markerStation.options.stands}`;
        document.getElementById("status").innerHTML = `Statut : ${markerStation.options.status}`;
        this.canvasDraw.style.display = 'none';
        this.stationStatus(markerStation.options.status);
        this.statutLang(markerStation.options.status);
        this.velodispo(markerStation.options.bike);
    // localstorage
        this.valueName = localStorage.getItem('name');
        this.valueSurname = localStorage.getItem('surname');
        document.getElementById('nom').value = this.valueName;
        document.getElementById('prenom').value = this.valueSurname;

    }

    // methode qui masque le panel de reservation si aucun velo n'est disponible

    velodispo(markerbike) {
        if (markerbike === 0) {
            document.getElementById("container-booking").style.display = "none";
        }
    }
    // methode qui permet de masquer la reservation si station fermée

    stationStatus(markerStatus) {
        if (markerStatus === "CLOSED") {
            document.getElementById('container-booking').style.display = 'none';
        } else {
            document.getElementById('container-booking').style.display = 'block';
        }
    }

    // methode qui traduit la langue du statut de la station

    statutLang(markerStatus) {

        let markerStationFR = document.getElementById("status");
        let colorStatus = document.getElementById("status");

        if (markerStatus === "OPEN") {
            markerStationFR.textContent = "OUVERTE";
            colorStatus.style.color = "green";
        }
        else if (markerStatus === "CLOSED") {

            markerStationFR.textContent = "FERMÉE";
            colorStatus.style.color = "red";
        }
    }

    //au clique du btn-form, si les champs nom et prenom sont rempli, afficher canvas
    validationForm() {
        this.formValid.addEventListener("click", (e) => {
            e.preventDefault();
            document.getElementById("btn-valider").style.display = "block";
            document.getElementById("btn-effacer").style.display = "block";

            if (!this.prenom.value || !this.nom.value) {
                this.canvasDraw.style.display = "none";
                document.getElementById("btn-valider").style.display = "none";
                document.getElementById("btn-effacer").style.display = "none";
                document.getElementById("no-content-form").innerHTML = "Veuillez renseigner les champs ci-dessus";
            } else {
                document.getElementById("no-content-form").style.display = 'none';
                this.canvasDraw.style.display = "block";
                document.getElementById("btn-valider").style.display = "block";
                document.getElementById("btn-effacer").style.display = "block";
            };

            // localstorage nom et prenom entrés sur le formulaire stoqués dans le storage
            localStorage.setItem('name', this.nom.value);
            this.valueName = localStorage.getItem('name');

            localStorage.setItem('surname', this.prenom.value);
            this.valueSurname = localStorage.getItem('surname');
        });
    }

    // au clique sur le btn-valider, si tous les champs sont remplis, effectuer ces actions
    confirmationResa() {
        this.resaVelo.addEventListener("click", () => {
            this.validationForm();
            if (!this.prenom.value || !this.nom.value || this.varcanvas.isEmpty) {
                document.getElementById("confirmText").innerHTML = "Veuillez remplir les informations demandées ci dessus.";
                return;
            } else {
                this.stationName = document.getElementById('nomstation').innerHTML;
                sessionStorage.setItem("nameStation", this.stationName);
                document.getElementById("resaText").style.display = 'block';
                document.getElementById("confirmText").style.display = 'none';
                document.getElementById("btn-valider").style.display = "none";
                document.getElementById('btn-effacer').style.display = 'none';
                this.countdownElt.style.display = 'block';
                this.annulBooking.style.display = 'block';
                document.getElementById("resaText").innerHTML = `Vélo réservé par ${this.prenom.value} ${this.nom.value} à la station ${this.stationName}`;
                this.timer = new Timer();
                this.timer.startTimer();
            }
        })
    }

    //au clique du btn-annuler, annuler la reservation et vider le storage
    annulation() {
        this.annulBooking.addEventListener('click', () => {
            sessionStorage.clear();
            clearInterval(this.timer.interval);
            document.getElementById("resaText").innerHTML = "Réservation annulée."
            document.getElementById("container-booking").style.display = "none";
            document.getElementById("annulationText").style.display = "block";
            this.countdownElt.style.display = 'none';
            this.annulBooking.style.display = 'none';
        })
    }

    //si il y a du contenu dans le session storage, effectuer ces actions 
    resaStorage() {
        if (sessionStorage.getItem('Seconds')) {
            this.annulBooking.style.display = 'block';
            this.stationName = sessionStorage.getItem("nameStation");
            this.valueName = localStorage.getItem('name');
            this.valueSurname = localStorage.getItem('surname');
            this.timer = new Timer();
            this.timer.loadResa();
            this.timer.countdownElt.style.display = "block";
            document.getElementById("resaText").innerHTML = `Vélo réservé par ${this.valueName} ${this.valueSurname} à la station ${this.stationName}`;
        } else {
            document.getElementById("recapResa").style.display = 'block';
            document.getElementById("resaText").innerHTML = "Aucune réservation en cours.";
        }
    }

}

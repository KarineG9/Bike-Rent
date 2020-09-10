class Map {
    constructor() {
        this.reservation = new Reservation();
        this.map = null;
        this.initMap();
        this.datas = this.getData();
        this.addMarkers();

    }

    //initalise la carte
    initMap() {
        var lyon = [45.75, 4.85];
        //creation map
        this.map = L.map('map').setView(lyon, 13);

        //creation  fichiers images de la carte
        L.tileLayer('https://maps.heigit.org/openmapsurfer/tiles/roads/webmercator/{z}/{x}/{y}.png',
            {
                maxZoom: 20
            }).addTo(this.map);
    }

    // affichage marqueurs
    addMarkers() {
        var lyon = [45.75, 4.85];
        var markersCluster = new L.MarkerClusterGroup();

        for (let i = 0; i < this.datas.length; i++) {

            let markerStation = L.marker([this.datas[i].position.lat, this.datas[i].position.lng], {
                name: this.datas[i].name,
                address: this.datas[i].address,
                bike: this.datas[i].available_bikes,
                stands: this.datas[i].available_bike_stands,
                status: this.datas[i].status

            });
            // au clique sur un marqueur, appel de la methode detailStations presente dans la classe reservation
            markerStation.addEventListener('click', () => this.reservation.detailStations(markerStation));
            markersCluster.addLayer(markerStation);

        }
        this.map.addLayer(markersCluster); // ajout des marqueurs sur la carte
    }

    //methode concernant les données de la stations/ la requete
    getData() {
        // clé API ville Lyon
        let URL = 'https://api.jcdecaux.com/vls/v1/stations?contract=lyon&apiKey=a71bdfefbac9df57b2ffcfa79c4078956f3d576e';
        //récupérer des données à partir d'une URL mise à jour donnée sur page web
        let requete = new XMLHttpRequest();

        // Initialise une requête
        requete.open('GET', URL, false);

        //Envoyer la requete
        requete.send(null);
        // statut de la réponse à la requête, 200 = succes de la requete
        if (requete.status === 200) {
            //requête sous forme de texte (conversion en object)
            var data = JSON.parse(requete.responseText);
        } else {
            console.log('requete pas exacte');
        }
        return data;
    }

}



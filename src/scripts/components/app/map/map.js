import * as L from 'leaflet';

export default class Map {
    constructor() {
        this.covidData = {};
        this.coordinatesData = {};
        this.map = {};
        this.mapCondition = '';
        this.popapDescription = '';
    }

    getCoordinates() {
        const json = require('../../../../../countries.json');
        json.map((country) => {
            this.coordinatesData[country.country_code] = country.latlng;
        });
    }

    createMap(covidData, condition) {
        this.covidData = covidData;
        this.mapCondition = condition;
        this.popapDescription = condition.split('Total').join('total ').toLowerCase();
        this.getCoordinates();
        this.map = L.map('map').setView([0, 0], 2);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        }).addTo(this.map);
        this.covidData.map((country) => this.setMarker(country));
    }

    setMarker(country) {
        L.circle(this.coordinatesData[country.CountryCode], {
            color: 'red',
            fillColor: '#f03',
            fillOpacity: 0.5,
            radius: country[this.mapCondition] / 10,
        })
            .addTo(this.map)
            .bindPopup(`${country.Country} ${country[this.mapCondition]} ${this.popapDescription}`)
            .openPopup();
    }
}

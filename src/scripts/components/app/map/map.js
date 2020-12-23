import * as L from 'leaflet';

export default class Map {
    constructor() {
        this.covidData = {};
        this.coordinatesData = {};
        this.map = {};
        this.mapCondition = '';
        this.popupDescription = '';
        this.activeCountry = '';
        this.countryMarkers = [];
        this.createMap();
    }

    getCoordinates() {
        const json = require('../../../../../countries.json');
        json.map((country) => {
            this.coordinatesData[country.country_code] = country.latlng;
            return country.latlng;
        });
    }

    createMap() {
        this.popupDescription = 'TotalConfirmed'.split('Total').join('total ').toLowerCase();
        this.getCoordinates();
        this.map = L.map('map').setView([0, 0], 2);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        }).addTo(this.map);
        this.setLegend();
    }

    updateMapData(covidData = {}, condition = 'TotalConfirmed', activeCountry) {
        this.covidData = covidData;
        this.mapCondition = condition;
        this.activeCountry = activeCountry;
        this.covidData.map((country) => this.setMarker(country));
    }

    setMarker(country) {
        const marker = L.circle(this.coordinatesData[country.CountryCode], {
            color: 'red',
            fillColor: '#f03',
            fillOpacity: 0.5,
            radius: country[this.mapCondition] / 10,
            country: country.Country,
        })
            .addTo(this.map)
            .bindPopup(`${country.Country} ${country[this.mapCondition]} ${this.popupDescription}`);
        marker.on('mouseover', () => marker.openPopup());
        marker.on('mouseout', () => marker.closePopup());
        this.countryMarkers.push(marker);
    }

    setLegend() {
        const legend = L.control({ position: 'topright' });
        legend.onAdd = () => {
            const div = L.DomUtil.create('div', 'info legend');
            div.className = 'map_legend';
            div.innerHTML += '<span class="legend_circle"></span><span>Cases by country</span>';
            return div;
        };
        legend.addTo(this.map);
    }
}

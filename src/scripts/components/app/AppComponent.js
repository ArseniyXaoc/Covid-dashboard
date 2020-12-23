import TableComponent from '../table/TableComponent';
import List from './leftSidebar/list';
import GlobalCases from './leftSidebar/globalCases';
import Map from './map/map';
import ChartComponent from '../chart/chart';

export default class AppComponent {
    constructor(dataService) {
        this.dataService = dataService;
        this.allCountriesData = {};
        this.allCountriesPopData = {};
        this.fetchAllData();
        this.dataStates = ['TotalConfirmed', 'TotalDeaths', 'TotalRecovered'];
        this.globalCases = new GlobalCases();
        this.list = new List();
        this.activatedCountry = '';
        this.table = new TableComponent();
        this.map = new Map();
        this.chart = new ChartComponent();
        this.activeState = '';
        this.cachingInProgress = 'Caching in progress';
    }

    // eslint-disable-next-line class-methods-use-this
    run() {
        console.log('App start!');
    }

    fetchAllData() {
        this.dataService.getAllCountriesSummaryData().then((data) => {
            if (data.Message === this.cachingInProgress) {
                throw Error(this.cachingInProgress);
            }
            this.allCountriesData = data;
            this.globalCases.showContent(
                this.allCountriesData.Global,
                this.dataStates[0],
                this.allCountriesData.Date,
            );
            this.list.showContent(this.allCountriesData.Countries, this.dataStates[0]);
            this.runCountryButtonListener();
            this.updateMapData();
            this.table.updateData(this.allCountriesData);
            // this.table = new TableComponent(this.allCountriesData);
        });
        this.dataService.getAllCountriesPopulationData().then((data) => {
            this.allCountriesPopData = data;
            this.table.updatePopulationData(this.allCountriesPopData);
            // this.table.coutryPopulationData = this.allCountriesPopData;
        });
    }

    runCountryButtonListener() {
        this.list.countryContainers.forEach((country) => country.container.addEventListener('click', () => {
            if (this.activatedCountry !== country.name.innerText) {
                this.activatedCountry = country.name.innerText;
            } else {
                this.activatedCountry = '';
            }
            this.list.setActivatedCountry(this.activatedCountry, country.container);
            this.table.changeCountry(this.activatedCountry.trim());
            this.chart.changeCountry(this.activatedCountry.trim());
        }));
        this.chart.confirmedButton.addEventListener('click', () => {
            this.activeState = this.chart.labelConfermed;
        });
        this.chart.deathButton.addEventListener('click', () => {
            this.activeState = this.chart.labelDeath;
        });
        this.chart.recoveredButton.addEventListener('click', () => {
            this.activeState = this.chart.labelRecovered;
        });
    }

    updateMapData() {
        this.map.updateMapData(this.allCountriesData.Countries, this.dataStates[0], this.activatedCountry);
        this.map.countryMarkers.forEach((marker) => {
            marker.on('click', this.addActiveCountryFromMap.bind(this));
        });
    }

    addActiveCountryFromMap(event) {
        this.activatedCountry = event.target.options.country;
    }
}

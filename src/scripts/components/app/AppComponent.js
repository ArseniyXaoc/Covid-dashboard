import TableComponent from '../table/TableComponent';
import List from './leftSidebar/list';
import GlobalCases from './leftSidebar/globalCases';
import Map from './map/map';

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
    }

    // eslint-disable-next-line class-methods-use-this
    run() {
        console.log('App start!');
    }

    fetchAllData() {
        this.dataService.getAllCountriesSummaryData().then((data) => {
            this.allCountriesData = data;
            this.globalCases.showContent(
                this.allCountriesData.Global,
                this.dataStates[0],
                this.allCountriesData.Date,
            );
            this.list.showContent(this.allCountriesData.Countries, this.dataStates[0]);
            this.runCountruButtonListener();
            this.map.createMap(this.allCountriesData.Countries, this.dataStates[0]);
            this.table.updateData(this.allCountriesData);
            // this.table = new TableComponent(this.allCountriesData);
        });
        this.dataService.getAllCountriesPopulationData().then((data) => {
            this.allCountriesPopData = data;
            this.table.updatePopulationData(this.allCountriesPopData);
            // this.table.coutryPopulationData = this.allCountriesPopData;
        });
    }

    runCountruButtonListener() {
        this.list.countryContainers.forEach((country) => country.container.addEventListener('click', () => {
            this.activatedCountry = country.name.innerText;
        }));
    }
}

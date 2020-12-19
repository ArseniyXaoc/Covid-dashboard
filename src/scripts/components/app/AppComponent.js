import TableComponent from '../table/TableComponent';
import List from './leftSidebar/list';
import GlobalCases from './leftSidebar/globalCases';

export default class AppComponent {
    constructor(dataService) {
        this.dataService = dataService;
        this.allCountriesData = {};
        this.allCountriesPopData = {};
        this.fetchPopulationData();
        this.fetchAllData();
        this.dataStates = ['NewConfirmed', 'NewDeaths', 'NewRecovered'];
        this.globalCases = new GlobalCases();
        this.list = new List();
    }

    // eslint-disable-next-line class-methods-use-this
    run() {
        console.log('App start!');
    }

    fetchAllData() {
        this.dataService.getAllCountriesSummaryData().then((data) => {
            this.allCountriesData = data;
            this.globalCases.showContent(this.allCountriesData.Global, this.dataStates[0]);
            this.list.showContent(this.allCountriesData.Countries, this.dataStates[0]);
            this.table = new TableComponent(this.allCountriesData);
        });
    }

    fetchPopulationData() {
        this.dataService.getAllCountriesPopulationData().then((data) => {
            this.allCountriesPopData = data;
            TableComponent.coutryPopulationData = this.allCountriesPopData;
        });
    }
}

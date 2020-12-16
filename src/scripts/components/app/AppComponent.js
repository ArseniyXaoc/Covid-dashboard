import { List } from './list/list';

export default class AppComponent {
    constructor(dataService) {
        this.dataService = dataService;
        this.allCountriesData = {};
        this.fetchAllData();
        this.predicates = ['NewConfirmed', 'NewDeaths', 'NewRecovered'];
    }

    // eslint-disable-next-line class-methods-use-this
    run() {
        console.log('App start!');
    }

    fetchAllData() {
        this.dataService.getAllCountriesSummaryData().then((data) => {
            this.allCountriesData = data;
            const list = new List(this.allCountriesData.Countries);
            // the parameter is determine by the state of the page
            list.getListContent(this.predicates[0]);
        });
    }
}

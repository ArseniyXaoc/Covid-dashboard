import { List } from './leftSidebar/list';
import { GlobalCases } from './leftSidebar/globalCases';

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
            const globalCases = new GlobalCases(this.allCountriesData.Global);
            globalCases.showContent(this.predicates[0]);
            const list = new List(this.allCountriesData.Countries);
            // the parameter is determine by the state of the page
            list.showContent(this.predicates[0]);
            console.log(this.allCountriesData.Countries.length);
        });
    }
}

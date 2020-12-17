import '../table/TableComponent';
import TableComponent from '../table/TableComponent';
import TableDataServise from '../table/table.data-service';

export default class AppComponent {
    constructor(dataService) {
        this.dataService = dataService;
        this.allCountriesData = {};
        this.allCountriesPopData = {};
        this.fetchPopulationData();
        this.fetchAllData();
    }

    // eslint-disable-next-line class-methods-use-this
    run() {
        console.log('App start!');
    }

    fetchAllData() {
        this.dataService.getAllCountriesSummaryData().then((data) => {
            this.allCountriesData = data;
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

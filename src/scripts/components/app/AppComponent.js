export default class AppComponent {
    constructor(dataService) {
        this.dataService = dataService;
        this.allCountriesData = {};
        this.fetchAllData();
    }

    // eslint-disable-next-line class-methods-use-this
    run() {
        console.log('App start!');
    }

    fetchAllData() {
        this.dataService.getAllCountriesSummaryData().then((data) => {
            this.allCountriesData = data;
        });
    }
}


export default class AppComponent {
    constructor(dataServise) {
        this.dataServise = dataServise;
        this.allCountriesData = this.fetchAllData();
    }

    run() {
        console.log(this.allCountriesData);
    }

    async fetchAllData() {
        return await this.dataServise.getAllCountriesSummaryData();
    }
}

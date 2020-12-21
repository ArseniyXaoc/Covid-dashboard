import List from './leftSidebar/list';
import GlobalCases from './leftSidebar/globalCases';

export default class AppComponent {
    constructor(dataService) {
        this.dataService = dataService;
        this.allCountriesData = {};
        this.fetchAllData();
        this.dataStates = ['NewConfirmed', 'NewDeaths', 'NewRecovered'];
        this.globalCases = new GlobalCases();
        this.list = new List();
        this.activatedCountry = '';
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
            this.list.countryContainers.forEach((country) => country.container.addEventListener('click', () => {
                this.activatedCountry = country.name.innerText;
                // there should be a function that takes the name of the country
                console.log(country.name.innerText);
            }));
        });
    }
}

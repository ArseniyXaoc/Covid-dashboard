import DataService from '../../services/data.service'
export default class AppComponent {
    constructor() {
        this.dataservise = new DataService();
    }

    run() {
        console.log('App is running!');
        this.allCityData = this.dataservise.getAllCityData();
    }
}

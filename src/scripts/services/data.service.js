export default class DataService {
    constructor() {
        this.url = 'http://api.covid19api.com/';
    }

    async getData(dataRequest){
        try {
            let response = await fetch(`https://cors-anywhere.herokuapp.com/${this.url}${dataRequest}`);
            let data = await response.json();
            return data;
        } catch (error) {
            throw new Error('no data loaded');
        }
    }

    async getAllCityData() {
        const allCountries = 'summary'
        let allCityData;
        try {
            allCityData = await this.getData(allCountries);
            return allCityData;
        }
        catch (error) {
            throw new Error('no data loaded');
        }
    }
}

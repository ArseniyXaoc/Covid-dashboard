import {COVID_API_URL, AllCountriesSummaryData} from '../constants/data-service.constants';

export default class DataService {
    constructor() {
    }

    async getData(dataRequest) {
        try {
            const response = await fetch(`${COVID_API_URL}${this.url}${dataRequest}`);
            const data = await response.json();
            return data;
        } catch (error) {
            throw new Error(NO_DATA_TEXT);
        }
    }

    async getAllCountriesSummaryData() {
        try {
            return await this.getData(AllCountriesSummaryData);;
        }
        catch (error) {
            throw new Error(NO_DATA_TEXT);
        }
    }
}

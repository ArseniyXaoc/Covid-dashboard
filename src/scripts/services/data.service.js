import { COVID_API_URL, ALL_COUNTRIES_SUMMARY_DATA, NO_DATA_TEXT } from '../constants/data-service.constants';

export default class DataService {
    constructor() {
    }

    // eslint-disable-next-line class-methods-use-this
    async getData(dataRequest) {
        try {
            const response = await fetch(`${COVID_API_URL}${dataRequest}`);
            const data = await response.json();
            return data;
        } catch (error) {
            throw new Error(NO_DATA_TEXT);
        }
    }

    async getAllCountriesSummaryData() {
        try {
            return await this.getData(ALL_COUNTRIES_SUMMARY_DATA);
        } catch (error) {
            throw new Error(NO_DATA_TEXT);
        }
    }
}

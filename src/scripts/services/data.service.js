import {
    COVID_API_URL, ALL_COUNTRIES_SUMMARY_DATA, NO_DATA_TEXT, POPULATION_API_URL,
} from '../constants/data-service.constants';

export default class DataService {
    constructor() {
    }

    // eslint-disable-next-line class-methods-use-this
    async getData(dataRequest) {
        try {
            // const response = await fetch(`${COVID_API_URL}${dataRequest}`);
            const data = require('../../../summary.json') // await response.json();
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

    // eslint-disable-next-line class-methods-use-this
    async getPopulationData() {
        try {
            const response = await fetch(POPULATION_API_URL);
            const data = await response.json();
            return data;
        } catch (error) {
            throw new Error(NO_DATA_TEXT);
        }
    }

    async getAllCountriesPopulationData() {
        try {
            return await this.getPopulationData();
        } catch (error) {
            throw new Error(NO_DATA_TEXT);
        }
    }
}

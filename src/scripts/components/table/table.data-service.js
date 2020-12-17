import {
    TOTAL_DATA_CONFIRMED,
    TOTAL_DATA_DEATHS,
    TOTAL_DATA_RECOVERED,
    NEW_DATA_CONFIRMED,
    NEW_DATA_DEATHS,
    NEW_DATA_RECOVERED,
    CURRENT_DATA_GLOBAL,
    WORLD_POPULATION,
} from '../../constants/table.constants';

const calcuCasesPerOneHundredThousand = (data, population) => ((data / population) * 100000).toFixed(3);

export default class TableDataServise {
    constructor() {
        this.globalDataCases = {};
        this.mainText = document.querySelector('.switch__main-text');
        this.prefixDataApi = {};

        this.diseaseTotalData = {
            confirmed: TOTAL_DATA_CONFIRMED,
            death: TOTAL_DATA_DEATHS,
            recovered: TOTAL_DATA_RECOVERED,
        };

        this.diseaseNewData = {
            confirmed: NEW_DATA_CONFIRMED,
            death: NEW_DATA_DEATHS,
            recovered: NEW_DATA_RECOVERED,
        };
    }

    cashGlobalData(apiData, state = CURRENT_DATA_GLOBAL, dayOrTotal,
        country, per100k, countryData) {
        const globalCases = 'global';
        const dayCases = 'total';

        this.prefixDataApi = apiData[CURRENT_DATA_GLOBAL];

        if (country) {
            this.prefixDataApi = apiData.Countries[country];
            this.mainText.innerText = this.prefixDataApi.Country;
        }

        if (state === globalCases) {
            if (dayOrTotal === dayCases) {
                if (per100k) {
                    this.getStateAverage(this.prefixDataApi, this.diseaseTotalData, countryData);
                } else {
                    this.getState(this.prefixDataApi, this.diseaseTotalData);
                }
            } else if (per100k) {
                this.getStateAverage(this.prefixDataApi, this.diseaseNewData, countryData);
            } else {
                this.getState(this.prefixDataApi, this.diseaseNewData);
            }
        }

        return this.globalDataCases;
    }

    getState(prefixDataApi, diseaseTotalData) {
        this.globalDataCases = {
            Confirmed: prefixDataApi[diseaseTotalData.confirmed],
            Deaths: prefixDataApi[diseaseTotalData.death],
            Recovered: prefixDataApi[diseaseTotalData.recovered],
        };
    }

    getStateAverage(prefixDataApi, diseaseTotalData, countryData) {
        let population = WORLD_POPULATION;
        if (prefixDataApi.Country) {
            population = countryData.find((item) => item.name === prefixDataApi.Country).population;
        }
        this.globalDataCases = {
            Confirmed: calcuCasesPerOneHundredThousand(prefixDataApi[diseaseTotalData.confirmed], population),
            Deaths: calcuCasesPerOneHundredThousand(prefixDataApi[diseaseTotalData.death], population),
            Recovered: calcuCasesPerOneHundredThousand(prefixDataApi[diseaseTotalData.recovered], population),
        };
    }
}

import {
    TOTAL_DATA_CONFIRMED,
    TOTAL_DATA_DEATHS,
    TOTAL_DATA_RECOVERED,
    NEW_DATA_CONFIRMED,
    NEW_DATA_DEATHS,
    NEW_DATA_RECOVERED,
    CURRENT_DATA_GLOBAL,
} from '../../constants/table.constants';

export default class TableDataServise {
    constructor() {
        this.globalDataCases = {};
    }

    cashGlobalData(apiData, state = CURRENT_DATA_GLOBAL, dayOrTotal) {
        const prefixDataApi = apiData[CURRENT_DATA_GLOBAL];

        if (state === 'global') {
            if (dayOrTotal === 'total') {
                this.getGlobalDataForLastDay(prefixDataApi);
            } else {
                this.getGlobalStateGlobal(prefixDataApi);
            }
        }
        return this.globalDataCases;
    }

    getGlobalDataForLastDay(prefixDataApi) {
        this.globalDataCases = {
            Confirmed: prefixDataApi[TOTAL_DATA_CONFIRMED],
            Deaths: prefixDataApi[TOTAL_DATA_DEATHS],
            Recovered: prefixDataApi[TOTAL_DATA_RECOVERED],
        };
    }

    getGlobalStateGlobal(prefixDataApi) {
        this.globalDataCases = {
            Confirmed: prefixDataApi[NEW_DATA_CONFIRMED],
            Deaths: prefixDataApi[NEW_DATA_DEATHS],
            Recovered: prefixDataApi[NEW_DATA_RECOVERED],
        };
    }
}

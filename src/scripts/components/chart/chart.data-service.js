export default class ChartDataServise {
    constructor() {
        this.dataArray = {};
    }

    // eslint-disable-next-line class-methods-use-this
    async getCountryData(dataApi, country) {
        try {
            const response = await fetch(`${dataApi}${country}`);
            const data = await response.json();
            return data;
        } catch (error) {
            throw new Error('NO_DATA_TEXT');
        }
    }

    async getCurrentCountryData(dataApi, country) {
        try {
            return await this.getCountryData(dataApi, country);
        } catch (error) {
            throw new Error('NO_DATA_TEXT');
        }
    }

    parseDataCityArray(data) {
        const Date = data.map((item) => item.Date.slice(0, 10));
        const Confermed = data.map((item) => item.Confirmed);
        const Death = data.map((item) => item.Deaths);
        const Recovered = data.map((item) => item.Recovered);
        this.dataArray = {
            Date,
            Confermed,
            Death,
            Recovered,
        };
        return (this.dataArray);
    }

    parseDataGlobalArray(data) {
        console.log(data);
        const Date = data.map((item) => item.last_update.slice(0, 10));
        Date.reverse();
        const Confermed = data.map((item) => item.total_cases);
        Confermed.reverse();
        const Death = data.map((item) => item.total_deaths);
        Death.reverse();
        const Recovered = data.map((item) => item.total_recovered);
        Recovered.reverse();
        this.dataArray = {
            Date,
            Confermed,
            Death,
            Recovered,
        };
        return (this.dataArray);
    }
}

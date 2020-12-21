import Chart from 'chart.js';
import ElementCreaton from './elementCreation';
import ChartDataServise from './chart.data-service';
import AppComponent from '../app/AppComponent';
import { GLOBAL_TIMELINE, COUNTRY_TIMELINE } from '../../constants/chart.constants';
import {
    querySelector,
    createElement,
    classListContains,
    setLastChildTextValue,
    toggleColorCheckedElement,
    createNewDivElement,
    addFieldToDivElement,
    clearData,
} from '../table/table.htmlUtils';

export default class ChartComponent {
    constructor() {
        this.DataServise = new ChartDataServise();
        this.chartWrapper = querySelector('.chart');
        this.Canvas = ElementCreaton.createBlock('canvas', 'myChart', this.chartWrapper);
        this.chartData = {};
        this.ctx = null;
        this.chart = null;
        this.currentCountry = '';
        this.getData(this.currentCountry);
        this.ctx = this.Canvas.getContext('2d');
        this.createChart();
        this.labelConfermed = 'Confermed';
        this.labelDeath = 'Death';
        this.labelRecovered = 'Recovered';
    }

    eventListeners(chartData) {
        const confirmedButton = querySelector('.table__sick');
        const deathButton = querySelector('.table__death');
        const recoveredButton = querySelector('.table__get-well');
        confirmedButton.addEventListener('click', () => {
            this.updateChartData(chartData.Confermed, null, this.labelConfermed);
        });
        deathButton.addEventListener('click', () => {
            this.updateChartData(chartData.Death, null, this.labelDeath);
        });
        recoveredButton.addEventListener('click', () => {
            this.updateChartData(chartData.Recovered, null, this.labelRecovered);
        });
    }

    getData(Country) {
        if (Country === '') this.getTotalCountryData(GLOBAL_TIMELINE, '');
        else this.getTotalCountryData(COUNTRY_TIMELINE, Country);
    }

    updateChartData(data, date, label) {
        this.chart.data.datasets[0].data = data;
        if (date) this.chart.data.labels = date;
        this.chart.data.datasets[0].label = label;
        this.chart.update();
    }

    createChart() {
        this.chart = new Chart(this.ctx, {
            type: 'line',
            data: {
                labels: null,
                datasets: [{
                    label: null,
                    backgroundColor: '#bb86fc',
                    borderColor: 'rgb(255, 99, 132)',
                    data: null,
                }],
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true,
                        },
                    }],
                },
            },
        });
    }

    getTotalCountryData(timeline, country) {
        this.DataServise.getCurrentCountryData(timeline, country).then((data) => {
            let chartData;
            if (this.currentCountry === '') {
                chartData = this.DataServise.parseDataGlobalArray(data);
            } else {
                chartData = this.DataServise.parseDataCityArray(data);
            }
            console.log(chartData);
            this.updateChartData(chartData.Death, chartData.Date, this.labelConfermed);
            this.eventListeners(chartData);
        });
    }
}

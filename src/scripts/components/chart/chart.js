import Chart from 'chart.js';
import ElementCreaton from './elementCreation';
import ChartDataServise from '../../services/chart.data-service';
import AppComponent from '../app/AppComponent';
import {
    GLOBAL_TIMELINE,
    COUNTRY_TIMELINE,
} from '../../constants/chart.constants';
import {
    querySelector,
    createElement,
    classListContains,
    setLastChildTextValue,
    toggleColorCheckedElement,
    createNewDivElement,
    addFieldToDivElement,
    clearData,
} from '../../utils/table.htmlUtils';

export default class ChartComponent {
    constructor() {
        this.chartDataService = new ChartDataServise();
        this.chartWrapper = querySelector('.chart');
        this.Canvas = ElementCreaton.createBlock('canvas', 'myChart', this.chartWrapper);
        this.chartData = {};
        this.chart = null;
        this.currentCountry = '';
        this.getData(this.currentCountry);
        this.ctx = this.Canvas.getContext('2d');
        this.createChart();
        this.labelConfermed = 'TotalConfirmed';
        this.labelDeath = 'TotalDeaths';
        this.labelRecovered = 'TotalRecovered';
        this.confirmedButton = querySelector('.table__sick');
        this.deathButton = querySelector('.table__death');
        this.recoveredButton = querySelector('.table__get-well');
    }

    changeCountry(country) {
        this.currentCountry = country;
        this.getData(country);
    }

    eventListeners(chartData) {
        this.confirmedButton.addEventListener('click', () => {
            this.updateChartData(chartData.confermed, null, this.labelConfermed);
        });
        this.deathButton.addEventListener('click', () => {
            this.updateChartData(chartData.death, null, this.labelDeath);
        });
        this.recoveredButton.addEventListener('click', () => {
            this.updateChartData(chartData.recovered, null, this.labelRecovered);
        });
    }

    getData(Country) {
        if (Country === '') {
            this.getTotalCountryData(GLOBAL_TIMELINE, '');
        } else {
            this.getTotalCountryData(COUNTRY_TIMELINE, Country);
        }
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
        this.chartDataService.getCurrentCountryData(timeline, country).then((data) => {
            let chartData;
            if (this.currentCountry === '') {
                chartData = this.chartDataService.parseDataGlobalArray(data);
            } else {
                chartData = this.chartDataService.parseDataCityArray(data);
            }
            this.updateChartData(chartData.death, chartData.date, this.labelConfermed);
            this.eventListeners(chartData);
        });
    }
}

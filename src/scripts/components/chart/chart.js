import Chart from 'chart.js';
import ElementCreaton from './elementCreation';
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
        this.chartWrapper = querySelector('.chart');
        this.Canvas = ElementCreaton.createBlock('canvas', 'myChart', this.chartWrapper);
        this.createChart();
    }

    createChart() {
        const ctx = this.Canvas.getContext('2d');
        const chart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
                datasets: [{
                    label: 'My First dataset',
                    backgroundColor: 'rgb(255, 99, 132)',
                    borderColor: 'rgb(255, 99, 132)',
                    data: [1, 2, 3, 4, 5, 6, 7],
                }],
            },

            // Configuration options go here
            options: {},
        });
    }
}

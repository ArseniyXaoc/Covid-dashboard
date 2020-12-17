// eslint-disable-next-line import/prefer-default-export
// import DataService from '../../../services/data.service';
import { ElementsCreater } from './elementsCreater';

// eslint-disable-next-line import/prefer-default-export
export class List {
    constructor(dataService) {
        this.dataService = dataService;
        this.elementsCreater = undefined;
        this.list = document.querySelector('.list');
        this.countryContainers = this.createHTML();
    }

    createHTML() {
        this.elementsCreater = new ElementsCreater();
        this.elementsCreater.crateTextElement('h2', 'list_header', 'Cases by Country', this.list);
        return Array(this.dataService.length).fill('').map(() => this.elementsCreater.createBlock('item', this.list));
    }

    showContent(predicate) {
        this.dataSort(predicate);
        this.dataService.forEach((element, item) => {
            this.countryContainers[item].innerHTML = '';
            this.elementsCreater.crateTextElement('span', 'country_cases', `${element[predicate]} `, this.countryContainers[item]);
            this.elementsCreater.crateTextElement('span', 'country', element.Country, this.countryContainers[item]);
        });
    }

    dataSort(predicate) {
        this.dataService = this.dataService.sort((a, b) => b[predicate] - a[predicate]);
    }
}

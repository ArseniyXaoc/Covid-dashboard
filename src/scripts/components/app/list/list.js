// eslint-disable-next-line import/prefer-default-export
import { ListElementsCreater } from './listElementsCreater';

// eslint-disable-next-line import/prefer-default-export
export class List {
    constructor(dataService) {
        this.dataService = dataService;
        this.list = document.querySelector('.list');
    }

    getListContent(predicate) {
        this.dataSort(predicate);
        const listElementsCreater = new ListElementsCreater();
        listElementsCreater.crateTextElement('h2', 'list_header', 'Cases by Country', this.list);
        this.dataService.forEach((element) => {
            const country = listElementsCreater.createBlock('item', this.list);
            listElementsCreater.crateTextElement('span', 'country_cases', `${element[predicate]} `, country);
            listElementsCreater.crateTextElement('span', 'country', element.Country, country);
        });
    }

    dataSort(predicate) {
        this.dataService = this.dataService.sort((a, b) => b[predicate] - a[predicate]);
    }
}

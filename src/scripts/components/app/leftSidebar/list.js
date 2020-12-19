import ElementsCreator from './elementsCreator';

export default class List {
    constructor() {
        this.countryData = [];
        this.list = document.querySelector('.list');
        this.countryContainers = undefined;
    }

    createHTML() {
        ElementsCreator.crateTextElement('h2', 'list_header', 'Cases by Country', this.list);
        return Array(this.countryData.length).fill('').map(() => {
            const block = ElementsCreator.createBlock('item', this.list);
            const casesSpan = ElementsCreator.crateTextElement('span', 'country_cases', '', block);
            const nameSpan = ElementsCreator.crateTextElement('span', 'country', '', block);
            const flagImg = ElementsCreator.crateImg('country_flag', 'flag', block);
            return { countryFlag: flagImg, countryName: nameSpan, countryCases: casesSpan };
        });
    }

    showContent(data, state) {
        this.countryData = data;
        if (this.countryContainers === undefined) {
            this.countryContainers = this.createHTML();
        }
        this.dataSort(state);
        this.countryData.forEach((element, item) => {
            this.countryContainers[item].countryCases.innerText = `${element[state]} `;
            this.countryContainers[item].countryName.innerText = `${element.Country} `;
            this.countryContainers[item].countryFlag.src = `https://www.countryflags.io/${element.CountryCode}/flat/16.png`;
        });
    }

    dataSort(state) {
        this.countryData = this.countryData.sort((a, b) => b[state] - a[state]);
    }
}

import ElementsCreator from '../../../../utils/elementsCreator';

export default class List {
    constructor() {
        this.countryData = [];
        this.list = document.querySelector('.list');
        this.countryContainers = [];
        this.search = {};
    }

    createHTML() {
        const listHeader = ElementsCreator.crateTextElement('h2', 'list_header', this.list);
        listHeader.innerText = 'Cases by Country';
        this.search = ElementsCreator.crateTextElement('input', 'search', this.list);
        this.search.placeholder = 'Enter the country';
        return Array(this.countryData.length).fill('').map(() => {
            const block = ElementsCreator.createBlock('item', this.list);
            const casesSpan = ElementsCreator.crateTextElement('span', 'country_cases', block);
            const nameSpan = ElementsCreator.crateTextElement('span', 'country', block);
            const flagImg = ElementsCreator.crateImg('country_flag', 'flag', block);
            return {
                container: block,
                flag: flagImg,
                name: nameSpan,
                cases: casesSpan,
            };
        });
    }

    showContent(data, state) {
        this.countryData = data;
        if (this.countryContainers.length < 1) {
            this.countryContainers = this.createHTML();
        }
        this.dataSort(state);
        this.countryData.forEach((element, item) => {
            this.countryContainers[item].cases.innerText = `${element[state]} `;
            this.countryContainers[item].name.innerText = `${element.Country} `;
            this.countryContainers[item].flag.src = `https://www.countryflags.io/${element.CountryCode}/flat/16.png`;
        });
        this.search.addEventListener('keyup', () => this.onKeyup(this.search.value));
    }

    onKeyup(searchValue) {
        this.countryContainers.map((item) => {
            const country = item;
            if (!country.name.innerText.toLowerCase().startsWith(searchValue.toLowerCase())) {
                country.container.style.display = 'none';
            } else {
                country.container.style.display = 'block';
            }
            return this;
        });
    }

    dataSort(state) {
        this.countryData = this.countryData.sort((a, b) => b[state] - a[state]);
    }
}

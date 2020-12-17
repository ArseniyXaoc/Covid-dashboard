import { ElementsCreater } from './elementsCreater';

// eslint-disable-next-line import/prefer-default-export
export class GlobalCases {
    constructor(allCountriesData) {
        this.allCountriesData = allCountriesData;
        this.globalCases = document.querySelector('.globalCases');
        this.predicateSpan = undefined;
        this.valueSpan = undefined;
        this.createHTML();
    }

    createHTML() {
        const elementsCreater = new ElementsCreater();
        elementsCreater.crateTextElement('h2', 'globalCases_header', 'Global cases', this.globalCases);
        this.valueSpan = elementsCreater.crateTextElement('span', 'globalCases_value', '', this.globalCases);
        this.predicateSpan = elementsCreater.crateTextElement('span', 'globalCases_predicate', '', this.globalCases);
    }

    showContent(predicate) {
        const predicateBody = predicate.split('New').join('');
        const newCases = predicate;
        const totalCases = 'Total'.concat(predicateBody);
        this.valueSpan.innerHTML = `${this.allCountriesData[newCases]} / ${this.allCountriesData[totalCases]}`;
        this.predicateSpan.innerHTML = `new ${predicateBody.toLowerCase()} / total ${predicateBody.toLowerCase()}`;
    }
}

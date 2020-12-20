import ElementsCreator from '../../../../utils/elementsCreator';

export default class GlobalCases {
    constructor() {
        this.allCountriesData = [];
        this.globalCasesElement = document.querySelector('.globalCases');
        this.stateSpan = undefined;
        this.valueSpan = undefined;
        this.createHTML();
    }

    createHTML() {
        const globalCases = ElementsCreator.crateTextElement('h2', 'globalCases_header', this.globalCasesElement);
        globalCases.innerText = 'Global cases';
        this.valueSpan = ElementsCreator.crateTextElement('span', 'globalCases_value', this.globalCasesElement);
        this.stateSpan = ElementsCreator.crateTextElement('span', 'globalCases_state', this.globalCasesElement);
    }

    showContent(data, state) {
        this.allCountriesData = data;
        const stateBody = state.split('New').join('');
        const newCases = state;
        const totalCases = 'Total'.concat(stateBody);
        this.valueSpan.innerText = `${this.allCountriesData[newCases]} / ${this.allCountriesData[totalCases]}`;
        this.stateSpan.innerText = `new ${stateBody.toLowerCase()} / total ${stateBody.toLowerCase()}`;
    }
}

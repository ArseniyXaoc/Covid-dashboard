import '../../../styles/table.scss';
import TableDataServise from './table.data-service';
import {
    tableStates,
} from './table.config';
import {
    querySelector, classListContains,
    setLastChildTextValue, toggleCheckedState,
    createTableColumn, addFieldToDivElement, clearData,
} from '../../utils/table.htmlUtils';

export default class TableComponent {
    constructor() {
        this.tableDataServise = new TableDataServise();
        this.countryPopulation = {};
        this.fetchSetAPIData = {};
        this.currentCountry = '';
        this.confirmedList = querySelector('.table__sick');
        this.deathsList = querySelector('.table__death');
        this.recoveredList = querySelector('.table__get-well');
        this.titleElement = querySelector('.switch__main-text');
        this.activeState = tableStates.total;
        this.switchTotalOrDay = querySelector('.amount-checkbox');
        this.globalOr100k = querySelector('.indicator-checkbox');
        this.coutryPopulationData = {};
        this.createInterface();
    }

    dataProcessing() {
        this.globalDataCases = this.tableDataServise.fetchGlobalData(
            this.fetchSetAPIData,
            tableStates.global,
            this.activeState,
            this.currentCountry,
            this.globalOr100k.checked,
            this.coutryPopulationData,
        );
        this.currentCountryName = this.tableDataServise.dataApiStateURL.Country;
        if (this.currentCountryName) this.titleElement.innerText = this.currentCountryName;
    }

    updateData(fetchData) {
        this.fetchSetAPIData = fetchData;
        // this.setAllCountries();
        this.dataProcessing();
        this.renderData();
    }

    setAllCountries() {
        this.fetchSetAPIData.Countries.forEach((item) => {
            this.currentCountry = item.Country;
            this.dataProcessing();
            this.renderData();
        });
    }

    updatePopulationData(fetchData) {
        this.coutryPopulationData = fetchData;
        this.hendlerEventCheckbox();
    }

    hendlerEventCheckbox() {
        this.switchTotalOrDay.addEventListener('change', (event) => this.changeSetData.call(this, event));
        this.globalOr100k.addEventListener('change', (event) => this.changeSetData.call(this, event));
    }

    changeCountry(Country) {
        this.currentCountry = Country;
        clearData(this.DivElementArr);
        this.dataProcessing();
        this.renderData();
    }

    changeSetData(event) {
        clearData(this.DivElementArr);
        if (this.switchTotalOrDay.checked) {
            this.activeState = tableStates.new;
        } else if (!this.switchTotalOrDay.checked) {
            this.activeState = tableStates.total;
        }

        toggleCheckedState(event.target);
        this.dataProcessing();
        TableComponent.addDataToNewDivElement(this.DivElementArr, this.globalDataCases);
    }

    createInterface() {
        this.DivElementArr = createTableColumn();
        addFieldToDivElement(this.DivElementArr);
    }

    renderData() {
        this.confirmedList.appendChild(this.DivElementArr.confirmedElement);
        this.deathsList.appendChild(this.DivElementArr.deathsElement);
        this.recoveredList.appendChild(this.DivElementArr.recoveredElement);
        TableComponent.addDataToNewDivElement(this.DivElementArr, this.globalDataCases);
    }

    static addDataToNewDivElement(arr, data) {
        Object.keys(arr).forEach((key) => {
            if (classListContains(arr[key], 'table__sick')) setLastChildTextValue(arr[key], `${data.Confirmed}\n`);
            if (classListContains(arr[key], 'table__death')) setLastChildTextValue(arr[key], `${data.Deaths}\n`);
            if (classListContains(arr[key], 'table__get-well')) setLastChildTextValue(arr[key], `${data.Recovered}\n`);
        });
    }

    // Object.keys(arr).forEach((key) => {

    //     if (classListContains(arr[key], 'table__sick')) {
    //         const div = createElement('div');
    //         div.innerText = `${data.Confirmed}`;
    //         arr[key].appendChild(div);
    //     }

    //     if (classListContains(arr[key], 'table__death')) {
    //         const div = createElement('div');
    //         div.innerText = `${data.Deaths}`;
    //         arr[key].appendChild(div);
    //     }

    //     if (classListContains(arr[key], 'table__get-well')) {
    //         const div = createElement('div');
    //         div.innerText = `${data.Recovered}`;
    //         arr[key].appendChild(div);
    //     }
}

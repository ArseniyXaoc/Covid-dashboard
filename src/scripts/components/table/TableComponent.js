import TableDataServise from './table.data-service';
import {
    querySelector, createElement, classListContains,
    setLastChildTextValue, toggleColorCheckedElement,
    createNewDivElement, addFieldToDivElement, clearData,
} from './table.htmlUtils';

export default class TableComponent {
    constructor(setData) {
        this.countryPopulation = {};
        this.fetchSetAPIData = setData;
        this.currentCountry = 0;
        this.confirmedList = querySelector('.table__sick');
        this.deathsList = querySelector('.table__death');
        this.recoveredList = querySelector('.table__get-well');
        this.GlobalDataState = 'global';
        this.NewConfermedState = 'new';
        this.TotalConfermedState = 'total';
        this.ConfermedState = this.TotalConfermedState;
        this.switchTotalOrDay = querySelector('.checkbox1');
        this.globalOr100k = querySelector('.checkbox2');
        this.coutryPopulationData = {};
        this.dataProcessing();
        this.createInterface();
        this.renderData();
        this.hendlerEventCheckbox();
    }

    dataProcessing() {
        this.TableDataServise = new TableDataServise();

        this.globalDataCases = this.TableDataServise.cashGlobalData(this.fetchSetAPIData,
            this.GlobalDataState, this.ConfermedState,
            this.currentCountry, this.globalOr100k.checked,
            TableComponent.coutryPopulationData);
    }

    hendlerEventCheckbox() {
        this.switchTotalOrDay.addEventListener('change', (event) => this.changeSetData.call(this, event));
        this.globalOr100k.addEventListener('change', (event) => this.changeSetData.call(this, event));
    }

    changeSetData(event) {
        clearData(this.DivElementArr);
        if (this.switchTotalOrDay.checked) {
            this.ConfermedState = this.NewConfermedState;
        } else if (!this.switchTotalOrDay.checked) {
            this.ConfermedState = this.TotalConfermedState;
        }

        toggleColorCheckedElement(event.target);
        this.dataProcessing();
        TableComponent.addDataToNewDivElement(this.DivElementArr, this.globalDataCases);
    }

    createInterface() {
        this.DivElementArr = createNewDivElement();
        addFieldToDivElement(this.DivElementArr);
    }

    renderData() {
        this.confirmedList.appendChild(this.DivElementArr[0]);
        this.deathsList.appendChild(this.DivElementArr[1]);
        this.recoveredList.appendChild(this.DivElementArr[2]);
        TableComponent.addDataToNewDivElement(this.DivElementArr, this.globalDataCases);
    }

    static addDataToNewDivElement(arr, data) {
        arr.forEach((item) => {
            if (classListContains(item, 'table__sick')) setLastChildTextValue(item, `${data.Confirmed}`);
            if (classListContains(item, 'table__death')) setLastChildTextValue(item, `${data.Deaths}`);
            if (classListContains(item, 'table__get-well')) setLastChildTextValue(item, `${data.Recovered}`);
        });
    }
}

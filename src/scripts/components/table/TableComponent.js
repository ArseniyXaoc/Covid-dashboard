import TableDataServise from './table.data-service';

const querySelector = (selector) => document.querySelector(selector);
const createElement = (element) => document.createElement(element);
const classListContains = (item, text) => item.parentElement.classList.contains(text);
const setLastChildTextValue = (item, text) => {
    item.lastElementChild.append(document.createTextNode(text));
};

export default class TableComponent {
    constructor(setData, cityData) {
        this.cityData = cityData;
        this.fetchSetAPIData = setData;

        this.confirmedList = querySelector('.table__sick');
        this.deathsList = querySelector('.table__death');
        this.recoveredList = querySelector('.table__get-well');

        this.GlobalDataState = 'global';
        this.NewConfermedState = 'new';
        this.TotalConfermedState = 'total';
        this.ConfermedState = this.TotalConfermedState;
        this.switchTotalOrDay = querySelector('.checkbox1');
        this.globalOr100k = querySelector('.checkbox2');

        this.dataProcessing();
        this.createNewDivElement();
        this.renderData();
        this.hendlerEventCheckbox();
    }

    hendlerEventCheckbox() {
        this.switchTotalOrDay.addEventListener('change', this.changeSetData.bind(this));
        this.globalOr100k.addEventListener('change', this.changeSetData.bind(this));
    }

    changeSetData() {
        this.clearData();
        if (this.switchTotalOrDay.checked) {
            this.ConfermedState = this.NewConfermedState;
        } else {
            this.ConfermedState = this.TotalConfermedState;
        }
        TableComponent.toggleColorCheckedElement(this.ConfermedState);
        this.dataProcessing();
        TableComponent.addDataToNewDivElement(this.DivElementArr, this.globalDataCases);
    }

    static toggleColorCheckedElement(chainged) {
        const toggleColortotal = querySelector('.total');
        const toggleColorlastDay = querySelector('.last-day');
        const toggleColorglobal = querySelector('.global');
        const toggleColorperOneHundred = querySelector('per-one-hundred');
        if (chainged === 'new' || chainged === 'total') {
            toggleColortotal.classList.toggle('selected');
            toggleColorlastDay.classList.toggle('selected');
        }
    }

    clearData() {
        this.DivElementArr.forEach((item) => {
            item.lastElementChild.removeChild(item.lastElementChild.firstChild);
        });
    }

    dataProcessing() {
        this.TableDataServise = new TableDataServise();
        this.globalDataCases = this.TableDataServise.cashGlobalData(this.fetchSetAPIData,
            this.GlobalDataState, this.ConfermedState);
    }

    createNewDivElement() {
        const ConfirmedDiv = createElement('div');
        const DeathsDiv = createElement('div');
        const RecoveredDiv = createElement('div');
        this.DivElementArr = [ConfirmedDiv, DeathsDiv, RecoveredDiv];
        TableComponent.addFieldToDivElement(this.DivElementArr);
    }

    static addFieldToDivElement(arr) {
        arr.forEach((item) => {
            item.classList.add('table__element');
            item.appendChild(createElement('div')).classList.add('Table__List-data-text');
        });
    }

    static addDataToNewDivElement(arr, data) {
        arr.forEach((item) => {
            console.log(item);
            if (classListContains(item, 'table__sick')) setLastChildTextValue(item, `${data.Confirmed}`);
            if (classListContains(item, 'table__death')) setLastChildTextValue(item, `${data.Deaths}`);
            if (classListContains(item, 'table__get-well')) setLastChildTextValue(item, `${data.Recovered}`);
        });
    }

    renderData() {
        this.confirmedList.appendChild(this.DivElementArr[0]);
        this.deathsList.appendChild(this.DivElementArr[1]);
        this.recoveredList.appendChild(this.DivElementArr[2]);
        TableComponent.addDataToNewDivElement(this.DivElementArr, this.globalDataCases);
    }
}

import TableDataServise from './table.data-service';

const querySelector = (selector) => document.querySelector(selector);
const createElement = (element) => document.createElement(element);

// eslint-disable-next-line no-param-reassign
const setFirstTextValue = (item, text) => {
    item.firstElementChild.textContent = text;
};
// eslint-disable-next-line no-param-reassign
const setLastTextValue = (item, text) => {
    item.lastElementChild.innerText = text;
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

        this.dataProcessing();
        this.createNewDivElement();
        this.renderData();
    }

    dataProcessing() {
        this.TableDataServise = new TableDataServise();
        this.globalDataCases = this.TableDataServise.cashGlobalData(this.fetchSetAPIData,
            this.GlobalDataState, this.NewConfermedState);
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
            item.appendChild(createElement('div')).classList.add('Table__List-head-text');
            item.appendChild(createElement('div')).classList.add('Table__List-data-text');
        });
    }

    static addDataToNewDivElement(arr, data) {
        arr.forEach((item) => {
            if (item.parentElement.classList.contains('table__sick')) {
                setFirstTextValue(item, 'Confirmed');
                setLastTextValue(item, `${data.Confirmed}`);
            }
            if (item.parentElement.classList.contains('table__death')) {
                setFirstTextValue(item, 'Deaths');
                setLastTextValue(item, `${data.Deaths}`);
            }
            if (item.parentElement.classList.contains('table__get-well')) {
                setFirstTextValue(item, 'Recovered');
                setLastTextValue(item, `${data.Recovered}`);
            }
        });
    }



    renderData() {
        this.confirmedList.appendChild(this.DivElementArr[0]);
        this.deathsList.appendChild(this.DivElementArr[1]);
        this.recoveredList.appendChild(this.DivElementArr[2]);
        TableComponent.addDataToNewDivElement(this.DivElementArr, this.globalDataCases);
    }
}

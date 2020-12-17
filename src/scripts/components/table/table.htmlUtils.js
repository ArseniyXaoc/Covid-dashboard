const querySelector = (selector) => document.querySelector(selector);
const createElement = (element) => document.createElement(element);
const classListContains = (item, text) => item.parentElement.classList.contains(text);
const setLastChildTextValue = (item, text) => {
    item.lastElementChild.append(document.createTextNode(text));
};

function toggleColorCheckedElement(chainged) {
    const toggleColortotal = querySelector('.total');
    const toggleColorlastDay = querySelector('.last-day');
    const toggleColorglobal = querySelector('.global');
    const toggleColorperOneHundred = querySelector('.per-one-hundred');
    if (chainged.closest('.checkbox1')) {
        toggleColortotal.classList.toggle('selected');
        toggleColorlastDay.classList.toggle('selected');
    } else {
        toggleColorglobal.classList.toggle('selected');
        toggleColorperOneHundred.classList.toggle('selected');
    }
}

function createNewDivElement() {
    const ConfirmedDiv = createElement('div');
    const DeathsDiv = createElement('div');
    const RecoveredDiv = createElement('div');
    const DivElementArr = [ConfirmedDiv, DeathsDiv, RecoveredDiv];
    return DivElementArr;
    // TableComponent.addFieldToDivElement(this.DivElementArr);
}

function addFieldToDivElement(arr) {
    arr.forEach((item) => {
        item.classList.add('table__element');
        item.appendChild(createElement('div')).classList.add('Table__List-data-text');
    });
}

function clearData(arr) {
    arr.forEach((item) => {
        item.lastElementChild.removeChild(item.lastElementChild.firstChild);
    });
}

export {
    querySelector,
    createElement,
    classListContains,
    setLastChildTextValue,
    toggleColorCheckedElement,
    createNewDivElement,
    addFieldToDivElement,
    clearData,
};

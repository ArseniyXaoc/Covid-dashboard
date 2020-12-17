// eslint-disable-next-line import/prefer-default-export
export class ElementsCreater {
    // eslint-disable-next-line class-methods-use-this
    createBlock(className, parent) {
        const block = document.createElement('div');
        block.className = className;
        parent.append(block);
        return block;
    }

    // eslint-disable-next-line class-methods-use-this
    crateTextElement(elementType, className, innerHTML, parent) {
        const element = document.createElement(elementType);
        element.className = className;
        element.innerHTML = innerHTML;
        parent.append(element);
        return element;
    }
}

export class list {
    constructor() {
        this.list = document.querySelector('.list');
    }

    getBlock() {
        let block = document.createElement('div');
        block.className = 'item';
        this.list.append(block);
        return block;
    }

    getList(data) {
        data.forEach(element => {
            let country = this.getBlock();
            country.innerHTML = `
                <span class="country_cases">${element}</span>
                <span class="country">${element}</span>
            `;
            return;
        });
        return;
    }

}

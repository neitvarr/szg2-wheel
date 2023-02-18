
class PresetAll extends Preset {
    constructor(isDefault, title = 'выбрать всё') {
        super(title, [], false, isDefault);
    }
}

class PresetNothing extends Preset {
    constructor(isDefault) {
        super('ничего', [], true, isDefault);
    }
}
class PresetGroup extends Preset {
    constructor(title) {
        super(
            title,
            [],
            true,
            false,
            true
        );
    }

    getDOMNode(dataSetKey, index) {
        if (!this._node) {
            const container = document.createElement('div');
            container.setAttribute('style', 'margin-top: 0.6em');
            container.appendChild(document.createTextNode(this._title));

            this._node = container;
        }

        return this._node;
    }

    renderOptions(dataObject, readOnly) {
        const title = document.createElement('div');
        title.appendChild(document.createTextNode(this._title));

        editOptions.append(title);
    }
}

class PresetItems extends Preset {
    /**
     * @param title
     * @param entries {header_title: {group_title: [{title: '', image: ''}...], ...}, ...}
     * @param isDefault
     */
    constructor(title, entries, isDefault) {
        super(
            title,
            entries,
            true,
            isDefault,
            true
        );

        this._optionsContainer = document.createElement('div');
    }

    getDOMNode(dataSetKey, index) {
        // if (!this._node) {
        const
            container = document.createElement('span'),
            label = document.createElement('label'),
            input = document.createElement('input')
        ;
        input.setAttribute('type', 'checkbox');
        input.setAttribute('name', dataSetKey);
        input.setAttribute('id', dataSetKey + index);
        input.addEventListener('click', this.handleClick.bind(this));

        label.setAttribute('for', dataSetKey + index);
        label.appendChild(document.createTextNode(this._title));

        container.append(input, label);

        this._node = container;
        // }

        return this._node;
    }

    handleClick(e) {
        let entryTitle;
        for(const i in this._entries) {
            entryTitle = this._entries[i].title || this._entries[i];
            if (editedDataSets[currentDataSet][entryTitle] !== undefined) {
                editedDataSets[currentDataSet][entryTitle] = e.target.checked; // this._isTurnOn;
            }
        }

        // console.log(this._optionsContainer.querySelectorAll(':checked'));
        // this.renderOptions(editedDataSets[currentDataSet], this._isReadOnly);

        return false;
    }

    renderOptions(dataObject, readOnly = true) {
        if (!this._optionsContainer.hasChildNodes()) {
            let options = '<div>'+ this._title + '</div>',
                i = 0
            ;
            for (const title in dataObject) {
                options += `<input id="i${i}" type="checkbox" onchange="optionClick('${encodeURIComponent(title)}', this.checked)" 
                ${dataObject[title] ? 'checked' : ''} ${readOnly ? 'disabled' : ''} /><label for="i${i}">${title}</label><br />`;
                i++;
            }

            this._optionsContainer.innerHTML = options;
        }

        if (this._optionsContainer.parentElement !== editOptions) {
            editOptions.append(this._optionsContainer);
        }
    }
}
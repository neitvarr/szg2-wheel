
let currentDataSet = 'inventory',
    editedDataSets = {},
    itemsEditedDataSet = null
;
const
    isDebug = new URLSearchParams(document.location.search).get('debug'),
    editDialog = document.getElementById('dialog-edit'),
    editButton = document.getElementById('btn-edit'),
    itemDescription = document.getElementById('description'),
    editConfirmButton = editDialog.getElementsByClassName('apply')[0],
    editOptions = editDialog.getElementsByClassName('options')[0],
    editPresets = editDialog.getElementsByClassName('presets')[0],
    editHeader = editDialog.getElementsByClassName('header')[0],
    presetManager = new PresetManager,
    itemsPresets = [
        new PresetGroup('Red'),
        new PresetItems("Slasher", subSets.games["Red"]["Slasher"]),
        new PresetItems("Тело", subSets.games["Red"]["Тело"]),
        new PresetItems("Оружие", subSets.games["Red"]["Оружие"]),
        new PresetItems("Ноги", subSets.games["Red"]["Ноги"]),
        new PresetItems("Аксессуар", subSets.games["Red"]["Аксессуар"]),
        new PresetGroup('Уровень 2'),
        new PresetItems("Голова", subSets.games["Уровень 2"]["Голова"]),
        new PresetItems("Тело", subSets.games["Уровень 2"]["Тело"]),
        new PresetItems("Оружие", subSets.games["Уровень 2"]["Оружие"]),
        new PresetItems("Ноги", subSets.games["Уровень 2"]["Ноги"]),
        new PresetItems("Аксессуар", subSets.games["Уровень 2"]["Аксессуар"]),
    ],
    optionClick = function (option, checked) {
        option = decodeURIComponent(option);
        editedDataSets[currentDataSet][option] = checked;
    },
    resetEditedDataSet = function (toState = true) {
        editedDataSets[currentDataSet] = Object.fromEntries(
            dataSets[currentDataSet]
                .map(v => v)
                .sort((a, b) => (a.title || a).localeCompare(b.title || b))
                .map(v => [v.title || v, toState])
        );
    },
    editedDataToArray = function () {
        let result = [];

        for (let [key, value] of Object.entries(editedDataSets[currentDataSet])) {
            if (value) {
                for (let i = 0; i < dataSets[currentDataSet].length; i++) {
                    if ((dataSets[currentDataSet][i].title || dataSets[currentDataSet][i]) === key) {
                        result.push(dataSets[currentDataSet][i])
                    }
                }
            }
        }

        return result;
    },
    radioClickHandler = function () {
        currentDataSet = this.value;

        if (currentDataSet === 'custom') {
            p5Wheel.mouseDragEnable(false);
            customDialog.style.display = 'block';
            editButton.className = 'hide';

            return;
        }
        else if (currentDataSet === 'games') {
            if (this.getAttribute('data-show-edit-dialog')) {
                editDialog.style.display = 'block';
                p5Wheel.mouseDragEnable(false);
            }

            // if (itemsEditedDataSet) {
            //     editedDataSets[currentDataSet] = itemsEditedDataSet;
            // }
            // else {
                resetEditedDataSet(false);
            // }

            editHeader.textContent = this.nextElementSibling.innerText;
            editPresets.innerHTML = '';
            editOptions.innerHTML = '';
            itemsPresets.forEach((preset, i) => {
                editPresets.append(preset.getDOMNode(currentDataSet, i));
                // preset.renderOptions(editedDataSets[currentDataSet], false);
            });

            // this.parentElement.append(editButton);
            // editButton.className = '';

            return;
        }

        customDialog.style.display = 'none';
        p5Wheel.mouseDragEnable();

        if (presetManager.hasPreset(currentDataSet)) {
            if (!editedDataSets[currentDataSet]) {
                editPresets.innerHTML = '';
                editPresets.append(...presetManager.getNodes(currentDataSet));
            }

            p5Wheel.setData(editedDataToArray());

            editHeader.textContent = this.nextElementSibling.innerText;

            if (this.getAttribute('data-show-edit-dialog')) {
                editButton.dispatchEvent(new Event('click'));
            }
            else {
                this.parentElement.append(editButton);
                editButton.className = '';
            }
        }
        else {
            p5Wheel.setData(dataSets[currentDataSet]);
            editButton.className = 'hide';
        }
    },
    showDescription = data => {
        const description = data.description ? `<div class="body">${data.description}</div>` : '',
            charges = data.charge ? `<div class="charges"><span>Заряды: </span>${data.charge}</div>` : '',
            limit = data.limit ? `<div class="limit"><span>Лимит: </span>${data.limit}</div>` : '',
            type = data.type ? `<div class="type"><span>Тип: </span>${data.type}</div>` : ''
        ;

        itemDescription.innerHTML = `${type}&nbsp;${charges}&nbsp;${limit}${description}`;
    }
;

editButton.addEventListener('click', function () {
    if (currentDataSet === 'custom') {
        p5Wheel.mouseDragEnable(false);
        customDialog.style.display = 'block';

        return;
    }

    editDialog.style.display = 'block';
    p5Wheel.mouseDragEnable(false);

    editPresets.innerHTML = '';
    editPresets.append(...presetManager.getNodes(currentDataSet));
    presetManager.renderOptions(editedDataSets[currentDataSet], currentDataSet);
});
editConfirmButton.addEventListener('click', function () {
    editDialog.style.display = 'none';
    p5Wheel.mouseDragEnable();

    p5Wheel.setData(editedDataToArray());
});

const p5Wheel = new p5(WheelSketch);


p5Wheel.onAfterSetup = function () {
    p5Wheel.setVideo(new Video(videosProtected.concat(videosFree), './'));
};

const image = document.querySelector('#item-image img');
let currentUrl = window.location.href;
currentUrl = currentUrl.substring(0, currentUrl.lastIndexOf("/"));

const p5ImagePlayer = new p5(GifPlayer);

p5Wheel.onStartWheel = (durationSec) => {
    itemDescription.style.visibility = 'hidden';
    if (currentDataSet === 'custom') {
        p5ImagePlayer.onStartWheel(durationSec);
    }
};

let selectedText = '', lastSelectedText = '';
const
    lastWheelTextEl = document.getElementById('last-selected-text'),
    onStopLastTextHandler = () => {
        lastSelectedText = selectedText;
        lastWheelTextEl.innerHTML = `Выпало в прошлый раз: «${lastSelectedText}»`;
        // document.getElementById('copy-last-selected').setAttribute('style', 'visibility: visible')
    },
    lastWheelBtnEl = document.getElementById('copy-last-selected'),
    lastWheelLinkHandler = function(e) {
        e.stopPropagation();
        e.preventDefault();

        navigator.clipboard.writeText(lastSelectedText.replace(/["',:]/g, ''))
        /*.then(() => {
            // clipboard successfully set
        }, () => {
            // clipboard write failed
            console.error("Failed to set clipboard: ", selectedText)
        });*/
    }
;
lastWheelBtnEl.addEventListener('click', lastWheelLinkHandler);

p5Wheel.onStopWheel = () => {
    itemDescription.style.visibility = 'visible';
    onStopLastTextHandler();
};

let deltas = [];
setInterval(() => {
    if (currentDataSet === 'custom') {
        p5ImagePlayer.setIsAnimated(true);

        let max = deltas.reduce(function(a, b) {
            return Math.max(a, b);
        }, 0);
        deltas = [];

        p5ImagePlayer.moveAnimation(max);
    }
    else {
        p5ImagePlayer.setIsAnimated(false);
    }
}, 300);

p5Wheel.onMoveWheel = (delta) => {
    if (currentDataSet === 'custom') {
        deltas.push(Math.abs(delta));
    }
};

p5Wheel.onSelectItem = function(data, selectedKey) {
    if (data[selectedKey]) {
        selectedText = data[selectedKey].title || data[selectedKey];
        showDescription(data[selectedKey]);
    }

    let url = currentUrl + '/images/000.png';
    if (data[selectedKey] && typeof data[selectedKey].image === 'string') {
        url = currentUrl +'/images'+ data[selectedKey].image;
    }

    if (image.src !== url) {
        image.src = url;
    }
};

const customDialog = document.getElementById('custom-list'),
    customTextarea = customDialog.getElementsByTagName('textarea')[0],
    customButton = customDialog.getElementsByTagName('button')[0],
    saveCustomData = function (stringData) {
        const url = new URL(window.location);

        document.title = 'Колесо SZG 2 (' + stringData.substring(0, 30) + '…)';

        url.search = new URLSearchParams({custom: stringData});
        // console.log(url.toString());
        history.pushState({}, '', url.toString());
    },
    loadCustomData = function () {
        const urlSearchParams = new URL(window.location).searchParams,
            list = urlSearchParams.get('custom')
        ;

        return list;
    },
    applyCustomData = function (customData) {
        const customRadio = document.querySelector('[name="list"][value="custom"]');
        customTextarea.value = customData;

        customRadio.dispatchEvent(new Event('click'));
        customButton.dispatchEvent(new Event('click'));
        customRadio.setAttribute('checked', true);
    },
    windowPopStateHandler = function (event) {
        applyCustomData(loadCustomData());
    },
    customSubmitHandler = function () {
        customDialog.style.display = 'none';

        p5Wheel.setData(customTextarea.value.split('\n'));
        p5Wheel.mouseDragEnable();

        saveCustomData(customTextarea.value);
    }
;

customButton.addEventListener('click', customSubmitHandler);

let radios = document.querySelectorAll('[name="list"]');
for(let i = 0; i < radios.length; i++) {
    radios[i].addEventListener('click', radioClickHandler);

    // Выбираем начальный вариант при загрузке страницы
    if (radios[i].hasAttribute('checked')) {
        radios[i].dispatchEvent(new Event('click'));
    }
}

const customData = loadCustomData();
if (customData) {
    applyCustomData(customData);
}

window.onpopstate = windowPopStateHandler;
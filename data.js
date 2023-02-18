async function loadJsonData(url) {
    const response = await fetch(url);

    if (!response.ok) {
        throw new Error('Network response was not ok. Status code: ' + response.status);
    }

    return await response.json();
}

function toDataSet(json) {
    let result = [];

    for (let i = 0; i < json.length; i++) {
        const quantity = json[i].quantity || 1;
        for (let j = 0; j < quantity; j++) {
            result.push(json[i])
        }
    }

    return result
}

const subSets = {
    games: {
        ['Red']: {
            ['Slasher']: [
                {
                    title: 'Bayonetta',
                    image: '/hat/1.png'
                },
                {
                    title: 'DMC',
                    image: '/hat/2.png'
                },
                {
                    title: 'MGR',
                    image: '/hat/3.png'
                },
            ],
            ['Тело']: [
                {title: 'Толстовка "Твич-сити"', image: '/body/31.png'},
                {title: 'Майка в сеточку', image: '/body/32.png'},
                {title: 'Поношенный плащ', image: '/body/33.png'},
                {title: 'Малиновый пиджак', image: '/body/34.png'},
                {title: 'Куртка с твердым воротником', image: '/body/35.png'},
                {title: 'Экзоскелет с моторчиком', image: '/body/36.png'},
                {title: 'Красная потертая куртка с синими вставками', image: '/body/37.png'},
                {title: 'Странный халат инженера', image: '/body/38.png'},
                {title: 'Бомбер "I hate Twitch City"', image: '/body/39.png'},
                {title: 'Костюм-двойка', image: '/body/40.png'},
            ],
            ['Оружие']: [
                {title: 'Руки-ножницы', image: '/gun/61.png'},
                {title: 'Джедайский бутафорский меч', image: '/gun/62.png'},
                {title: 'Скейтборд с антигравитацией', image: '/gun/63.png'},
                {title: 'Плазменный Томми-Ган', image: '/gun/64.png'},
                {title: 'Protecta с распятием', image: '/gun/65.png'},
                {title: 'СВД', image: '/gun/66.png'},
                {title: 'Beretta M9', image: '/gun/67.png'},
                {title: 'Пустынный орёл', image: '/gun/68.png'},
                {title: 'Нож Керамбит', image: '/gun/69.png'},
                {title: 'Короткая катана "Сабимара"', image: '/gun/70.png'},
            ],
            ['Ноги']: [
                {title: 'Кожаные штаны "YummyBoy"', image: '/leg/91.png'},
                {title: 'Носки и Кибер-сандали "WhiteWolf"', image: '/leg/92.png'},
                {title: 'Кроссовки с автошнуровкой', image: '/leg/93.png'},
                {title: 'Семейники с сердечками', image: '/leg/100.png'},
                {title: 'Ботинки "Hermes"', image: '/leg/94.png'},
                {title: 'Шорты тысячи карманов', image: '/leg/95.png'},
                {title: 'Классические брюки', image: '/leg/96.png'},
                {title: 'Штаны для гольфа', image: '/leg/97.png'},
                {title: 'Ботинки на два размера меньше', image: '/leg/98.png'},
                {title: 'Джинсы с кобурой', image: '/leg/99.png'},
            ],
            ['Аксессуар']: [
                {title: 'Портативная Атомная Станция - 1 (ПАС-1)', image: '/accessory/121.png'},
                {title: 'Ключ-карта от качалки (КОК)', image: '/accessory/122.png'},
                {title: 'Хакерский калькулятор', image: '/accessory/123.png'},
                {title: 'Старенький телефон Siaomi', image: '/accessory/124.png'},
                {title: 'Фитнес-браслет Siaomi', image: '/accessory/125.png'},
                {title: 'Генератор Имён', image: '/accessory/126.png'},
                {title: 'Ошейник для утех', image: '/accessory/127.png'},
                {title: 'Внешний ремешковый карман', image: '/accessory/128.png'},
                {title: 'Значок Комедианта', image: '/accessory/129.png'},
                {title: 'Серьга с записывающим устройством', image: '/accessory/130.png'},
                {title: 'Колода игральных карт по порядку', image: '/accessory/131.png'},
                {title: 'Поддельный преобразователь отпечатков пальцев', image: '/accessory/132.png'},
                {title: 'Кроличья лапка', image: '/accessory/133.png'},
                {title: 'Плотный тканевый карман', image: '/accessory/134.png'},
                {title: 'Станция голографической реальности', image: '/accessory/135.png'},
                {title: 'ИИ "Гладия"', image: '/accessory/136.png'},
                {title: 'Сигареты Red Apple', image: '/accessory/137.png'},
                {title: 'Упаковка таблеток "Глицин"', image: '/accessory/138.png'},
                {title: 'Защитная система СкайКом', image: '/accessory/139.png'},
                {title: 'Карманный компьютер', image: '/accessory/140.png'},
            ],
        },
        ['Уровень 2']: {
            ['Голова']: [
                {title: '"Череп" робота-сутенёра', image: '/hat/11.png'},
                {title: 'Очки лёгкости "EZ-01"', image: '/hat/12.png'},
                {title: 'Маска Анимешника', image: '/hat/13.png'},
                {title: 'Боевой респиратор', image: '/hat/14.png'},
                {title: 'Лыжная маска внутренней циркуляции', image: '/hat/15.png'},
                {title: 'Красные линзы', image: '/hat/16.png'},
                {title: 'Светящийся Oni-респиратор', image: '/hat/17.png'},
                {title: 'Комплект монокля и накладных усов', image: '/hat/18.png'},
                {title: 'Поддельный нимб', image: '/hat/19.png'},
                {title: 'Мотоциклетный шлем', image: '/hat/20.png'},
            ],
            ['Тело']: [
                {title: 'Противокислотный костюм', image: '/body/41.png'},
                {title: 'Белый плащ со вставками', image: '/body/42.png'},
                {title: 'Нагрудник портативной зарядки', image: '/body/43.png'},
                {title: 'Бомбер с узором', image: '/body/44.png'},
                {title: 'Магнитный нагрудник', image: '/body/45.png'},
                {title: 'Кимоно киберсамурая', image: '/body/46.png'},
                {title: 'Желтый комбез', image: '/body/47.png'},
                {title: 'Бронежилет', image: '/body/48.png'},
                {title: 'Облегающая безрукавка', image: '/body/49.png'},
                {title: 'Спортивная ветровка свободного кроя', image: '/body/50.png'},
            ],
            ['Оружие']: [
                {title: 'Лазерная указка "L-1.05"', image: '/gun/71.png'},
                {title: 'Бита с гвоздями', image: '/gun/72.png'},
                {title: 'Игрушечный меч анимешника', image: '/gun/73.png'},
                {title: 'Позолоченный мульти-кастет', image: '/gun/74.png'},
                {title: 'Катана Кибер Самурая', image: '/gun/75.png'},
                {title: 'Однозарядный плазменный револьвер', image: '/gun/76.png'},
                {title: 'Сломанный рекламный щит 17-ого района', image: '/gun/77.png'},
                {title: 'Охотничий карабин', image: '/gun/78.png'},
                {title: 'LED-0 shield (Ледощит)', image: '/gun/79.png'},
                {title: 'Нож со спусковым механизмом', image: '/gun/80.png'},
            ],
            ['Ноги']: [
                {title: 'Штаны за 40 у.е.', image: '/leg/101.png'},
                {title: 'Антигравитационные махровые тапочки', image: '/leg/102.png'},
                {title: 'Светодиодные кроссовки Аджей', image: '/leg/103.png'},
                {title: 'Туфли без шнурков', image: '/leg/104.png'},
                {title: 'Штаны изменяемого цвета', image: '/leg/105.png'},
                {title: 'Переобувочная обувь', image: '/leg/106.png'},
                {title: 'Тактические военные штаны', image: '/leg/107.png'},
                {title: 'Носки салатового цвета', image: '/leg/108.png'},
                {title: 'Традиционные Гэта', image: '/leg/109.png'},
                {title: 'Старые брюки с подтяжками', image: '/leg/110.png'},
            ],
            ['Аксессуар']: [
                {title: 'Печатная манга "Один мир"', image: '/accessory/141.png'},
                {title: 'Кольцо с шокером', image: '/accessory/142.png'},
                {title: 'Серебряная кнопка MeTube', image: '/accessory/143.png'},
                {title: 'Пакет бессмертного кефира', image: '/accessory/144.png'},
                {title: 'Импортная бестабачная сигара', image: '/accessory/145.png'},
                {title: 'Самовосстанавливающаяся батарейка', image: '/accessory/146.png'},
                {title: 'Портативная мед. Станция', image: '/accessory/147.png'},
                {title: 'Модифицированное платежное кольцо', image: '/accessory/148.png'},
                {title: 'Нашейный помощник Индекс-1', image: '/accessory/149.png'},
                {title: 'Глитч-преображатель', image: '/accessory/150.png'},
                {title: 'Карманный Chat reader', image: '/accessory/151.png'},
                {title: 'Бездонный отсек для рюкзака фирмы "Вассер"', image: '/accessory/152.png'},
                {title: 'Брелок на оружие', image: '/accessory/153.png'},
                {title: 'Обруч дополненной реальности', image: '/accessory/154.png'},
                {title: 'Карманные кнопки выбора', image: '/accessory/155.png'},
                {title: 'Металлические перчатки', image: '/accessory/156.png'},
                {title: 'Белые перчатки поджигателя', image: '/accessory/157.png'},
                {title: 'Затяжной разгрузочный пояс', image: '/accessory/158.png'},
                {title: 'Беспроводные наушники', image: '/accessory/159.png'},
                {title: 'Термокружка-станция для кофе', image: '/accessory/160.png'},
            ],
        },
    },
};

const dataSets = {
    games: [].concat(
        subSets.games["Red"]["Slasher"],
        subSets.games["Red"]["Тело"],
        subSets.games["Red"]["Оружие"],
        subSets.games["Red"]["Ноги"],
        subSets.games["Red"]["Аксессуар"],
        subSets.games["Уровень 2"]["Голова"],
        subSets.games["Уровень 2"]["Тело"],
        subSets.games["Уровень 2"]["Оружие"],
        subSets.games["Уровень 2"]["Ноги"],
        subSets.games["Уровень 2"]["Аксессуар"],
    ),/*
    items: [
        'foo',
        'bar',
    ],*/
    coin: [
        {title: 'Орёл', image: '/coins/russia-100-rubles-1993-ob.png'},
        {title: 'Решка', image: '/coins/russia-100-rubles-1993-rev.png'},
        {title: 'Орёл', image: '/coins/russia-100-rubles-1993-ob.png'},
        {title: 'Решка', image: '/coins/russia-100-rubles-1993-rev.png'},
        {title: 'Орёл', image: '/coins/russia-100-rubles-1993-ob.png'},
        {title: 'Решка', image: '/coins/russia-100-rubles-1993-rev.png'},
        {title: 'Орёл', image: '/coins/russia-100-rubles-1993-ob.png'},
        {title: 'Решка', image: '/coins/russia-100-rubles-1993-rev.png'},
        {title: 'Орёл', image: '/coins/russia-100-rubles-1993-ob.png'},
        {title: 'Решка', image: '/coins/russia-100-rubles-1993-rev.png'},
        {title: 'Ребро', image: '/coins/coin-gurt.png'},
    ],
    streamers: [
        {title: 'Neitvarr', image: '/streamers/liz0n.png'},
        {title: 'BSC', image: '/streamers/NAMVSEYASNO.png'},
        {title: 'Phantasmagor', image: '/streamers/Praden.png'},
        {title: 'DeaZy', image: '/streamers/roadhouse.png'},
    ],
};

loadJsonData('wheel-items.json')
    .then(json => {
        dataSets.items = toDataSet(json);
    })
    .catch(error => {
        console.error(error);
    })
;


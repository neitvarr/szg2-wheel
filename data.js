
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

const dataSets = {
    items: [
        'foo',
        'bar',
    ],
    coin: [
        {title: 'Орёл',  image: '/coins/russia-100-rubles-1993-ob.png'},
        {title: 'Решка', image: '/coins/russia-100-rubles-1993-rev.png'},
        {title: 'Орёл',  image: '/coins/russia-100-rubles-1993-ob.png'},
        {title: 'Решка', image: '/coins/russia-100-rubles-1993-rev.png'},
        {title: 'Орёл',  image: '/coins/russia-100-rubles-1993-ob.png'},
        {title: 'Решка', image: '/coins/russia-100-rubles-1993-rev.png'},
        {title: 'Орёл',  image: '/coins/russia-100-rubles-1993-ob.png'},
        {title: 'Решка', image: '/coins/russia-100-rubles-1993-rev.png'},
        {title: 'Орёл',  image: '/coins/russia-100-rubles-1993-ob.png'},
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


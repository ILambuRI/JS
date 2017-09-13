var data = [
    /* -- t-shirt -- */
    {category : 't-shirt',
    size : '30',
    color : 'green',
    price : '100',
    name : 'Cool t-shirt'
    },

    {category : 't-shirt',
    size : '35',
    color : 'red',
    price : '150',
    name : 'Beach t-shirt'
    },

    {category : 't-shirt',
    size : '40',
    color : 'yellow',
    price : '200',
    name : 'Gangster t-shirt'
    },

    {category : 't-shirt',
    size : '45',
    color : 'orange',
    price : '250',
    name : 'Super t-shirt'
    },

    {category : 't-shirt',
    size : '50',
    color : 'green',
    price : '300',
    name : 'Mega t-shirt'
    },

    {category : 't-shirt',
    size : '55',
    color : 'red',
    price : '350',
    name : 'Puper t-shirt'
    },

    /* -- cap -- */
    {category : 'cap',
    size : '30',
    color : 'green',
    price : '250',
    name : 'Cool cap'
    },

    {category : 'cap',
    size : '35',
    color : 'red',
    price : '300',
    name : 'Beach cap'
    },

    {category : 'cap',
    size : '40',
    color : 'yellow',
    price : '400',
    name : 'Gangster cap'
    },

    {category : 'cap',
    size : '45',
    color : 'orange',
    price : '450',
    name : 'Super cap'
    },

    {category : 'cap',
    size : '50',
    color : 'red',
    price : '500',
    name : 'Mega cap'
    },

    {category : 'cap',
    size : '55',
    color : 'green',
    price : '600',
    name : 'Puper cap'
    },

    /* -- sweatshirt -- */
    {category : 'sweatshirt',
    size : '30',
    color : 'orange',
    price : '200',
    name : 'Cool sweatshirt'
    },

    {category : 'sweatshirt',
    size : '35',
    color : 'yellow',
    price : '250',
    name : 'Beach sweatshirt'
    },

    {category : 'sweatshirt',
    size : '40',
    color : 'green',
    price : '300',
    name : 'Gangster sweatshirt'
    },

    {category : 'sweatshirt',
    size : '45',
    color : 'red',
    price : '350',
    name : 'Super sweatshirt'
    },

    {category : 'sweatshirt',
    size : '50',
    color : 'yellow',
    price : '450',
    name : 'Mega sweatshirt'
    },

    {category : 'sweatshirt',
    size : '55',
    color : 'orange',
    price : '650',
    name : 'Puper sweatshirt'
    }
];

var arrResult = [];

var filterSettings = {category : '',
                      size : '',
                      color : ''
};

var sizes = ['Sizes', 30, 35, 40, 45, 50, 55];
var catigories = ['Categories', 'Cap', 'T-shirt', 'Sweatshirt'];
var colors = ['Colors', 'Green', 'Red', 'Yellow', 'Orange'];

var lowest = document.querySelector('#lowest');
var highest = document.querySelector('#highest');


function getByCategory(arr, category) {
    if (!category) return arr;
    return arr.filter(item => item.category == category);
}

function getBySize(arr, size) {
    if (!size) return arr;
    return arr.filter(item => item.size == size);
}

function getByColor(arr, color) {
    if (!color) return arr;
    return arr.filter(item => item.color == color);
}

function dataFilter(category, size, color) {
    let arrRes = getByColor( getBySize( getByCategory( data, category), size), color);
    return arrRes;
}

function setFilterSettings(id, value) {
    if (id == 'size') {
        if (value == 'Sizes') value = '';
        filterSettings.size = value;
    }

    if (id == 'color') {
        if (value == 'Colors') value = '';
        filterSettings.color = value.toLowerCase();
    }

    if (id == 'category') {
        if (value == 'Categories') value = '';
        filterSettings.category = value.toLowerCase();
    }
}


function createDropdownList (id, arr) {
    // "use strict";
    let div = document.querySelector('#' + id);

    arr.forEach(function(value) {
        let span = document.createElement('span');
        span.className = 'dropdown-item';
        span.innerHTML = value;

        span.addEventListener('click', function() {
            let button = document.querySelector('#btn_' + id);
            button.innerHTML = value;

            setFilterSettings(id, value);

            arrResult = dataFilter(filterSettings.category, filterSettings.size, filterSettings.color);
            createGoodsList(arrResult);
        });

        div.appendChild(span);
    });
}


lowest.addEventListener('click', function() {
    arrResult = dataFilter(filterSettings.category, filterSettings.size, filterSettings.color);

    arrResult.sort(function(a, b) {
        return a.price - b.price;
    });

    createGoodsList(arrResult);
});

highest.addEventListener('click', function() {
    arrResult = dataFilter(filterSettings.category, filterSettings.size, filterSettings.color);

    arrResult.sort(function(a, b) {
        return b.price - a.price;
    });

    createGoodsList(arrResult);
});

function createGoodsList(arr) {
    let goodsDiv = document.querySelector('#goods');
    goodsDiv.innerHTML = '';
    
    arr.forEach(function(value) {
        var spaceDiv = document.createElement('div');
        spaceDiv.setAttribute('class', 'col-md-1');

        let div = document.createElement('div');
        div.setAttribute('class', 'col-md-3 card');
        div.setAttribute('style', 'width: 20rem;');

        let img = document.createElement('img');
        img.setAttribute('class', 'card-img-top');
        img.setAttribute('src', 'http://scene7.zumiez.com/is/image/zumiez/pdp_hero/Zine-2nd-Inning-Heather-Grey-%26-Marled-Red-Baseball-Shirt-_225749-front.jpg');
        img.setAttribute('alt', value.category + ' ' + value.name);

        let inDiv = document.createElement('div');
        inDiv.setAttribute('class', 'card-body');
        
        let p = document.createElement('p');
        p.setAttribute('class', 'card-text');
        p.innerHTML = value.name + ' - <strong>' + value.price + ' EUR</strong>';

        inDiv.appendChild(p);
        div.appendChild(img);
        div.appendChild(inDiv);

        goodsDiv.appendChild(spaceDiv);
        goodsDiv.appendChild(div);
    });
}

createDropdownList ('size', sizes);
createDropdownList ('color', colors);
createDropdownList ('category', catigories);

arrResult = dataFilter(filterSettings.category, filterSettings.size, filterSettings.color);

createGoodsList(arrResult);

/* Filter settings */
var filterSettings = {category : '',
                      size : '',
                      color : '',
                      sort : ''
};

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

/* Array filtering by settings */
function dataFilter(category, size, color, sort, dbArr) {
    let arrRes = getByColor( getBySize( getByCategory( dbArr, category), size), color);

    if (sort == 'low')
        return arrRes.sort(function(a, b) { return a.price - b.price; });

    if (sort == 'high')
        return arrRes.sort(function(a, b) { return b.price - a.price; });

    if ( !sort )
        return arrRes.sort(function(a, b) { return a.id - b.id; });

    return arrRes;
}

/* Set or reset setting when the button is pressed */
function setBtnFilterSettings(id, value, element) {
    switch (id) {
        case 'size':
            if (value == 'Sizes') {
                value = '';
                element.innerHTML = 'Sizes';            
            }
            else {
                element.innerHTML = value;
            }

            filterSettings.size = value;
        break;

        case 'color':
            if (value == 'Colors') {
                value = '';
                element.innerHTML = 'Colors';            
            }
            else {
                element.innerHTML = value;
            }

            filterSettings.color = value.toLowerCase();
        break;

        case 'category':
            if (value == 'Categories') {
                value = '';
                element.innerHTML = 'Categories';            
            }
            else {
                element.innerHTML = value;
            }

            filterSettings.category = value.toLowerCase();
        break;

        case 'btn_sort':
            if (value == 'Sort') {
                value = '';
                element.innerHTML = 'Sort';            
            }

            filterSettings.sort = value;
        break;
    }
}

function createClearButton(putDiv) {
    let clearBtn = document.createElement('button');
    clearBtn.setAttribute('type', 'button');
    clearBtn.setAttribute('class', 'btn btn-dark');
    clearBtn.setAttribute('id', 'filter_clear');

    let span = document.createElement('span');
    span.innerHTML = 'Clear Filter &times;';
    clearBtn.appendChild(span);

    clearBtn.addEventListener('click', function() {
        let categoryButton = document.querySelector('#btn_category');
        let sizeButton = document.querySelector('#btn_size');
        let colorButton = document.querySelector('#btn_color');
        let sortButton = document.querySelector('#btn_sort');
        
        setBtnFilterSettings('category', 'Categories', categoryButton);  
        setBtnFilterSettings('size', 'Sizes', sizeButton);
        setBtnFilterSettings('color', 'Colors', colorButton);
        setBtnFilterSettings('btn_sort', 'Sort', sortButton);
        
        clearBtn.remove();
        createGoodsList(data);
    });
    
    putDiv.appendChild(clearBtn);
}

function createDropdownList (id, arr, parentDiv) {
    let div = document.querySelector('#' + id);

    arr.forEach(function(value) {
        let span = document.createElement('span');
        span.className = 'dropdown-item';
        span.innerHTML = value;

        span.addEventListener('click', function() {
            let button = document.querySelector('#btn_' + id);

            setBtnFilterSettings(id, value, button);

            if ( filterSettings.category || 
                 filterSettings.size || 
                 filterSettings.color || 
                 filterSettings.sort ) {

                if ( !document.querySelector('#filter_clear') ) {
                    createClearButton(parentDiv);
                }
            }
            else {
                if (clearBtn = document.querySelector('#filter_clear'))
                    parentDiv.removeChild(clearBtn);
            }

            createGoodsList(data);
        });

        div.appendChild(span);
    });
}

function createGoodsList(dbArr) {
    let arr = dataFilter(filterSettings.category, filterSettings.size, filterSettings.color, filterSettings.sort, dbArr);
    
    let goodsDiv = document.querySelector('#goods');
    goodsDiv.innerHTML = '';
    
    arr.forEach(function(value) {
        let div = document.createElement('div');
        div.setAttribute('class', 'col-md-3 card');
        div.setAttribute('style', 'width: 20rem; margin-bottom: 30px; margin-left: 20px;');

        let img = document.createElement('img');
        img.setAttribute('class', 'card-img-top');
        img.setAttribute('src', value.imgLabel);
        img.setAttribute('alt', value.category + ' ' + value.name);

        let inDiv = document.createElement('div');
        inDiv.setAttribute('class', 'card-body');
        
        let p = document.createElement('p');
        p.setAttribute('class', 'card-text');
        p.innerHTML = value.name + ' - <strong>' + value.price + ' EUR</strong>';

        inDiv.appendChild(p);
        div.appendChild(img);
        div.appendChild(inDiv);

        goodsDiv.appendChild(div);
    });
}

var sizes = ['Sizes'];
var dbDistinctSizes = [30, 35, 40, 45, 50, 55];
Array.prototype.push.apply(sizes, dbDistinctSizes);

var catigories = ['Categories'];
var dbDistinctCatigories = ['Cap', 'T-shirt', 'Sweatshirt'];
Array.prototype.push.apply(catigories, dbDistinctCatigories);

var colors = ['Colors'];
var dbDistinctColors = ['Green', 'Red', 'Yellow', 'Orange'];
Array.prototype.push.apply(colors, dbDistinctColors);

var filterRowDiv = document.querySelector('#filter_row');
var sortBtn = document.querySelector('#btn_sort');
var lowest = document.querySelector('#lowest');
var highest = document.querySelector('#highest');

createDropdownList ('size', sizes, filterRowDiv);
createDropdownList ('color', colors, filterRowDiv);
createDropdownList ('category', catigories, filterRowDiv);

lowest.addEventListener('click', function() {
    sortBtn.innerHTML = lowest.innerHTML;

    if ( !document.querySelector('#filter_clear') ) {
        createClearButton(filterRowDiv);
    }

    setBtnFilterSettings('btn_sort', 'low');
    createGoodsList(data);
});

highest.addEventListener('click', function() {
    sortBtn.innerHTML = highest.innerHTML;
    
    if ( !document.querySelector('#filter_clear') ) {
        createClearButton(filterRowDiv);
    }

    setBtnFilterSettings('btn_sort', 'high');
    createGoodsList(data);
});

createGoodsList(data);
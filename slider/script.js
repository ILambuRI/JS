var width = 512;
var count = 1;
var position = 0;

var carousel = document.getElementById('carousel');
var list = carousel.querySelector('ul');
var listImg = list.querySelectorAll('img');
var reviewIcon = carousel.querySelector('.review-icon');
var prev  = document.getElementById('prev');
var next  = document.getElementById('next');
var maxPos = width * (listImg.length - 1);

function reviewConstructor(selected) {
    let re = /([\w+/:]+)[^.]/g;
    reviewIcon.innerHTML = '';
    for (var i = 0; i < listImg.length; i++) {
        let str = listImg[i].currentSrc;
        let newstr = str.match(re);
        let smallImg = newstr[0] + '_small.' + newstr[1];
        
        let div = document.createElement('div');

        (i == selected) ?
            div.className = i + ' selected' :
            div.className = i;
        
        div.style.cssText = 'background: url(' + smallImg + ') no-repeat center;';
        
        div.addEventListener('click', function() {
            position = div.className * -width;
            list.style.marginLeft = position + 'px';
            reviewConstructor(div.className);
            arrowHide();
        });
        reviewIcon.appendChild(div);
    }
}

function arrowHide() {
    (position == 0) ?
        prev.className = 'hide' :
        prev.className = '';
    
    (position == -maxPos) ?
        next.className = 'hide' :
        next.className = '';
}


prev.onclick = function() {
    position = Math.min(position + width * count, 0);
    list.style.marginLeft = position + 'px';
    let reviewClass = (position / width) * -1;
    reviewConstructor(reviewClass);
    arrowHide();
}

next.onclick = function() {
    position = Math.max(position - width * count, -maxPos);
    list.style.marginLeft = position + 'px';
    let reviewClass = (position / width) * -1;
    reviewConstructor(reviewClass);
    arrowHide();
}

reviewConstructor(0);
arrowHide();
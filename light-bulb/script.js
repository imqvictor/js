let bulb = document.querySelector('.bulbs>img');
let onbtn = document.querySelector('.btn>button:nth-child(2)');
let offbtn = document.querySelector('.btn>button:nth-child(1)');


onbtn.addEventListener('click', bulbon);
offbtn.addEventListener('click', bulboff);


function bulbon() {
    bulb.src = 'images/bulb-on.jpg';
}

function bulboff() {
    bulb.src = 'images/bulb-off.jpg';
}

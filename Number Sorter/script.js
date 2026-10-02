const indexZero = document.getElementById('indexZero');
const indexOne = document.getElementById('indexOne');
const indexTwo = document.getElementById('indexTwo');
const indexThree = document.getElementById('indexThree');
const indexFour = document.getElementById('indexFour');
const sortContainer = document.querySelector('.sortContainer');
const sortBtn = document.getElementById('sortBtn');

let zero = 0;
let one = 0;
let two = 0;
let three = 0;
let four = 0;


indexZero.addEventListener('change', () => {
    zero = indexZero.value;
    sort();
})

indexOne.addEventListener('change', () => {
    one = indexOne.value;
    sort();
})

indexTwo.addEventListener('change', () => {
    two = indexTwo.value;
    sort();
})

indexThree.addEventListener('change', () => {
    three = indexThree.value;
    sort();
})

indexFour.addEventListener('change', () => {
    four = indexFour.value;
    sort();
})


function sort() {

    const indexArr = [];
    indexArr.push(zero);
    indexArr.push(one);
    indexArr.push(two);
    indexArr.push(three);
    indexArr.push(four);

    console.log(indexArr);

    sortContainer.innerHTML = `${indexArr}`;

    console.log(indexArr);
    console.log(indexArr.length);

    sortBtn.addEventListener('click', () => {
        const sorted = indexArr.sort();
        sortContainer.textContent = sorted;
    })

}
sort();
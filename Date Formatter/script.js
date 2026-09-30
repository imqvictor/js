const prevDate = document.getElementById('prevDate');
const date = document.getElementById('date');


const tDate = new Date();
console.log(tDate);
const day = tDate.getDate();
console.log(day);
const month = tDate.getMonth() + 1;
console.log(month);
const year = tDate.getFullYear();
console.log(year);
const hour = tDate.getHours();
console.log(hour);
const min = tDate.getMinutes();
console.log(min);

const formatDate = date.textContent = `${day}-${month}-${year}`;



prevDate.addEventListener('change', () => {

    switch (prevDate.value) {
        case 'dd-mm-yyyy':
            date.textContent = `${day}-${month}-${year}`;
            break;

        //split converts the string into an array and reverse reverses the array and join converts the array back to a string
        case 'yyyy-mm-dd':
            date.textContent = `${formatDate.split('-').reverse().join('-')}`;
            break;

        case 'mm-dd-yyyy-HH-MM':
            date.textContent = `${month}-${day}-${year} ${hour}Hour ${min}Miinutes`;
            break;

        default:
            break;
    }

});
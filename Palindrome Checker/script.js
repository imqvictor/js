const textInput = document.getElementById('textInput');
const checkBtn = document.getElementById('check');
const result = document.getElementById('result');


function checkPalindrome() {
    result.textContent = "";

    const textInputValue = textInput.value.trim();
    if (textInputValue === "") {
        alert('please enter a value');
    }


    //first make any single letter a palindrome
    if (textInputValue.length === 1) {
        result.textContent = `${textInputValue.toUpperCase()} is a Palindrome`;
    }

    console.log(textInputValue.split('').reverse().join(''));

    //check if the value is reversed, it's still the same
    if (textInputValue === textInputValue.split('').reverse().join('')) {
        result.textContent = `${textInputValue.toUpperCase()} is a Palindrome`;
    } else {
        result.textContent = `${textInputValue.toUpperCase()} is not a Palindrome`;
    }


}

checkBtn.addEventListener('click', checkPalindrome);
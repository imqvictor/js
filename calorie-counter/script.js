//promise 
let myPromise = new Promise((resolve, reject) => {
    //producing code is a code that waits for sometimes
    let x = 0;
    if (x == "0") {
        resolve("that is regular");
    } else {
        reject("that is strict");
    }

});

//consuming code waits for the producing code
//a promise has two sates: undefined, fullfilled and reject,
//if the status is still working, undefined it is
//the consuming code has two arguments which are callback functions
myPromise.then(
    function (value) {
        console.log(value);
    },
    function (error) {
        console.log(error);
    }
)

//asynch keyword makes a function return a promise
// await keyword makes a function waits for a promise

async function fun() {
    let ourPromise = new Promise((resolve, reject) => {
        resolve("hello");
    });

    console.log(await ourPromise);
}
fun();
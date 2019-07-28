//fetch is browser base API. Not accessible in node js. Running in client side javascript so use fetch API.
//async call

// fetch('http://localhost:3000/weather?address=Boston').then((response) => {
//     response.json().then((data) => {
//         if(data.error) {
//             console.log(data.error);
//         } else {
//             console.log(data.location);
//             console.log(data.forecast);
//         }
//     }) //.catch((error) => {
//       //  console.log(error);
//     //})
// }) //.catch((error) => {
//    // console.log(error);
// //})

const weatherForm = document.querySelector('form')
const searchElement = document.querySelector('input')
// .className
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

// messageOne.textContent = 'From JavaScript';
//add an event listener onto our element.
weatherForm.addEventListener('submit', (event) => {
    //prevent the browser from refreshing
    event.preventDefault();

    const location = searchElement.value;

    messageOne.textContent = 'Loading...';
    messageTwo.textContent = '';

    fetch('/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if(data.error) {
                messageOne.textContent = data.error;
            } else {
                messageOne.textContent = data.location;
                messageTwo.textContent = data.forecast;
            }
        })
    })
})
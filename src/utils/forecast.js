const request = require('request');

//2 arguments
//options outline what we want to do
//function to run once we have the response
// request({ url: url, json: true }, (error, response) => {
//     //console.log(response);
//     //const data = JSON.parse(response.body);
//     //console.log(response.body.currently);
//     if(error) {
//         console.log('Unable to connect to weather service');
//     } else if (response.body.error) {
//         console.log('Unable to find location')
//     } else {    
//     console.log(response.body.daily.data[0].summary + " " + "It is currently " + response.body.currently.temperature + " degrees out. There is a " + response.body.currently.precipProbability + "% chance of rain");
//     }
    
// })

forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/e0609d3b275a7ce3df78a8eae57eb346/'+ latitude + ',' + longitude;
    console.log(url);
    request({url, json:true}, (error, {body}) => {
        if(error) {
            callback('Not able to connect to forecase server', undefined);
        } else if (body.error) {
            callback('Not able to find forecast for location provided', undefined);
        } else {
            callback(undefined, body.daily.data[0].summary + " " + "It is currently " + body.currently.temperature + " degrees out." + " The temperature high is " + body.daily.data[0].temperatureMax + " and the temperature low is " + body.daily.data[0].temperatureMin + ". There is a " + body.currently.precipProbability + "% chance of rain"
            ,"The temperature high is " + body.daily.data[0].temperatureMax + " and the temperature low is " + body.daily.data[0].temperatureMin)
        }
    })
}

module.exports = forecast;
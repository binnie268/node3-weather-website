const request = require('request');

//Geocoding service - take a location and convert it to long/lat pair
// const geoCodeUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?access_token=pk.eyJ1IjoiYWxpY2VjODY2IiwiYSI6ImNqeWJ3OGtxaTAyeWszbW8xeHNsaGxnaHYifQ.4WVY0C3pAj98rztjli7OUg&limit=1';
// request({ url: geoCodeUrl, json: true}, (error, response) => {

//     if(error) {
//         console.log("Unable to connect to location services");
//     } else if (response.body.features.length == 0) {
//         console.log("No matching location found.")
//     } else {
//         const latitude = response.body.features[0].center[1];
//         const longitude = response.body.features[0].center[0];
//         console.log(latitude, longitude);
//     }

// })

//why to user encode => so app doesn't crash when sending down special characters
const geoCode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) +'.json?access_token=pk.eyJ1IjoiYWxpY2VjODY2IiwiYSI6ImNqeWJ3OGtxaTAyeWszbW8xeHNsaGxnaHYifQ.4WVY0C3pAj98rztjli7OUg&limit=1';

    request({url, json: true}, (error, { body }) => {
    
        
        if(error) {
            callback('Unable to connect to location services', undefined);
        } else if (body.features.length == 0) {
            callback('No matching location found. Try another search.', undefined);
        } else {
            const latitude = body.features[0].center[1];
            const longitude = body.features[0].center[0];
            const location = body.features[0].place_name ; 
            callback(undefined, {
                // latitude: response.body.features[0].center[1],
                // longitude: response.body.features[0].center[0],
                // location: response.body.features[0].place_name
                 latitude,
                 longitude,
                 location        
            })
        }
    })
}

module.exports = geoCode;
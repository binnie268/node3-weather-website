//create file in src folder starting point in node application
const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geoCode = require('./utils/geocode')
const forecast = require('./utils/forecast')

//console.log(__dirname);
//console.log(__filename);
//console.log(path.join(__dirname, '../public'))
//configure server using various methods
const app = express();
const port = process.env.PORT || 3000
// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
console.log(publicDirectoryPath);
const viewsPath = path.join(__dirname, '../templates/views');
console.log(viewsPath);
const partialsPath = path.join(__dirname, '../templates/partials')


console.log(partialsPath);

// setup handle vars engine and views location
//set a value for a given express setting. key, setting name, value (library)s
app.set('view engine', 'hbs')
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

//express converts index hbs to html to make sure html gets back to requester
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'BC'
    });
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        'name': 'BC'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        'title': 'Help',
        'message': 'Hello Message',
        'name': 'BC'
    })
})
//way to customize the server, to serve up something like index
//configures our node application
//it will find a match, index.html and going to match the root url,
//bc file has special name, so the '' will not run, so commenting out.
//have static directory where we could put our assets that will make up the website
//add it to serve up the directory
//everything here was made available via webserver. including css,img,js,html.
//assets are static and do not change.
//need to render dynamic documents instead of static ones
//create code that can be resused, can use handlejs


// Setup static directory to serve
app.use(express.static(publicDirectoryPath))


//app.com
//app.com/help
//app.com/about
//run on single express server, with multiple routes.
//set up server to send a response when somoene goes to a specific route.
//route/partial url, and takes in a function. what to do when someone viists this wroute with a function
//incoming request to server
//response contains methods allowing us what we're going to send back to the cluster
//res.send sends something back to requester.

//app.get('', (req, res) => {
//    res.send('<h1>Weather</h1>')
//})

//set up route and callback function
// app.get('/help', (req, res) => {
//     res.send([{
//         name: 'Andrew',
//         age: 27
//     }, {
//         name: 'Sarah'
//     }])
// })


// app.get('/about', (req, res) => {
//     res.send('<h1>About page</h1>')
// })

app.get('/weather', (req, res) => {

    if(!req.query.address) {
        return res.send({
            error: 'You must provide a search term'
        })
    }

    geoCode(req.query.address, (error, {latitude, longitude, location}={}) => {
        if(error) {
            return res.send({
                error: error
            })
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if(error) {
                return res.send({
                    error: error
                })
            }
    
            res.send({
                forecast: forecastData,
                location: location,
                address: req.query.address
            })
        });
    });
})

app.get('/products', (req, res) => {

    if(!req.query.search) {
       return res.send({
            error: 'You must provide a search term'
        })
    }
    console.log(req.query);
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('pagenotfound', {
        'title': 'Help article not found',
        'errorMessage': 'Help article not found.',
        'name': 'BC'
    })
})

app.get('*', (req,res) => {
    res.render('pagenotfound', {
        'title': '404',
        "errorMessage": 'Page not found.',
        'name': 'BC'
    })
})

//start server up. Pass to listen method is a callback server when server is up and running.
app.listen(port, () => {
    console.log('Server is up on port ' + port)
});

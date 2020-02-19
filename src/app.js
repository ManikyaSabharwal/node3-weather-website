const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geoCode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

//Define path for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials') 

//Setup static directory to serve
app.use('', express.static(publicDirectoryPath))

/*
Rendering dynamic pages instead of static pages, using hbs npm(which internally uses handlebars npm)
*/
//Tell express which engine do we want to use and where to look for views folder
app.set('view engine', 'hbs')
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Manikya'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About the page',
        name: 'Manikya'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Manikya',
        helpMessage: 'This is a help message'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: 'Address is required'
        })
    }
    // console.log(req.query);
     geoCode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if(error) {
            return res.send({ error })
        }

        forecast({latitude, longitude}, (error, forecastData) => {
            if(error) {
                return res.send({ error })
            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address,
            })
        })
    })
})

app.get('/products', (req, res) => {
    if(!req.query.key) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    console.log(req.query)
    res.send({
        products: []
    })
    
})

app.get('/help/*', (req, res) => {
    res.render('error', { 
        title: 404,
        errorMessage: 'Help article not found!', 
        name: 'Manikya'
    })
})

app.get('*', (req, res) => {
    res.render('error', {
        title: 404,
        errorMessage: 'Page not found',
        name: 'Manikya'
    })
})

app.listen(port, ()=> {
    console.log('Server is up on port: ' + port);
})













//No longer served since index.html is served as default by default in express.static(index.html)
// app.get('', (req, res) => {
//     res.send(__dirname + '');
// })

// app.get('/help', (req, res) => {
//     res.send([{
//         name: 'Manikya',
//         age: 22
//     }, {
//         name: 'Sarah'
//     }])
// })

// app.get('/about', (req, res) => {
//     res.send('<h1>About page!</h1>')
// })
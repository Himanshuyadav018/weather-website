const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./geocode.js')
const forecast = require('./weather.js')

const app = express()
const port = process.env.PORT || 3000

const pathDirectory = path.join(__dirname, '../public')
const viewsDirectory = path.join(__dirname, '../templates/views')
const partialDirectory = path.join(__dirname, '../templates/partials')

app.set('view engine', 'hbs')
app.set('views', viewsDirectory)
hbs.registerPartials(partialDirectory)

app.use(express.static(pathDirectory))


app.get('',(req, res) => {
    res.render('index',{
        title: 'welcome to webpage',
        name: 'himanshu yadav'
    })
})

app.get('/help', (req, res) => {
    res.render('help',{
        name: 'himanshu yadav',
        help: 'contact: 787878787878'        
    })
})

app.get('/about', (req, res) => {
    res.render('about',{
        name:'himanshu yadav',
        about: "we are an outstanding organisation who upholds its value"
    })
})

app.get('/weather', (req, res) => {
    console.log(req.query.search)
    if(!req.query.search){
        return res.send({
            error: 'please provide an address'
        })
    }
    geocode(req.query.search, (error, {latitude, longitude, location} = {}) => {
        if(error){
            return res.send({ error })
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if(error){
                return res.send({ error })
            }
            res.send({ 
                weather: forecastData,
                address: location
            })
        })
    })
})

app.get('/help/*', (req,res) => {
    res.render('error',{
        error: 'the help page is not found',
        name: 'himanshu yadav'
    })
})

app.get('*', (req,res) => {
    res.render('error',{
        error: '404 page not found',
        name: 'himanshu yadav'
    })
})

app.listen(port, ()=> {
    console.log('listening to port ' + port)
})
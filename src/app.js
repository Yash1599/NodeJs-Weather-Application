const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

//Define Paths for Express Config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewFiles = path.join(__dirname,'../templates/views')
const partialPaths = path.join(__dirname,'../templates/partials')

//setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views',viewFiles)

hbs.registerPartials(partialPaths)

app.use(express.static(publicDirectoryPath))

app.get('',(req,res)=>{
    res.render('index',{
        title: 'Weather App',
        name: 'Yash Singhania'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title: 'About Me',
        name: 'Yash Singhania'
    })
})

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:'Please provide the address to search for:'
        })
    }
    geocode(req.query.address,(error,{ latitude ,longitude,location}={})=>{
        if(error){
            return res.send({error})
        }

        forecast(latitude,longitude, (error, forecastData)=>{
            if(error){
                return res.send({error})
            }

            res.send({
                forecast:forecastData,
                location,
                address:req.query.address
            })
        })
    })


})

app.get('/categories',(req , res)=>{
    if(!req.query.search){
         return res.send({
            error:'You must provide a search filter'
        })
    }
    console.log(req.query.search)
    res.send({
        products:[]
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title: 'Help',
        text: 'For any help services .',
        name: 'Yash Singhania'
    })
})

app.get('/help/*',(req , res)=>{
    res.render('404',{
        title:'404',
        errorMessage:'Requested Help Page does not exist',
        name:'Yash Singhania'
    })
})
//for handling all other invalid API requests
app.get('*',(req,res)=>{
    res.render('404',{
        title:'404',
        errorMessage:'Requested Page does not exist',
        name:'Yash Singhania'
    })
})

app.listen(3000,()=>{
    console.log('Server is up')
})
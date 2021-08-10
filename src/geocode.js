const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1IjoiaGltYW5zaHUwMTgiLCJhIjoiY2tyYzJ6Y3J5MWNjYzJ6cDh0emh0dzY1NiJ9.UDsfQnZWHwFHMeQlHMd0SQ'

    request({url: url, json: true}, (error,response) => {
        if(error) {
            callback('unable to connect to the internet',)
        }else if(!response.body.features){
            callback('try another search',)
        }else{
          const latitude = response.body.features[0].center[1]
            const longitude = response.body.features[0].center[0]
            const location = response.body.features[0].place_name
            callback(undefined,{latitude: latitude, longitude: longitude, location: location})
        }
    })
}

module.exports = geocode;
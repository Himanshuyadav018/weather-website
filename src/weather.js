const request =  require('request')

const forecast = (latitude, longitude, callback) => {
    const weatherUrl = `http://api.weatherstack.com/current?access_key=1dbdd5e3b11cb653cf1a6959e8c4a05d&query= ${latitude},${longitude}`
    
    request({url: weatherUrl, json: true}, (error, response) => {
        if(error){
            callback('unable to connect to the server',undefined)
        }else if(response.body.error) {
            callback('check the coordinates again',undefined)
        }else{
            const data = response.body.current
            callback(undefined,`it is currently ${data.temperature} degrees out. It feels like ${data.feelslike} degrees outside. The wind speed is ${data.wind_speed} and the humidity is at ${data.humidity} %`)
        }
    })
}

module.exports = forecast
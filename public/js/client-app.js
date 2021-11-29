
const weatherForm = document.querySelector('form')
const inputData  = document.querySelector('input')
const messageOne = document.querySelector('#message1')
const messageTwo = document.querySelector('#message2')
const locationButton = document.querySelector('#location-button')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const search = inputData.value
    messageOne.textContent = 'loading the response'
    messageTwo.textContent = ''

    fetch('/weather?search=' + search).then((response) => {
    response.json().then((data) => {
        if(data.error){
            messageOne.textContent = data.error
        }else{
            messageOne.textContent = data.weather
            messageTwo.textContent = data.address
        }
    })
})
})

locationButton.addEventListener('click', (e) => {
    e.preventDefault()
    navigator.geolocation.getCurrentPosition((position) => {

        const latitude = position.coords.latitude
        const longitude = position.coords.longitude

        messageOne.textContent = 'loading the response'
        messageTwo.textContent = ''
        
        fetch(`/weather/currentlocation?latitude=${latitude}&longitude=${longitude}`).then((response) => {
            response.json().then((data) => {
                if(data.error){
                    messageOne.textContent = data.error
                }else{
                    messageOne.textContent = data.weather
                    messageTwo.textContent = data.address
                }
            })
        })
    })
})
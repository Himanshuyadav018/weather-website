
const weatherForm = document.querySelector('form')
const inputData  = document.querySelector('input')
const messageOne = document.querySelector('#message1')
const messageTwo = document.querySelector('#message2')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const search = inputData.value
    messageOne.textContent = 'loading the response'
    messageTwo.textContent = ''

    fetch('http://localhost:3000/weather?search=' + search).then((response) => {
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
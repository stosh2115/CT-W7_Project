const DOMElements = {
    'weatherapp1' : '.weather-data'
}

const getData = async (city) => {
    let response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=dc4584b1d0bccd9262c5346299d6beb6&units=imperial`)
    // let weather = response.data.coord.weather[2].main;
    console.log(response)
    return response.data
}


const createList = (name,description, temp, temp_min,temp_max,humidity) => {
    const forcast = description
    const html = `
    <tr>
        <td>${name}</td>
        <td>${forcast}</td>
        <td>${temp}</td>
        <td>${temp_min}</td>
        <td>${temp_max}</td>
        <td>${humidity}</td>
    </tr>
    `
    // searching the DOM for class of .rangers-list and then inserting our html into that div
    document.querySelector(DOMElements['weatherapp1']).insertAdjacentHTML('beforeend', html)
}

const loadData = async (city) => {
    const weather = await getData(city)

        createList(weather.name,weather.weather[0].description,weather.main.temp,weather.main.temp_min,weather.main.temp_max,weather.main.humidity)
    
}

const clearData = () =>{
    document.querySelector(DOMElements['weatherapp1']).innerhtml = ""

};

let form = document.querySelector('#test-data-form')

form.addEventListener('submit', (event) => {
    event.preventDefault()
    let queryCity = document.querySelector('#city').value
    loadData(queryCity)
})
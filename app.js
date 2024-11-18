
const locationName = document.getElementById("location-name-today");
const resultsWeather = document.getElementById("current-conditions-today");
const descriptionWeather = document.getElementById("description-today");
const temperatureInfo = document.getElementById("temperature-today");


const formBtn = document.getElementById("formBtn");

// icon mapping //
const iconMapping = {
    "clear-day": "fa-sun",
    "clear-night": "fa-moon",
    "rain": "fa-cloud-showers-heavy",
    "snow": "fa-snowflake",
    "sleet": "fa-cloud-meatball",
    "wind": "fa-wind",
    "fog": "fa-smog",
    "cloudy": "fa-cloud",
    "partly-cloudy-day": "fa-cloud-sun",
    "partly-cloudy-night": "fa-cloud-moon",
};


formBtn.addEventListener('click', async (event) => {
    try {
        event.preventDefault();
        const inputValue = document.getElementById("location").value.trim();
        if (!inputValue){
            throw new Error("Please provide a location.")
        }

        const weatherObj = await getWeatherInfo(inputValue);
        console.log('Second object', weatherObj)

        // DOM //
        descriptionWeather.textContent = weatherObj.description || "No description available";
        locationName.textContent = weatherObj.resolvedAddress || "No address available";
        resultsWeather.textContent = weatherObj.currentConditions?.conditions || "No conditions available";
        temperatureInfo.textContent = weatherObj.currentConditions?.temp;

        console.log(weatherObj.description);
        console.log(weatherObj.resolvedAddress);
        console.log(weatherObj.currentConditions?.conditions);
        console.log(weatherObj.currentConditions?.icon);

        // Icon update //
        const iconClass = iconMapping[weatherObj.currentConditions.icon] || "fa-question-circle";
        const weatherIconElement = document.getElementById("weather-icon-today");
        weatherIconElement.className = `fa-solid ${iconClass} fa-3x`;

        // Second div container - tomorrow results //
        document.getElementById("location-name-tomor").textContent = weatherObj.resolvedAddress || "No address available";
        document.getElementById("current-conditions-tomor").textContent = weatherObj.days[1].conditions || "No conditions available";
        document.getElementById("temperature-tomor").textContent = weatherObj.days[1].temp || "No temperature available";
        document.getElementById("description-tomor").textContent = weatherObj.days[1].description || "No description available";
        

        // Icon update Second //
        const iconClassTwo = iconMapping[weatherObj.days[1].icon] || "fa-question-circle";
        const weatherIconElementTwo = document.getElementById("weather-icon-tomor");
        weatherIconElementTwo.className = `fa-solid ${iconClassTwo} fa-3x`;

    } catch (error){
        console.log(error)
    }

})



async function getWeatherInfo(location) {
    const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=8S3ZY7RVXCX7JRZ8NCLRGMCVZ`
    const response = await fetch(url, {mode: 'cors'});
    if (!response){
        throw new Error("HTTP Error")
    }
    const data = await response.json()
    return data;

}


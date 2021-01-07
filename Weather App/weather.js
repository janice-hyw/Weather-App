// selects the forst element of form in class top (user's city input)
const form = document.querySelector(".top form");
const input = document.querySelector(".top input");
const invalid = document.querySelector(".top .invalid");
const list = document.querySelector(".weather .cities");

const key = "efdc90f532d5d938ca64453283013fb5";
// preventDefault cancels event if cancelable --> prevent from submitting a form (ex. user doesn't enter anything)
// city contains user's city input
form.addEventListener("submit", event => {
    event.preventDefault();
    let inputValue = input.value;

let url = `https://api.openweathermap.org/data/2.5/weather?q=${inputValue}&appid=${key}&units=metric`;

/* <---------------------------------------------------- WORK IN PROGRESS ---------------------------------------------------->
// Check if user has already entered city and more specific searches

// select the list of cities (if user has already entered in previous cities) and creates an array

const items = list.querySelectorAll(".weather .city");
const itemsArray = Array.from(items);

// check for if a successful AJAX request has been made already

if (itemsArray.length > 0) {
    function checkCity(el) {
        let output = "";

        if (inputValue.includes(",")) {
            // or just remove the if statement and just use jquery to search for the country
            
            let country = inputValue.split(",")[1]
            let id = "-";
            
            if (country.length == 2) {
                // for loop to search for country
            }
            url = `http://api.openweathermap.org/data/2.5/weather?id=${id}&appid=${key}&units=metric`
            
            if (inputValue.split(",")[1].length != 2) {
                // check for validity of country
                inputValue = inputValue.split(",")[0];
                output = el.querySelector(".city-name span").textContent.toLowerCase();
            }
            else {
                
                
                
            }
        }
        else {
            output = el.querySelector(".city-name span").textContent.toLowerCase();    
        }
        return output == inputValue.toLowerCase();
    }
    const filteredArray = itemsArray.filter(checkCity)
}*/


// Performing an Ajax Request

//const url = `http://api.openweathermap.org/data/2.5/weather?id=${id}&appid=${key}&units=metric`

// using Fetch API to perform Ajax Request
// fetch(url) returns a Promise containing response object (HTTP response)
// to get the actual response data in desired JSON format, use response.json() method --> returns another Promise
// Promise: fulfilled - available to use for manipulation
// Primise: unsucessful - return what's in catch

fetch(url)
    .then(response => response.json())
    .then(data => {
        // store the response data from openWeatherMap
        const { main, name, sys, weather } = data;
        const icon = `https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${weather[0]["icon"]}.svg`;

        const li = document.createElement("li");
        li.classList.add("city");
        const card = `
        <div class="card" style="width: 15rem;">
        <div class="card-body"> 
            <h2 class="city-name" data-name="${name},${sys.country}"> 
                <span>${name}</span>
                <sup>${sys.country}</sup>
            </h2>
            <h3 class="temp">${Math.round(main.temp)} <sup>°C</sup> </h3>
            <p class="temp">Feels like: ${Math.round(main.feels_like)} <sup>°C</sup></p>
            <figure>
                <img class="city-icon" src="${icon}" alt="${weather[0][main]}">
                <figcaption>${weather[0]["description"]}</figcaption>
            </figure>
        </div>
        </div>
        `;
        li.innerHTML = card;
        list.appendChild(li);
    })
    .catch(() => {
        invalid.textContent = "Please enter a valid city name.";
    });

    invalid.textContent = "";
    form.reset();
    input.focus();
});
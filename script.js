'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////

//most oldschool version- XML http request function 
//CORS- we need an api, it stands for (yes/unknows) Cross Origin Resource Sharing=> we can not acces 3rd party API from our own code
//Looking for ENDPoint-> the url 

const getCountryData = function(country){
 const request =new XMLHttpRequest();
 request.open('GET', `https://restcountries.com/v2/name/${country}`)
 request.send();

 //load event- it will provide a Json  
 request.addEventListener('load', function(){
    console.log(this.responseText)

    //converting the Json
    const [data] = JSON.parse(this.responseText);
    console.log(data);

    const html = `<article class="country">
          <img class="country__img" src="${data.flag}" />
          <div class="country__data">
            <h3 class="country__name">${data.name}</h3>
            <h4 class="country__region">${data.region}</h4>
            <p class="country__row"><span>👫</span>${(+data.population / 1000000).toFixed(1)}</p>
            <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
            <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
          </div>
        </article>`;
    countriesContainer.insertAdjacentHTML('beforeend', html);
    countriesContainer.style.opacity = 1;

 })
}

//we have 2 AJAX calls and data arrives on different times, hence those 2 calls can be switched. whichever arrives first will fire the load event first.
// IF we want to them to be in specific order we need to chain them 
getCountryData('portugal');
getCountryData('usa');
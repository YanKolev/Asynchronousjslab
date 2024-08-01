'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////

//most oldschool version- XML http request function 
//CORS- we need an api, it stands for (yes/unknows) Cross Origin Resource Sharing=> we can not acces 3rd party API from our own code
//Looking for ENDPoint-> the url 

/*
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

*/

// Consequentual callbacks ( Limiting the callbacks so they are debended on each other and Need to follow a certain order)



//Pulling out the render function from the original in order to call it 

const renderCountry = function (data, className = ''){

 
     const html = `<article class="country ${className}">
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
}



//AJAX call country 1
const getCountryAndNeighbour = function(country){
  const request =new XMLHttpRequest();
  request.open('GET', `https://restcountries.com/v2/name/${country}`)
  request.send();
 
  //load event- it will provide a Json  
  request.addEventListener('load', function(){
     const [data] = JSON.parse(this.responseText);
     console.log(data);
     //Render country 1
     renderCountry(data);

     //Get neihbour country 2
     const [neighbour] = data.borders;
 
     /*
     We can use optional chaining to account for countries with no borders property:
     INSTEAD OF 
     const [neighbour]= data.borders;
     WE CAN USE: 
     const neighbour = data.borders?.[0];
     */
     if (!neighbour) return // used for like islands, wehre there are no neighbours

     //AJAX call country 2
    
      const request2 =new XMLHttpRequest();
      request2.open('GET', `https://restcountries.com/v2/alpha/${neighbour}`)
      request2.send();
      
      //changing url to alpha in the url and neighbour to listen for it

      request2. addEventListener('load', function(){
        const data2 = JSON.parse(this.responseText);
        console.log(data2);

        renderCountry(data2, 'neighbour');
      })

      //callbackhell is where we have a lot of nested callbacks in order to execute a lot of aasynchronous tasks in sequence


  
      
  });
 }
 getCountryAndNeighbour('austria');

 /*
 setTimeout (() =>{
  console.log(`1 second passed`),;
    setTimeout (() =>{
      console.log(`1 second passed`); 
    
 }, 1000)
 */

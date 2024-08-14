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
     //countriesContainer.style.opacity = 1;
}



/*
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
    /*
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

*/

 /*
 setTimeout (() =>{
  console.log(`1 second passed`),;
    setTimeout (() =>{
      console.log(`1 second passed`); 
    
 }, 1000)
 */


 //     ------------------Promises & Fetch API------------
 
 //we will replace  xmlhttp request with fetch api 

/* Original way of doing 
  const request =new XMLHttpRequest();
  request.open('GET', `https://restcountries.com/v2/name/${country}`)
  request.send()

*/

/*
 const request = fetch('https://restcountries.com/v2/name/portugal')
 console.log(request); // prints a promise
*/




 // Promise definitions:
 //Promise- An object that is used as a placeholder for the future result of an asynchronous operation. 
 //-A container for an asynchronously delivered value. 
 //-A container for future value (response from AJAX call)

 //2 BIG ANDVANTAGES: 

 //1- We no longer need to rely on events and callbacks passed into asynchronous functions to handle asynchronous results;
 //2- Instead of nesting callbacks, we can chain promises for a sequence of asynchronous operations: escaping callback hell? 

 /* 
 Promise lifecycle: 
 
 1) Pending(before the future value is available) still works asynchronous task in the background
 2) Settled (asynchronous task has finished)-
 2.1) Fulfilled promises-> Succesfully resulted in a value
 2.2) Rejected promises => An eror happened 
 3) Build Promise (FETH API returns promis) -> Consume promise- when we have a promise-> promise returned from FETCH API 
 */


 //   ---------------- Consuming Promises ----------------------

 //Chaining reponses 


 //Older way of writing
 /*
 const request = fetch('https://restcountries.com/v2/name/portugal')
 console.log(request);

 const getCountryData = function(country) {
  fetch(`https://restcountries.com/v2/name/${country}`).then(function(response){
    console.log(response);
     return response.json();
  }).then(function(data){
    console.log(data)
    renderCountry(data[0])
  })
 }
*/

//Linked with row 55 definition

/*
const getCountryData = function (country){
  fetch(`https://restcountries.com/v2/name/${country}`) //fetches something
  .then(response => response.json()) // waiting for a respose and converting to json
  .then(data => {
    renderCountry(data[0]); // takes the data and renders it to the DOM 
    const neighbour = data[0].borders[0] //chaining he promises and adding neighbour

    if (!neighbour) return;

    //Country 2 - we need to retun this 2nd promise and then we can chain new then method on the result 
    fetch(`https://restcountries.com/v2/alpha/${neighbour}`)
   })
  .then(response => response.json())
  .then(data => renderCountry(data, 'neighbour'))
}

getCountryData('portugal');

//Promises to get read of callbacks, but they do get rid off of callback hell. 
*/

//Function for rendering error 

const renderError = function(msg){
  countriesContainer.insertAdjacentText('beforeend', msg);
  countriesContainer.style.opacity = 1
}

// Helper function to FETCH , ERROR HANDLING AND CONVERSION TO JSON

const getJSON = function(url, errorMsg = 'Something went wrong'){
   return fetch(url).then(response => {
    if(!response.ok) throw new Error(` ${errorMsg} (${response.status})`)

    return response.json();
  })
}


/* Keeping original function block as a refrence, re-doing it below  with the helper function

const getCountryData = function (country) {
  //Country 1
  fetch(`https://restcountries.com/v2/name/${country}`)
  .then(response => {
    console.log(response)

      if(!response.ok)
        throw new Error(`Country not found (${response.status})`) // throw will immediately terminate the current function, the promise will immediatelly REJECT, and propagate down to catch handler 
    
     return response.json()}, /*err => alert(err)*/ // catching the error with an alert here
/*  .then(data =>{
    renderCountry(data[0])
    const neighbour = data[0].borders[0];

    if (!neighbour) return;

    //Country 2
    return fetch(`https://restcountries.com/v2/alpha/${neighbour}`)
  })
  .then(response => response.json(), /*err => alert(err)*/ //catching the error in the second fetch 
/*  .then(data => renderCountry(data, 'neighbour'))
  .catch(err => {
    console.error(`${err}`);
    renderError (`Something went wrong ${err.message}.Try again!`)

  
  }) // Catches any errors that occur in the WHOLE PROMISE CHAIN, NO MATTER WHERE THAT IS-> As Errors propagate down the chain until they are caught 

  //There is also the method finally that we can use to use.
  //Then method is that we use when we promise is fullfilled,
  //Catch method is called only when the promise is rejected,
  //Finally method and its callback functions is called regardless- No matter if its called or rejected. We use it for something that always needs to hapen, no matter the result
  .finally(()=>{
    countriesContainer.style.opacity = 1; //works only because catch  returns a promise

  })


};

*/

const getCountryData = function (country){
  //Country 1 

  getJSON(`https://restcountries.com/v2/name/${country}`, 'Country not found')
  .then(data => {
    renderCountry(data[0]);
    const neighbour = data[0].borders[0];

    if(!neighbour) throw new Error('No neighbour found!');

    //Country 2 

    return getJSON(`https://restcountries.com/v2/alpha/${neighbour}`, 'Country not found')
    .then(data => renderCountry(data, 'neighbour'))
    .catch(err => {
      console.error(`${err}`);
      renderError(`Something went wrong ${errorMsg}, Try again`)
    })
    .finally(()=> {
      countriesContainer.style.opacity = 1;
    })

  })
}




btn.addEventListener('click', function(){
  getCountryData('portugal');
})

getCountryData('australia')

//2 ways of handling rejection- 1st way- pass a second callback function into the then method (adding second callback when it was rejected- Line 225)
//2nd way- to catch them by the end of the chain instead of adding another error callback inside => by adding catch method 

//Callbacks allow us to extend the asynchronous operations with as many steps as we want, 
//we are currently 4 steps in (thens) and we can easily chain in one after another and all without callback hell
//what we have here is called- flat chain of promises . 

//DO NOT CHAIN THEN TO DIRECTLY TO A NEW NESTED PROMISE- (immediately on fetch, inside of the previous THEN method- BUT MAKES IT A CALLBACK METHOD)
//ALWAYS RETURN THE PROMISE AND CONTINUE THE CHAIN OUTSIDE 



// ---- Error Handling in promises ----- 

//A promise in which an error happened is a rejected promise, The only way in which the fetch promise rejects is when the user loses its  internet connection 
//Adding content and button on line 239, check up 

// --- Throwing Errors Manually---
// Adding blocks at line 237, getcountrydata,  under 1st fetch, response 


// adding function from challenge to render country 

const whereAmI = function(lat, lng){
    
  fetch(`https://geocode.xyz/${lat},${lng}?json=1`)
  .then(response => {
      if (!response.ok) throw new Error (`Problem with geocoding ${response.status}`)
       return response.json()})
  .then(data => {
      console.log(data);
      console.log(`You are in ${data.city}, ${data.country}`);

      return fetch(`https://restcountries.com/v2/name/${data.country}`)
  })
  .then(response =>{
      if(!response.ok)
          throw new Error(`Country not found ${response.status}`)
      return response.json();

  })
  .then(data=> renderCountry(data[0]))
  .catch(err => console.error(`${err.message} !!!`))

}

whereAmI(-33.933, 18.474);
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


/*

btn.addEventListener('click', function(){
  getCountryData('portugal');
})



getCountryData('australia')


*/

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

/*
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

*/ 

/* 

JS runtime is a container which includes all the different pieces that are necessary to execute JS code. 
The heart of the runtime is the JS engine- where objects are stored in memory and also where the code is actually executed. 

JS has only 1 thread of execution- ABSOLUTELY NO MULTI-TASKING. 
After that it comes the web API enviourent- basically which the APIs are provided to the engine- which are not part of the JS language themselves
( the DOM, fetch, times, location API, geolocation API )
After that is the callback queue- which is a data structure  that holds  the ready to be executed callback functions(coming from events)
Concurency model -> how JS handles multiple tasks happening at the same time
The JS engine is build around the idea of single thread-

-from the code snippet- loading image and fetching data will happen in the web api eniourment, otherwise
we will block the callstack and add a huge lag on our application, 

Callback queue is ordered list of all the callback functions that are to be executed, also a to-do list of a kind that the callstack needs to complete.


Event loop- it looks into the callstack and it determines if its empty or not, except of th eglobal context, 
if its empty- it will take the first callback from the callback queue and put it in the callstack to be executed
this is called- event loop tick.  
The event loop- makes the coordination between the call stack and the callbacks in the  callback queue. 
JS language has no sense of time-  everything that is asynchronous happens outside of the engine.
Its the runtime that manages the whole asynchronous behaviour, and its event loop which decides which code will be learned next. 
The engine itself simply executes whichever code is given. 






*/

/*

//Snippet code example
el = document.querySelector('img');
el.src = 'dog.jpg';
el.addEventListener('load', () => {
  el.classList.add('fadeIn');
});

fetch('https://someurl.com/api')
  .then(res => console.log(res))


*/

/*
-Image started loading asynchronously in the webAPIs enviourment and NOT IN THE CALLSTACK.
-Then we use addeventlistener to attach a callback function to the image load event -> THIS callback is basically our asynchronous code. Code that we deffered in the future ->once the image is loaded.
-Addevent listened did not put the callback directly in the callback queue, it simply registered the callback, WHICH THEN kept waiting in the WEB APIS-> UNTIL THE LOAD EVENT IS FIRED OFF
- After the event is fired off, then the enviourment put the callback in the queue, then while in the queue, 
the callback is waiting for the event loop to pick it up and put on the call stack - all of this happens as the callback is first in line and the callstack was empty. 

All of this happened so the image does not have to load in the callstack but in the background. 
The web apis, callback queue and event loop make it possible for asynchronous code to be executed even with 1 theread of execution in the engine. 

- we need fetch the data with a promise, the fetch is done, callbacks related to promises do not go into the Callback queue- will not be moved in the callbak queue
- Callbacks of promises have a special queue for themselves - so called- MICROTASKS queue- It has priority over the callback queue-
- at the end of an event loop tick-  the event loop will check if there are any callbacks in the microtask queue -> if there are it will run all of them. 
-before it runs any more callbacks from the regular callback queue.
- If one microtask ads a new microtask then that new microtask is also executed before any callbacks from the callbak queue. 
- this means that maybe the microtask queue can starve the callback queue-> This is never a problem, but a possibility. 

- The idea of running asynchronous code with regular callbacks and microtasks coming from promises is very similar - The only differences is that they go in different queues 
- and the evento loop gives microtasks PRIORITY OVER regular callbacks. 
*/





/* Asynchronous loop practice: */ 

/*

console.log(`Test start`)
setTimeout(() => console.log('0 sec timer'),  0) //timer which should call this function exactly after 0 seconds 
//after 0 seconds this callback will be putback on the callback queue. 
Promise.resolve('Resolved promise 1').then(res => console.log(res));

Promise.resolove('Resoloved promise 2'). then (res => {
  for (let i = 0; i < 1000000; i++) {} //this microtask will take a lot of time for counting
  console.log(res)
})
console.log('Test end');

//NB! Avoid using JS timers for high precision things. Or stacking timers with microtasks. 


//Manually building promise

const lotteryPromise = new Promise(function(resolve, reject){

  console.log('Lottery draw is happening!')
  // using the timer we encapsulated some asynchronous behaviour into this promise
  setTimeout(function(){
    if(Math.random() >= 0.5){
      resolve('You Win!')
    } else {
      reject(new Error('You lost your money!'));
    }

  },2000)// 2000= 2 seconds


})

//consuming the promise
lotteryPromise.then(res => console.log(res)).catch(err => console.error(err)) //consuming the promise here

//promisify the set timeout function 
//we do not need the reject parameter as its impossible for the timer to fail

const wait = function(seconds){
  return new Promise(function(reslove){
    setTimeout(reslove,seconds * 1000)
  })
}

wait(2).then(() => {
  console.log('I waited for 2 seconds')
  return wait(1);
}).then(()=> console.log('I waited for 1 second'))

//creating a rejected promise immediately
Promise.resolve('abc').then (x => console.log(x));
Promise.reject(new Error('Problem!')).catch(x => console.error(x))

*/


// Promisifying geolocation API: 

//Getting from callback based API to promisebased API: 

//navigator.geolocation.getCurrentPosition(position => console.log(position), err => console.error(err))


const getPosition = function(){
  return new Promise(function(resolve, reject ){
    navigator.geolocation.getCurrentPosition(position => resolve(position), 
    err => reject(err))
  })

  //another variant 
    //navigator.geolocation.getCurrentPosition(resolove, reject)

}

getPosition().then(pos => console.log(pos))

//Code from the challenge that we can use for the promisifying of the geolocation.

const whereAmI = function(){
  getPosition().then(pos =>{
    const {latitude: lat, longitude: lng} = pos.coords;

    return fetch(`https://geocode.xyz/${lat},${lng}?json=1`)

  })

    
  
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

btn.addEventListener('click', whereAmI);
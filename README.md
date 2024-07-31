# Asynchronousjslab


Most code is synchronous. Synchronous code is executed line by line, each line of code waits for previous line to finish. Long-running operations block code execution (ex. alent inside a query selector)

Asynchronous code: 

const p = document.querySelector('.p');
setTimeout(function () {
    p.textContent = 'My name is John!';
}, 5000);
p.style.color = 'red';

-the timer will run in the background, as it will not interrupt the main function and we also set a callback function that will be executed once the timer finishes.

-Asynchronous code is executed after a task that runs in the background finishes, 
-Asynchronous code is non-blocking!(does not block the code execution)
-Execution doesnt wait for an asynchronous task to finish its work;

-Asynchronous programming is basically coordinating the behaviour of our program over certain period of time.

NB!!!-Callback functions DO NOT MAKE THE CODE ASYCHRONOUS. Only certain functions can do that(ex- setTimeout)

-Defer an action into a future and making the code non-blocking- the essences of asychronous code.

                       -----------AJAX---------

AJAX- abreviation of Asynchronous JavaScript And XML. Allows us to communicate with remote web servers in an asynchronous way. With AJAX calls we can request data from web servers dynamically. 

example:
client(e.g browser) -> http reuqest(asking for some data) ->web sever(usually WEB API) ->response(sending data)->client

API: Application Programming Interface: Piece of software that can be used by another priece of software in order to allow applications to talk to each other

There are many types of APIs in web development: 
-DOM API, Geolocation API, 
-Own Class API(Objecs made from a class can be seen as self-contained enapsulated pieces of software that other pieces of software can interact with)
-"Online" API- Applicaton runniong on  a server, that receives request for data, and sends data back as response. 

AJAX-> XML data format(rarely used xml)
JSON-> most popular data format(basically JS object but converted to a string- easy to use and send across the web)
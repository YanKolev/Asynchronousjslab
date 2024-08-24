/*
Coding Challenge #3
Your tasks:
PART 1
1. Write an async function 'loadNPause' that recreates Challenge #2, this time
using async/await (only the part where the promise is consumed, reuse the
'createImage' function from before)
2. Compare the two versions, think about the big differences, and see which one
you like more
3. Don't forget to test the error handler, and to set the network speed to “Fast 3G”
in the dev tools Network tab
PART 2
1. Create an async function 'loadAll' that receives an array of image paths
'imgArr'
2. Use .map to loop over the array, to load all the images with the
'createImage' function (call the resulting array 'imgs')
3. Check out the 'imgs' array in the console! Is it like you expected?
4. Use a promise combinator function to actually get the images from the array 😉
5. Add the 'parallel' class to all the images (it has some CSS styles)
Test data Part 2: ['img/img-1.jpg', 'img/img-2.jpg', 'img/img-
3.jpg']. To test, turn off the 'loadNPause' function
GOOD LUCK 😀
*/

const wait = function(seconds) {
    return new Promise(function(resolve) {
        setTimeout(resolve, seconds * 1000);
    });
};

const imgContainer = document.querySelector('.images');

const createImage = function(imgPath) {
    return new Promise(function(resolve, reject) {
        const img = document.createElement('img');
        img.src = imgPath;

        img.addEventListener('load', function() {
            imgContainer.append(img);
            resolve(img);
        });

        img.addEventListener('error', function() {
            reject(new Error('Image not found'));
        });
    });
};

let currentImg;

/*
createImage('img/img-1.jpg')
    .then(img => {
        currentImg = img;
        console.log('Image 1 loaded');
        return wait(2);  // Return the wait(2) promise to chain the timing correctly
    })
    .then(() => {
        currentImg.style.display = 'none';
        return createImage('img/img-2.jpg');
    })
    .then(img => {
        currentImg = img;
        console.log('Image 2 loaded');
        return wait(2);
    })
    .then(() => {
        currentImg.style.display = 'none';
    })
    .catch(err => console.error(err));

*/

const loadNPause = async function () {
    try{
        //Load img 1 
     let img1 = await createImage('img/img-1.jpg')
     console.log('Image 1 loaded');
     await wait(2);//pausing execution for 2 seconds.
     img.stle.display = 'none'

     //Load img 2 
     img = await createImage('img/img-2.jpg')
     console.log('Image 2 loaded');
     await wait(2);//pausing execution for 2 seconds.
     img.stle.display = 'none'

    }catch(err){
        console.error(err)

    }
}

const loadAll = async function(imgArr) {
    try{
        const imgs = imgArr.map(async img =>  await createImage(img));
        console.log(imgs)

        const imgsEL = await Promise.all(imgs); //async await with a map u can handle it with promise.all
        console.log(imgsEL);
        imgsEL.forEach(img => img.classList.add('parallel'))

    }catch(err){
        console.error(err);
    }
}

loadAll(['img/img-1.jpg', 'img/img-2.jpg', 'img/img-3.jpg']);
//what we have here is array of promises, not the images themsleves 
//line 96- > async function and then w ehave arrow function which is explicit return in each adoration 
//async will  always return a promise and not really yhe value that we are interested in
//the value that we are looking for is going to be the fullfilled value of the that we are looking for
//
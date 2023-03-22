const imageContainer =  document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

// Unsplash API
let count = 5;
const apiKey = 'VDOBfuKqFpLpe-JZ_LDAcsUMjirRTWbu0uK9-5B4b3U';
let apiUrl =`https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// Check if all images were loaded
 function imageLoaded() {
    imagesLoaded++;
    if (imagesLoaded === totalImages) {
        ready = true;
        loader.hidden = true;
        count = 30;
        apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;
    }
 }

// function to help set Atrribute on DOM element
 function setAttributes( element, attributes) {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key]);
        }
    }
 
// Create elements for links & Photo, Add to DOM
function displayPhotos() {
    imagesLoaded = 0;
    totalImages = photosArray.length;  
    // run function for each object in photoArray
   photosArray.forEach((photo) => {
    // create <a> to link to unsplash
    const item = document.createElement('a');
    setAttributes(item, {
        href: photo.links.html,
        target: '_blank',
    })
    // create <img> for photo
    const img = document.createElement('img');
    setAttributes(img, {
        src: photo.urls.regular,
        alt: photo.alt_description,
        title: photo.alt_description,
    })
    // Event Listener, check when each is finished loading
    img.addEventListener('load', imageLoaded); 
    // put <img> inside <a> and put both inside the image container
    item.appendChild(img);
    imageContainer.appendChild(item);
   });

}

//  Get photos from unsplash API
async function getPhotos() {
    try {
        const response = await fetch(apiUrl)
        photosArray = await response.json()
        displayPhotos();
    } catch (error) {
         
    }
}

// Check to see if scrolling near bottom of page, Load More Photos
window.addEventListener('scroll', () => {
     if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 & ready) {
        ready = false;
         getPhotos()
     }
})

// On Load
getPhotos()
displayPhotos();
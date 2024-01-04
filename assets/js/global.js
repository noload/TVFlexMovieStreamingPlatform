

const addEventOnElements=function (elements,eventType,callback) {
    for (const ele of elements) {
        ele.addEventListener(eventType,callback);
    }
}

// Toggle search box on mobilr and small device

const searchBox = document.querySelector("[search-box]");
const searchTogglers = document.querySelectorAll("[search-toggler]");

addEventOnElements(searchTogglers,'click',function () {
   searchBox.classList.toggle("active"); 
});



/**
 * store movieId in 'localStorage'
 * when you click any movie card
 */

const getMovieDetail=function (movieId) {
    window.localStorage.setItem("movieId",String(movieId));
}


const getMovieList=function (urlParam, genreName) {
    window.localStorage.setItem("urlParam",urlParam);
    window.localStorage.setItem("genreName",genreName)
}
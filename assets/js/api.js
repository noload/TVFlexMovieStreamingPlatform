'use strict';
const api_key='c7d805c4cd4b38b7049f601b3bfb8fbd'
const imageBaseURL = 'https://image.tmdb.org/t/p/'

// fetch data from a server the 'url' ans passes
// the result in Json data to a 'callback' function
// along with an optional parameter if has 'optionaparam'


const fetchDataFromServer = function(url,callback,optionaparam){
    fetch(url)
    .then(response =>response.json())
    .then(data=>callback(data,optionaparam));
}

export{
    imageBaseURL,api_key,fetchDataFromServer
};
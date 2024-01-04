'use strict'
import { api_key,imageBaseURL,fetchDataFromServer } from "./api.js"
import { createMovieCard } from "./movie-card.js"
import { sidebar } from "./sidebar.js"
import { search } from "./search.js"

//collecting genre name and urlparam form local storage
const genreName = window.localStorage.getItem("genreName");
const urlParam = window.localStorage.getItem("urlParam");

const pageContent = document.querySelector("[page-content]");


sidebar();

let currentPage = 1;
let totalPages =0;
let fetchURL =`https://api.themoviedb.org/3/discover/movie?include_adult=false&language=en-US&page=${currentPage}&sort_by=primary_release_date.asc&with_original_language=hi&api_key=c7d805c4cd4b38b7049f601b3bfb8fbd&${urlParam}`;


fetchDataFromServer(fetchURL,function ({results:movieList,total_pages}) {
    totalPages=total_pages;
    document.title =`${genreName} Movies - TvFlix`;

    const movieListElem = document.createElement("section");
    movieListElem.classList.add("movie-list","genre-list")
    movieListElem.ariaLabel =`${genreName} Movies`
    movieListElem.innerHTML=`
    <div class="title-wrapper">
    <h3 class="heading">All ${genreName} Movies</h3>
  </div>

  <div class="grid-list">
 
      
      <div class="movie-card">
        <figure class="poster-box card-banner">
          <img src="./assets/images/slider-control.jpg" alt="" class="img-cover">
        </figure>
        <h4 class="title">Puss in Boots:The Last wish</h4>
        <div class="meta-list">
          <div class="meta-item">
            <img src="./assets/images/star.png" width="20" height="20" loading="lazy" alt="">
            <span class="span">8.4</span>
          </div>

          <div class="card-badge">2022</div>

        </div>

        <a href="./detail.html" class="card-btn" title="Puss in Boots:The last Wish"></a>

      </div>
       
  </div>

  <button class="btn load-more"load-more>Load More</button>
    `;

/**
 * add movie card based on fetched item
 */

    for(const movie of movieList){
        const movieCard = createMovieCard(movie);
        movieListElem.querySelector(".grid-list").appendChild(movieCard);

    }

    pageContent.appendChild(movieListElem);

    document.querySelector("[load-more]").addEventListener("click",function () {
    if(currentPage>=totalPages){
        this.style.display="none";
        return;
    }     
    currentPage++;
    this.classList.add("loading")

    fetchDataFromServer(fetchURL,({results:movieList})=> {
        this.classList.remove("loading");
        for(const movie of movieList){
            const movieCard = createMovieCard(movie);
            movieListElem.querySelector(".grid-list").appendChild(movieCard);
        }
    });
    });



});
search();
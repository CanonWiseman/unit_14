"use strict";

const $showsList = $("#shows-list");
const $episodesArea = $("#episodes-area");
const $searchForm = $("#search-form");
const $episodesList = $("#episodes-list")

/** Given a search term, search for tv shows that match that query.
 *
 *  Returns (promise) array of show objects: [show, show, ...].
 *    Each show object should contain exactly: {id, name, summary, image}
 *    (if no image URL given by API, put in a default image URL)
 */

async function getShowsByTerm(q) {
  // ADD: Remove placeholder & make request to TVMaze search shows API.
  const shows = await axios.get("https://api.tvmaze.com/search/shows", {params: {q}});
  const showsArr = [];

  for(let show of shows.data){
    showsArr.push({
      id: show.show.id,
      name: show.show.name,
      summary: show.show.summary,
      image: show.show.image})
  }

  return showsArr;
}

function checkForImage(url){
  if(url === null){
    return "https://tinyurl.com/tv-missing";
  }
  else{
    return url.medium;
  }
}


/** Given list of shows, create markup for each and to DOM */

function populateShows(shows) {
  $showsList.empty();

  for (let show of shows) {
    const $show = $(
        `<div data-show-id="${show.id}" class="Show col-md-12 col-lg-6 mb-4">
         <div class="media">
           <img 
              src="${checkForImage(show.image)}" 
              class="w-25 mr-3">
           <div class="media-body">
             <h5 class="text-primary">${show.name}</h5>
             <div><small>${show.summary}</small></div>
             <button class="btn btn-outline-black btn-sm Show-getEpisodes">
               Episodes
             </button>
           </div>
         </div>  
       </div>
      `).on("click", "button", function(){
        
        // $episodesArea.show();
        populateEpisodes(show.id);
      });
      
    $showsList.append($show);
  }
}


/** Handle search form submission: get shows from API and display.
 *    Hide episodes area (that only gets shown if they ask for episodes)
 */

async function searchForShowAndDisplay() {
  const term = $("#search-query").val();
  const shows = await getShowsByTerm(term);

  $episodesArea.hide();
  populateShows(shows);
}

$searchForm.on("submit", async function (evt) {
  evt.preventDefault();
  await searchForShowAndDisplay();
});

async function getEpisodes(showID){
  const episodes = await axios.get(`https://api.tvmaze.com/shows/${showID}/episodes`);
  const episodeArr = [];

  for(let ep of episodes.data){
    episodeArr.push({
      name: ep.name,
      number: ep.number,
      season: ep.season
      })
  }
  return episodeArr;
}

async function populateEpisodes(showID){
  $episodesArea.show();
  const allEpisodes = await getEpisodes(showID);
  $episodesList.empty();
  for(let episode of allEpisodes){
    let $newEpisode = $(`<li>name: ${episode.name}, Season: ${episode.season}, Episode Number: ${episode.number}</li>`);
    $episodesList.append($newEpisode);
  }
}


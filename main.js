// DEFAULT CODE ////////////////////////
const BASE_URL = 'https://movie-list.alphacamp.io/'
const INDEX_URL = BASE_URL + 'api/v1/movies/'
const POSTER_URL = BASE_URL + 'posters/'

const movieList = document.querySelector('#movie-list')
const genresList = document.querySelector('#genres-list')
const genres = {
  "1": "Action",
  "2": "Adventure",
  "3": "Animation",
  "4": "Comedy",
  "5": "Crime",
  "6": "Documentary",
  "7": "Drama",
  "8": "Family",
  "9": "Fantasy",
  "10": "History",
  "11": "Horror",
  "12": "Music",
  "13": "Mystery",
  "14": "Romance",
  "15": "Science Fiction",
  "16": "TV Movie",
  "17": "Thriller",
  "18": "War",
  "19": "Western"
}

let genreslist = ''
for (let i = 1; i < 20; i++) {
  genreslist +=
    `<li class="nav-item">
      <a  class="nav-link" id="${genres[i]}" data-toggle="pill" href="#"> ${genres[i]}</a>
    </li>
    `
}
genresList.innerHTML = genreslist

function displayData(data, movieGenres) {
  let htmlContent = ''
  data.forEach(function (item, index) {
    moviegenres = []
    for (let i = 0; i < item.genres.length; i++) {
      let a = item.genres[i]
      moviegenres.push(genres[a])
    }
    if (moviegenres.includes(movieGenres)) {
      htmlContent += `
            <div class="col-sm-3">
              <div class="card mb-2">
                <img class="card-img-top " src="${POSTER_URL}${item.image}" alt="Card image cap">
                <div class="card-body movie-item-body">
                  <h6 class="card-title">${item.title}</h6>
                </div>
                <div class="card-footer">
                  <span>${moviegenres}</span>
                </div>
              </div >
            </div >
      `
    }
  })
  movieList.innerHTML = htmlContent
};

//重新提交程式碼
genresList.addEventListener('click', handleClickNav)

function handleClickNav(e) {
  let moviegenres = e.target.id
  console.log(e.target.id)
  // call getLyric(songTitle)
  getmovie(moviegenres)
}


function getmovie(movieGenres) {
  let data = []
  axios.get(INDEX_URL)
    .then((response) => {
      // for (let item of response.data.results){
      //   data.push(item)
      // }
      data.push(...response.data.results)
      displayData(data, movieGenres)
    })
    .catch((err) => console.log(err))

}

$(document).ready(function(){

  // referenze
  var searchInput = $('#query-search');
  var searchBtn = $('#btn-search');
  var movieList = $('.movie-list');

  // creazione template handlebars
  var source= $('#movie-template').html();
  var template = Handlebars.compile(source);

  // prendi il valore con il click
  searchBtn.click(function(){
  search( template, searchInput, movieList )

}); // searchBtn

// enter
  searchInput.keypress(function(e){
    if(e.which == 13){
      search( template, searchInput, movieList )
    }
  }); // enter

}); // ready

// **********************************************
// *************** functions ********************
// **********************************************

// milestone 3

// search

function search( template, searchInput, movieList ) {
  reset(movieList);
  var apiKey = 'd0f8455fc395e60bede1e8769f1753e2';
  var apiLang = 'it-IT';
  // ottieni testo da input
  var query = searchInput.val().trim();

  // Chiamata api Movie
  if(query !== '') {
    var dataMovie = {
        url : 'https://api.themoviedb.org/3/search/movie',
        key : apiKey,
        lang : apiLang,
        query : query,
        type : 'Film'
    }
    getData(dataMovie , template, movieList);

  // Chiamata serie-tv
  var dataSerie = {
      url : 'https://api.themoviedb.org/3/search/tv',
      key : apiKey,
      lang : apiLang,
      query : query,
      type : 'Tv'
  }
    getData(dataSerie , template, movieList);

  } else {

  }
};



function getData(dataMovie, template, movieList) {

  $.ajax({
    url: dataMovie.url,
    method : 'GET',
    data: {
      api_key : dataMovie.key,
      query : dataMovie.query,
      language : dataMovie.lang
    },
    success: function(response){
        var movies = response.results;

        if(movies.length > 0){

          print(template, movies, movieList, dataMovie.type);

        } else {
          console.log('Nessun film trovato');

        }

    }, error:function(){
      alert('Errore chiamata API')
    }
  });
}; // getData

function print(template, movies, container, type) {

  // loop sugli elementi dell'array movies

  for(var i= 0; i < movies.length; i++){
    var movie = movies[i];

    var title, originalTitle; // più variabili

    if (type == 'Film') {
      title = movie.title;
      originalTitle = movie.name;
    } else if(type == 'Tv') {
      title = movie.title;
      originalTitle = movie.original_name;
    }
    // gestione poster

    // default
    var poster =  'img/no-poster.png';
    if(movie.poster_path){
      poster = 'https://image.tmdb.org/t/p/w342/' + movie.poster_path
    }

    var context = {
      title : title ,
      originalTitle : originalTitle ,
      language: flags(movie.original_language),
      vote: stars(movie.vote_average),
      type : type,
      poster : poster,
      overview : movie.overview.substr(0, 100)  + '...'
    };

    var output = template(context);

    container.append(output);

  } // for
}; // print

//reset contenuto elemento
function reset(element) {
  element.html('');
}; // reset function

// converti numeri in stelle
function stars(rating){

    var vote = Math.ceil(rating / 2);

    var stars = '';
    for (var i= 1; i <= 5; i++){
      if(i <= vote){
        stars += '<i class="fas fa-star"></i> ';
      } else{
        stars += '<i class="far fa-star"></i> ';
      }
    }
    return stars;
  }; // stars

// converti lingua in bandiera
function flags(lang){
  var languages = ['it',
                  'en'
                ];

  if(languages.includes(lang)) {
    var flag = '<img src="img/' + lang + '.svg" + alt="' + lang + '" class="lang" />';
    return flag;
  }
  return lang;
}; // flags

$(document).ready(function(){

  // referenze
  var searchInput = $('#query-search');
  var searchBtn = $('#btn-search');
  var movieList = $('.movie-list');

  // creazione template handlebars
  var source= $('#movie-template').html();
  var template = Handlebars.compile(source);

  // prendi il valore
  searchBtn.click(function(){
  reset(movieList);

  // ottieni testo da input
  var query = searchInput.val().trim();

  // minimo controllo su testo inserito
  if(query !== '') {
      // film
      $.ajax({
        url: 'https://api.themoviedb.org/3/search/movie/',
        method : 'GET',
        data: {
          api_key : 'd0f8455fc395e60bede1e8769f1753e2',
          query : query,
          language : 'it-IT'
        },
        success: function(response){
            var movies = response.results;

            if(movies.length > 0){

              print(template, movies, movieList, 'Film');

            } else {
              console.log('Nessun film trovato');

            }

        }, error:function(){
          alert('Errore chiamata API')
        }
      });

  // serie tv
  $.ajax({
    url: 'https://api.themoviedb.org/3/search/tv/',
    method : 'GET',
    data: {
      api_key : 'd0f8455fc395e60bede1e8769f1753e2',
      query : query,
      language : 'it-IT'
    },
    success: function(response){
        var movies = response.results;

        if(movies.length > 0){

          print(template, movies, movieList, 'Tv');


        } else {
          console.log('Nessun film trovato');

        }

    }, error:function(){
      alert('Errore chiamata API')
    }
  });

  } else {
    alert('Prego inserire un valore nella ricerca')
    searchInput.focus();
  }

}); // searchBtn

}); // ready

// **********************************************
// *************** functions ********************
// **********************************************

function print(template, movies, container, type) {

  //reset(container);
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

    var context = {
      title : title ,
      originalTitle : originalTitle ,
      language: flags(movie.original_language),
      vote: stars(movie.vote_average),
      type : type
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

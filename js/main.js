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

  // ottieni testo da input
  var query = searchInput.val().trim();

  // minimo controllo su testo inserito
  if(query !== '') {
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

              print(template, movies, movieList);

            } else {
              alert('Nessun film trovato compa fra prova con un altro mestiere')
              searchInput.select();
            }

        }, error:function(){
          alert('Errore chiamata API')
        }
      });
  } else {
    alert('Prego inserire un valore nella ricerca')
    searchInput.focus();
  }


  });

var number = 29;
console.log(stars(number));

}); // ready


// functions


function print(template, movies, container) {
  //container.html('');

  reset(container);
  // loop sugli elementi dell'array movies

  for(var i= 0; i < movies.length; i++){
    var movie = movies[i];

    var context = {
      title : movie.title,
      originalTitle : movie.original_title,
      language: movie.original_language,
      vote: movie.vote_average
    };

    var output = template(context);

    container.append(output);

  }
}

//reset contenuto elemento

function reset(element) {
  element.html('');
}


function stars(iconStar){
  var iconFull = '<i class="fas fa-star"></i>';
  var iconFull = '<i class="far fa-star"></i>';
  
  return Math.ceil(iconStar / 2);

}

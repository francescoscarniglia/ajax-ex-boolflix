$(document).ready(function(){

var inputMovie = $('.search-movie');
var contentMovie = $('.movie-list');
var btnSearch = $('.btn-input');

var source = $('#movie-template').html();
var template = Handlebars.compile(source);

console.log(template);


btnSearch.click(function(){
var titleInsert = inputMovie.val().trim();
console.log(titleInsert);
// controlla il valore inserito
//if(qua mi serve un includes per array che arriva da API e capire se l'elemento inserito dall'utente c'è)

// print movie
printMovie(template);
inputMovie.val('');
});

});


// FUNCTIONS

function printMovie(movie){
  $.ajax({
    url: 'https://api.themoviedb.org/3/search/movie?api_key=d0f8455fc395e60bede1e8769f1753e2&query=spiderman',
    method : 'GET',
    success: function(data){
    var movies = data.results;
    //  console.log(singles);
      if(movies.length > 0){
        for(var i= 0; i < movies.length; i++) {
          //console.log(singles[i]);
          var source = $('#movie-template').html();

          var template = Handlebars.compile(source);
          var html = template(movies[i]);
          var contentMovie = $('.movie-list');
          contentMovie.append(html);
        }
      }
    },error : function() {
      console.log('errore');
    }
  });
};

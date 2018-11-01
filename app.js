const express = require('express')
const app = express()
var bodyParser = require('body-parser')
const mustacheExpress = require('mustache-express')
const PORT = 3004

let movies = []
 app.use(express.static('css'))
 app.use(bodyParser.urlencoded({ extended: false }))
 app.engine('mustache',mustacheExpress())
 app.set('views','./views')
 app.set('view engine','mustache')

 // app.get('/',function(req,res){
 //   res.send(('Hello World'))
 // })
app.get('/add_movies',function(req,res){
  res.render('add_movies')
})

app.get('/',function(req,res){
  res.render('movieSite',{movieList : movies})
})
// app.get('/',function(req,res){
//   res.json({name:"Emre"})
// })

app.post('/add_movies',function(req,res){
  let movieURL = req.body.movieURL
  let movieTitle = req.body.movieTitle
  let genre = req.body.genre
  let movieDescription = req.body.movieDescription
   movies.push({Title : movieTitle, Category : genre, Description : movieDescription, Poster : movieURL})
   res.redirect('/')
})

app.post('/delete_movie',function(req,res){
    let titleOfMovie = req.body.movieName
    movies = movies.filter(function(movie){
       return movie.Title != titleOfMovie
    })
    res.redirect('/')
})
app.get('/movies/:genre',function(req,res){

  let genre = req.params.genre
let moviesByGenre = movies.filter(function(each){
return genre == each.Category
})
res.render('movieSite', {movieList:moviesByGenre})
})

app.listen(PORT,function(){
   console.log("Server is running..")
})

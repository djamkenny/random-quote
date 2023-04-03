
const express = require('express');
const bodyParser = require('body-parser');
const https = require('https');

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'))
app.set('view engine', 'ejs');

const url = "https://api.quotable.io/quotes/random"
app.get('/', function(req, res){

    var today = new Date();

var option = {
    weekday: 'long', day: 'numeric', month: 'long'
}
var day = today.toLocaleDateString('en-Us', option)


    https.get(url, function(respond){
        respond.on('data', function(data){
            const quoteData = JSON.parse(data);
           const randomQuote = quoteData[0].content
           res.render('main', {quote: randomQuote, kindDay: day});
        })
    })

})

app.post('/', function(req, res){
    res.redirect('/');
    
})


app.listen(3000, function(){
    console.log('It running on port 3000')
})

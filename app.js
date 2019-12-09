const express = require('express');
const app = express();
const port = 8083;
const bodyparser = require('body-parser');
const fetch = require('node-fetch');

const hbs = require('express-handlebars')({
    defaultLayout: 'main',
    extname: '.hbs',
    helpers: {
      static(path) {
        return path;
      },
      escapeJSString(str) {
        if (! str) {
          return null;
        }
        return jsesc(str, {
          escapeEverything: true, 
          wrap: true 
        });
      }
    }
});

app.engine('hbs', hbs);
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));

app.use(bodyparser.urlencoded({extended : true}));
app.use(bodyparser.json());

app.get('/', (req, res) => {
    res.render("index.hbs");
});

app.post('/find-artist', (req, res) => {
    var artist = req.body.artist;
    fetch ('https://itunes.apple.com/search?term=' + artist.replace(" ", "_")).then(data => data.json()).then(data => {
        // res.send(data);
        res.render("find-artist.hbs", data)
    });
})

app.listen(port);

//npm start, open your browser and run localhost:port
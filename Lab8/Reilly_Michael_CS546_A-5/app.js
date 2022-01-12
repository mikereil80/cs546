// Michael Reilly
// I pledge my honor that I have abided by the Stevens Honor System.

const express = require('express');
const app = express();
const static = express.static(__dirname + '/public');

const exphbs = require('express-handlebars');

app.use('/public', static);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

const data = require('./data');
const tvData = data.tv;

app.get('/', async (req, res) => {
  const plugs = {
      title: "Show Finder"
  };
  res.render('get/get', plugs);
});

app.post('/search', async (req, res) => {
  const search = req.body.searchTerm;
  let searchTerm = search.toString();

  // Error Checking for search term
  if(searchTerm === undefined || searchTerm === null){
      res.status(400);
      const plugs = {
          description: 'No searchTerm parameter is given to the getShowBySearch(searchTerm) function.'
      }
      res.render('search/error', plugs);
  }
  if(typeof searchTerm !== 'string'){
      res.status(400);
      const plugs = {
          description: 'No searchTerm parameter is given to the getShowBySearch(searchTerm) function.'
      }
      res.render('search/error', plugs);
  }
  if(searchTerm.length == 0){
      res.status(400);
      const plugs = {
          description: 'No searchTerm parameter is given to the getShowBySearch(searchTerm) function.'
      }
      res.render('search/error', plugs);
  }
  // found on https://stackoverflow.com/questions/10261986/how-to-detect-string-which-contains-only-spaces
  if(searchTerm.replace(/\s/g, '').length == 0) {
      res.status(400);
      const plugs = {
          description: 'No searchTerm parameter is given to the getShowBySearch(searchTerm) function.'
      }
      res.render('search/error', plugs);
  }

  try{
      const showsFound = await tvData.getShowBySearch(searchTerm);
      const plugs = {
          title: "Shows Found",
          searchTerm: searchTerm,
          showsFound: showsFound
      };
      res.render('search/search', plugs);
  } catch(e){
      res.status(404);
      const plugs = {
          searchTerm: searchTerm
      };
      res.render('search/notfound', plugs);
  }
});

app.get('/shows/:id', async (req, res) => {
  const id = Number(req.params.id);

  // Error checking for id
  if(id === undefined || id === null){
      res.status(400);
      const plugs = {
          description: 'No id parameter is given to the getShowById(id) function.'
      };
      res.render('shows/error', plugs);
  }
  if(typeof id !== 'number'){
      res.status(400);
      const plugs = {
          description: `Input id in getShowById(id) value is not a number.`
      };
      res.render('shows/error', plugs);
  }
  if(id < 0){
      res.status(400)
      const plugs = { 
          description: `The id paramter is negative.`
      }
      res.render('shows/error', plugs);
  }
  if((id - Math.floor(id)) !== 0){
      res.status(400);
      const plugs = {
          description: `The id parameter is not a whole number.`
      };
      res.render('shows/error', plugs)
  }
  if(isNaN(id)){
      res.status(400);
      const plugs = {
          description: `Input id in getShowById(id) value is NaN.`
      };
      res.render('shows/error', plugs);
  }

  try{
      const show = await tvData.getShowById(id);
      // Regex for summary found at: https://www.geeksforgeeks.org/how-to-strip-out-html-tags-from-a-string-using-javascript/
      const plugs = {
          title: show.name,
          show: show,
          summary: show.summary.toString().replace( /(<([^>]+)>)/ig, '')
      };
      res.render('shows/shows', plugs);
  } catch(e){
      res.status(404);
      const plugs = {
          description: "No show found for the given id."
      };
      res.render('shows/error', plugs);
  }
});

app.use('*', (req, res) => {
  res.status(404).json({ error: "Incorrect Route URL"});
}); 

app.listen(3000, () => {
  console.log("We've now got a server!");
  console.log('URL route is on http://localhost:3000');
});
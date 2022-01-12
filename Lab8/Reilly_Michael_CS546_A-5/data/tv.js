// Michael Reilly
// I pledge my honor that I have abided by the Stevens Honor System.

const axios = require("axios");

async function getShows(){
    const { data } = await axios.get('http://api.tvmaze.com/shows');
    return data; // this will be the array of shows objects
}

async function getShowBySearch(searchTerm){
    // Error checking for searchTerm
    if(searchTerm === undefined || searchTerm === null){
        throw 'No searchTerm parameter is given to the getShowBySearch(searchTerm) function.';
    }
    if(typeof searchTerm !== 'string'){
        throw 'Input searchTerm in getShowBySearch(searchTerm) is not of type string.';
    }
    if(searchTerm.length == 0){
        throw 'Input searchTerm in getShowBySearch(searchTerm) length is 0, empty string.';
    }
    // found on https://stackoverflow.com/questions/10261986/how-to-detect-string-which-contains-only-spaces
    if(searchTerm.replace(/\s/g, '').length == 0) {
        throw 'Input searchTerm in getShowBySearch(searchTerm) is only empty spaces.';
    }

    const data = await getShows();

    const showsFound = [];
    data.forEach(function (show) {
        // Found to use this method at: https://masteringjs.io/tutorials/fundamentals/contains-substring#:~:text=To%20do%20case%20insensitive%20search,the%20String%23toLowerCase()%20function.
        if(show.name.toString().toLowerCase().includes(searchTerm.toString().toLowerCase())){
            showsFound.push(show);
        }
    });

    if(showsFound.length == 0){
        throw 'Empty array, no shows found'
    }
    else{
        // looked this up: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice
        return showsFound.slice(0, 20);
    }
}

async function getShowById(id){
    // Error checking for id
    if(id === undefined || id === null){
        throw 'No id parameter is given to the getShowById(id) function.';
    }
    if(typeof id !== 'number'){
        throw `Input id in getShowById(id) value is not a number.`;
    }
    if(isNaN(id)){
        throw `Input id in getShowById(id) value is NaN.`;
    }
    if(id < 0){
        throw `The id paramter is negative.`;
    }
    if((id - Math.floor(id)) !== 0){
        throw `The id parameter is not a whole number.`;
    }

    const data = await getShows();

    // Found here: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find
    let showFound = data.find(show => show.id === id );

    if(showFound){
        return showFound;
    }
    else{
        throw 'No show with given id found';
    }
}

module.exports = {
    getShows,
    getShowBySearch,
    getShowById
};
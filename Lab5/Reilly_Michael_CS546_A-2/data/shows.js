// Michael Reilly, 10439198, CS-546A
// I pledge my honor that I have abided by the Stevens Honor System.

const axios = require("axios");

// Function to get the shows.json array.
async function getShows(){
    const { data } = await axios.get('http://api.tvmaze.com/shows');
    return data; // this will be the array of shows objects
}

async function getShowsById(id){
    // Is the axios command to get the link with the given id
    // Is the command to keep the people.json array
    const shows = await getShows();
    // Use find to check each object instance in the array for the specific id that is equal to our id. Should only be one in the array.
    let showsIdFound = shows.find(show => show.id === id);

    // Check for existence of id or else fails.
    if(showsIdFound){
        return showsIdFound;
    }
    else{
        throw "The id " + id + " was not found.";
    }
}

module.exports = {
    getShows,
    getShowsById
};
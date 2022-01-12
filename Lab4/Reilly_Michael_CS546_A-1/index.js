const { ObjectID } = require('mongodb');
const mongoConnection = require('./config/mongoConnection');
const movies = require('./data/movies');

// Michael Reilly, 10439198, CS-546A
// I pledge my honor that I have abided by the Stevens Honor System.

// For part 7
let movie1Id = null;
// For part 9
let movie2Id = null;

async function main(){
    // Tests based on the 15 steps given in the lab instructions.
    try{
        // 1. Create a movie of your choice.
        const movie1 = await movies.create("Tokyo Godfathers", "On Christmas Eve, three homeless people living on the streets of Tokyo discover a newborn baby among the trash and set out to find its parents.", "PG-13", "1h 32min", "Adventure Comedy", ["Toru Emori", "Aya Okamoto", "Yoshiaki Umegaki"], {director: "Satoshi Kon", yearReleased: 2003});
        movie1Id = movie1._id.toString();
        // 2. Log the newly created movie. (Just that movie, not all movies)
        console.log(movie1);
    }catch(e){
        console.log(e);
        console.log("Movie 1 was not created successfully");
    }

    try{
        // 3. Create another movie of your choice.
        const movie2 = await movies.create("Promare", "A futuristic firefighting mecha service is created to protect the world.", "PG-13", "1h 51min", "Action Adventure", ["Taichi Saotome", "Kenichi Matsuyama"], {director: "Hiroyuki Imaishi", yearReleased: 2019});
        movie2Id = movie2._id.toString();
    }catch(e){
        console.log(e);
        console.log("Movie 2 was not created successfully");
    }

    try{
        // 4. Query all movies, and log them all
        const BothMovies = await movies.getAll();
        console.log(BothMovies);
    }catch(e){
        console.log(e);
        console.log("Function getAll() failed");
    }

    try{
        // 5. Create a 3rd movie of your choice.
        const movie3 = await movies.create("Spider-Man: Into the Spider-Verse", "Teen Miles Morales becomes the Spider-Man of his universe, and must join with five spider-powered individuals from other dimensions to stop a threat for all realities.", "PG", "1h 57min", "Action Adventure", ["Shameik Moore", "Jake Johnson"], {director: "Bob Persichetti, Peter Ramsey, and Rodney Rothman", yearReleased: 2018});
        // 6. Log the newly created 3rd movie. (Just that movie, not all movies)
        console.log(movie3);
    }catch(e){
        console.log(e);
        console.log("Movie 3 was not created successfully");
    }

    try{
        // 7. Rename the first movie's title
        const movie1Updated = await movies.rename(movie1Id, "Paprika");
        // 8. Log the first movie with the updated title.
        console.log(movie1Updated);
    }catch(e){
        console.log(e);
        console.log("Movie 1 failed to be renamed");
    }

    try{
        // 9. Remove the second movie you created.
        const movie2Deleted = await movies.remove(movie2Id);
    }catch(e){
        console.log(e);
        console.log("Movie 2 failed to be deleted");
    }

    try{
        // 10. Query all movies, and log them all
        const AllMovies = await movies.getAll();
        console.log(AllMovies);
    }catch(e){
        console.log(e);
        console.log("Function getAll() failed on second call");
    }

    try{
        // 11. Try to create a movie with bad input parameters to make sure it throws errors.
        const createFail = await movies.create("Hello World", "This is a plot summary", "G", 1.5, "Boring", ["Person 1"], {director: "A Dude", yearReleased: 1999});
        console.log("Function create did not fail");
    }catch(e){
        console.log(e);
    }

    try{
        // 12. Try to remove a movie that does not exist to make sure it throws errors.
        let objectID12 = new ObjectID().toString();
        const removeFail = await movies.remove(objectID12);
        console.log('Function remove did not fail');
    }catch(e){
        console.log(e);
    }

    try{
        // 13. Try to rename a movie that does not exist to make sure it throws errors.
        let objectID13 = new ObjectID().toString();
        const renameFail = await movies.rename(objectID13, "Failure");
        console.log('Function rename did not fail');
    }catch(e){
        console.log(e);
    }

    try{
        // 14. Try to rename a movie passing in invalid data for the parameter to make sure it throws errors.
        const renameFail2 = await movies.rename(movie1Id, {title: "Fail this test case"});
        console.log('Function rename did not throw error on invalid parameters');
    }catch(e){
        console.log(e);
    }

    try{
        // 15. Try getting a movie by ID that does not exist to make sure it throws errors.
        let objectID15 = new ObjectID().toString();
        const getFail = await movies.get(objectID15);
        console.log("Function get did not fail")
    }catch(e){
        console.log(e);
    }

    const db = await mongoConnection();
    await db.serverConfig.close();
};

// call main
main().catch((error) => {
    console.log(error);
});
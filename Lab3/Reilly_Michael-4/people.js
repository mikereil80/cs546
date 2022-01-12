const axios = require("axios");

// Michael Reilly, 10439198, CS-546A
// I pledge my honor that I have abided by the Stevens Honor System.

// Function to get the people.json array.
async function getPeople(){
    const { data } = await axios.get('https://gist.githubusercontent.com/graffixnyc/31e9ef8b7d7caa742f56dc5f5649a57f/raw/43356c676c2cdc81f81ca77b2b7f7c5105b53d7f/people.json');
    return data; // this will be the array of people objects
}

async function getPersonById(id){
    // Basic error checks.
    if(id === undefined || id === null){
        throw 'No id parameter is given to the getPersonById(id) function.';
    }
    if(typeof id !== 'number'){
        throw `The id parameter in getPersonById(id) is not a number.`;
    }
    if(isNaN(id)){
        throw `The id parameter in getPersonById(id) is NaN.`;
    }

    // Is the command to keep the people.json array
    const people = await getPeople();
    // Use find to check each object instance in the array for the specific id that is equal to our id. Should only be one in the array.
    let personIdFound = people.find(person => person.id === id);

    // Check for existence of id or else fails.
    if(personIdFound){
        return personIdFound;
    }
    else{
        throw "The id " + id + " was not found.";
    }
}

async function howManyPerState(stateAbbrv){
    // Basic error checks.
    if(stateAbbrv === undefined || stateAbbrv === null){
        throw "No stateAbbrv parameter is given to the function howManyPerState(stateAbbrv).";
    }
    if(typeof stateAbbrv !== 'string'){
        throw "The stateAbbrv parameter in howManyPerState(stateAbbrv) was not a string.";
    }

    const people = await getPeople();
    // Sets up a counter.
    let countOfPeople=0;
    // Checks through each object instance in the people.json array, and if the stateAbbrv is the same an extra number to the count.
    people.forEach(function(person){
        if(person.address.state === stateAbbrv){
            countOfPeople++;
        }
    });

    // Check that count was actually incremented.
    if(countOfPeople == 0){
        throw "No people in given stateAbbrv.";
    }
    else{
        return countOfPeople;
    }
}

// Helper function to sort the dates, as regular sort will not work.
function date_sort(a, b){
    return new Date(a).getTime() - new Date(b).getTime();
}

// Helper function to get the age of a person
function getAge(person){
    let ageDifference=Date.now() - new Date(person.date_of_birth).getTime();
    let ageDate = new Date(ageDifference);
    let year = ageDate.getUTCFullYear();
    return Math.abs(year-1970);
}

async function personByAge(index){
    // Basic error checks.
    if(index === undefined || index === null){
        throw 'No index parameter is given to the personByAge(index) function.';
    }
    if(typeof index !== 'number'){
        throw `The index parameter in personByAge(index) is not a number.`;
    }
    if(isNaN(index)){
        throw `The index parameter in personByAge(index) is NaN.`;
    }

    const people = await getPeople();
    // Sort the array with our helper function.
    const sortedPeople = people.sort((person1, person2) =>
        date_sort(person1.date_of_birth, person2.date_of_birth));

    // Check the index actually exists in the sortedPeople array.
    if(sortedPeople[index] === undefined || sortedPeople[index] === null){
        throw "Index does not exist within the people array."
    }
    else{
        // Find the age using javascript Date functions.
        sortedPeople[index]["age"]=getAge(sortedPeople[index]);

        // Set up an object to return only the requested fields rather than all available to the object. Probably an easier way to do this but whatever.
        let returnFields=new Object();
        returnFields["first_name"]=sortedPeople[index]["first_name"];
        returnFields["last_name"]=sortedPeople[index]["last_name"];
        returnFields["date_of_birth"]=sortedPeople[index]["date_of_birth"];
        returnFields["age"]=sortedPeople[index]["age"];
        return returnFields;
    }
}

// Helper functions to check for vowels in each persons first and last names.
function countVowels(person){
    const vowels="aeiouAEIOU";
    let countvowels = 0;
    for(let i=0; i<person.length; i++){
        if(vowels.indexOf(person[i]) !== -1){
            countvowels++;
        }
    }
    return countvowels;
}

// Helper function to check for consonants in each persons first and last names.
function countConsonants(person){
    const consonants="qwrtypsdfghjklzxcvbnmQWRTYPSDFGHJKLZXCVBNM"
    let countconsonants = 0;
    for(let i=0; i<person.length; i++){
        if(consonants.indexOf(person[i]) !== -1){
            countconsonants++;
        }
    }
    return countconsonants;
}

// Helper function to get a mode of what string is epeated most.
function mode(array){
    let highestStreak = 1;
    let mode = array[0];
    let currentStreak = 1;
    let currentElement = array[0];

    // for loop to check through the streaks.
    for(let i=1; i<array.length; i++){
        if(array[i-1] != array[i]){
            if(currentStreak > highestStreak){
                highestStreak = currentStreak;
                mode = currentElement;
            }
            currentStreak = 0;
            currentElement = array[i];
        }
        currentStreak++;
    }
    if(currentStreak > highestStreak){
        highestStreak = currentStreak;
        mode = currentElement;
    }
    return mode;
}

async function peopleMetrics(){
    const people = await getPeople();

    // Variables for counting and collecting all the metrics being asked for.
    let totalLetters = 0;
    let totalVowels = 0;
    let totalConsonants = 0;
    let longestName = people[0]["first_name"]+people[0]["last_name"];
    let shortestName = people[0]["first_name"]+people[0]["last_name"];
    let cityList = [];
    let mostRepeatingCity = "";
    let averageAge = 0;
    let totalAge = 0;

    // Iterate through each person in the people.json array to collect the necessary data.
    people.forEach(function(person){ 
        person.age = getAge(person);
        totalVowels += countVowels(person.first_name)+countVowels(person.last_name);
        totalConsonants += countConsonants(person.first_name)+countConsonants(person.last_name);
        let namelength = person.first_name.length+person.last_name.length+1;
        if(namelength > longestName.length){
            longestName = person.first_name+' '+person.last_name;
        }
        else if(namelength < shortestName.length){
            shortestName = person.first_name+' '+person.last_name;
        }
        totalAge+=person.age;
        cityList.push(person.address.city);
    })

    totalLetters += totalVowels+totalConsonants;

    // Collected totalAge, so just divide by the number of elements in people.json array to get the average of that.
    averageAge = totalAge/people.length;

    // Call the helper function mode to get what city appears most.
    let sortedCities = cityList.sort();
    mostRepeatingCity = mode(sortedCities);

    let returnObject = new Object();

    // Put all collected data into a single object for return readability.
    returnObject["totalLetters"] = totalLetters;
    returnObject["totalVowels"] = totalVowels;
    returnObject["totalConsonants"] = totalConsonants;
    returnObject["longestName"] = longestName;
    returnObject["shortestName"] = shortestName;
    returnObject["mostRepeatingCity"] = mostRepeatingCity;
    returnObject["averageAge"] = averageAge;

    return returnObject;
}

module.exports = {
    getPeople,
    getPersonById,
    howManyPerState,
    personByAge,
    peopleMetrics
};
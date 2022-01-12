const axios = require("axios");
const people = require('./people');

// Michael Reilly, 10439198, CS-546A
// I pledge my honor that I have abided by the Stevens Honor System.

// Function to get the work.json array.
async function getWork(){
    const { data } = await axios.get('https://gist.githubusercontent.com/graffixnyc/febcdd2ca91ddc685c163158ee126b4f/raw/c9494f59261f655a24019d3b94dab4db9346da6e/work.json');
    return data; // this will be the array of work objects
}

// a hellper function that makes the new object that will be added to the list in listEmployees.
async function listObject(eList){
    employees=[];
    // Makes a tempObject of each first and last name to add to the object at each index of final list.
    for(let i=0; i<eList.length; i++){
        let personId = await people.getPersonById(eList[i]);
        let tempObject={};
        tempObject["first_name"]=personId.first_name;
        tempObject["last_name"]=personId.last_name;
        employees.push(tempObject);
    }
    return employees;
}

async function listEmployees(){
    // Is the command to get the work.json array.
    const work = await getWork();
    let final=[];
    let employeeList = [];
    // Makes each object index to be pushed into final list.
    for(let j=0; j<work.length; j++){
        let eObject={};
        employeeList = work[j].employees;
        eObject["company_name"] = work[j].company_name;
        eObject["employees"]= await listObject(employeeList);
        final[j]=eObject;
    }
    return final;
}

async function fourOneOne(phoneNumber){
    if(phoneNumber === undefined || phoneNumber === null){
        throw "No phoneNumber parameter was given to the function fourOneOne(phoneNumber).";
    }
    if(typeof phoneNumber !== 'string'){
        throw "The phoneNumber parameter in function fourOneOne(phoneNumber) was not a string.";
    }

    // Syntax for checking the formatting so it aligns according to the given phone number format.
    let phoneNumberFormat = "[0-9]{3}-[0-9]{3}-[0-9]{4}";
    if(!phoneNumber.match(phoneNumberFormat)){
        throw "The phoneNumber parameter in function fourOneOne(phoneNumber) was not in the format '###-###-####'.";
    }

    // Go through each item in the work.json array and find the company with the given phone number, else fail.
    const work = await getWork();
    final_object = {};
    work.forEach(function(phone){
        if(phone.company_phone === phoneNumber){
            final_object["company_name"] = phone.company_name;
            final_object["company_address"] = phone.company_address;
        }
    });
    if(final_object && Object.keys(final_object).length === 0 && final_object.constructor === Object){
        throw 'Given phoneNumber parameter was not found in the work.json array.';
    }
    else{
        return final_object;
    }
}

async function whereDoTheyWork(ssn){
    if(ssn === undefined || ssn === null){
        throw "No ssn parameter was given to the function whereDoTheyWork(ssn).";
    }
    if(typeof ssn !== 'string'){
        throw "The ssn parameter in function whereDoTheyWork(ssn) was not a string.";
    }

    // Syntax for checking the formatting so it aligns according to the given ssn format.
    let ssnFormat = "[0-9]{3}-[0-9]{2}-[0-9]{4}";
    if(!ssn.match(ssnFormat)){
        throw "The ssn parameter in function whereDoTheyWork(ssn) was not in the format '###-##-####'.";
    }

    // Find the given ssn in people first, and return the id.
    const person = await people.getPeople();
    const work = await getWork();
    let ssnid = "";
    let employeeName = "";

    // Iterate person to find the id of the person with given ssn.
    person.forEach(function(peep){
        if(peep.ssn === ssn){
            ssnid=peep.id;
            // Find name of the employee with given ssn.
            employeeName = peep.first_name + ' ' + peep.last_name;
        }
    });
    // Fail if ssn does not exist in people.
    if(ssnid == ""){
        throw "Given ssn parameter in whereDoTheyWork(ssn) is not in the given people.json array.";
    }
    else{
        let companyName = "";

        // Find company name for that employee with given ssn works for..
        work.forEach(function(company){
            let employees = company.employees;
            for(let i=0; i<employees.length; i++){
                if(employees[i] == ssnid){
                    companyName = company.company_name;
                }
            }
        });

        if(companyName == "" || employeeName == ""){
            throw 'Could not find company_name of first_name last_name of employee with given ssn.';
        }
        else{
            return employeeName + ' works at ' + companyName + '.';
        }
    }
}

module.exports = {
    getWork,
    listEmployees,
    fourOneOne,
    whereDoTheyWork
};
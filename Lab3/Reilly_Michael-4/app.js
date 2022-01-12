const people = require('./people');
const work = require('./work');

// Michael Reilly, 10439198, CS-546A
// I pledge my honor that I have abided by the Stevens Honor System.

async function main(){
    // My test cases for getPersonById(id)
    try{
        const getPersonByIdPass = await people.getPersonById(43);
        console.log (getPersonByIdPass);
    }catch(e){
        console.log ("getPersonById failed test case");
    }
    try{
        const getPersonByIdFail1 = await people.getPersonById("failure");
        console.log ("getPersonById did not fail");
    }catch(e){
        console.log (e);
    }
    try{
        const getPersonByIdFail2 = await people.getPersonById(-1);
        console.log ("getPersonById did not fail");
    }catch(e){
        console.log (e);
    }
    try{
        const getPersonByIdFail3 = await people.getPersonById(1001);
        console.log ("getPersonById did not fail");
    }catch(e){
        console.log (e);
    }
    try{
        const getPersonByIdFail4 = await people.getPersonById();
        console.log ("getPersonById did not fail");
    }catch(e){
        console.log (e);
    }

    // My test cases for howManyPerState(stateAbbrv)
    try{
        const howManyPerStatePass1 = await people.howManyPerState("NY");
        console.log (howManyPerStatePass1);
    }catch(e){
        console.log ("howManyPerState failed test case");
    }
    try{
        const howManyPerStatePass2 = await people.howManyPerState("CO");
        console.log (howManyPerStatePass2);
    }catch(e){
        console.log ("howManyPerState failed test case");
    }
    try{
        const howManyPerStateFail1 = await people.howManyPerState("failure");
        console.log ("howManyPerState did not error");
    }catch(e){
        console.log (e);
    }
    try{
        const howManyPerStateFail2 = await people.howManyPerState(-1);
        console.log ("howManyPerState did not error");
    }catch(e){
        console.log (e);
    }
    try{
        const howManyPerStateFail3 = await people.howManyPerState("WY");
        console.log ("howManyPerState did not error");
    }catch(e){
        console.log (e);
    }
    try{
        const howManyPerStateFail4 = await people.howManyPerState();
        console.log ("howManyPerState did not error");
    }catch(e){
        console.log (e);
    }

    // My test cases for personByAge(index)
    try{
        const personByAgePass1 = await people.personByAge(0);
        console.log (personByAgePass1);
    }catch(e){
        console.log ("personByAge failed test case");
    }
    try{
        const personByAgePass2 = await people.personByAge(43);
        console.log (personByAgePass2);
    }catch(e){
        console.log ("personByAge failed test case");
    }
    try{
        const personByAgePass3 = await people.personByAge(500);
        console.log (personByAgePass3);
    }catch(e){
        console.log ("personByAge failed test case");
    }
    try{
        const personByAgePass4 = await people.personByAge(999);
        console.log (personByAgePass4);
    }catch(e){
        console.log ("personByAge failed test case");
    }
    try{
        const personByAgeFail1 = await people.personByAge("failure");
        console.log ("personByAge did not error");
    }catch(e){
        console.log (e);
    }
    try{
        const personByAgeFail2 = await people.personByAge(-1);
        console.log ("personByAge did not error");
    }catch(e){
        console.log (e);
    }
    try{
        const personByAgeFail3 = await people.personByAge(1000);
        console.log ("personByAge did not error");
    }catch(e){
        console.log (e);
    }
    try{
        const personByAgeFail4 = await people.personByAge();
        console.log ("personByAge did not error");
    }catch(e){
        console.log (e);
    }

    // My test case of peopleMetrics()
    try{
        const peopleMetricsPass = await people.peopleMetrics();
        console.log (peopleMetricsPass);
    }catch(e){
        console.log ("peopleMetrics failed test case");
    }

    // My test case of listEmployees()
    try{
        const listEmployeesPass = await work.listEmployees();
        console.log (listEmployeesPass);
    }catch(e){
        console.log ("listEmployees failed test case");
    }

    // My test cases of fourOneOne(phoneNumber)
    try{
        const fourOneOnePass = await work.fourOneOne('240-144-7553');
        console.log (fourOneOnePass);
    }catch(e){
        console.log ("fourOneOnePass failed test case");
    }
    try{
        const fourOneOneFail1 = await work.fourOneOne(43);
        console.log ("fourOneOne did not error");
    }catch(e){
        console.log (e);
    }
    try{
        const fourOneOneFail2 = await work.fourOneOne('212-208-8374');
        console.log ("fourOneOne did not error");
    }catch(e){
        console.log (e);
    }
    try{
        const fourOneOneFail3 = await work.fourOneOne("5045890047");
        console.log ("fourOneOne did not error");
    }catch(e){
        console.log (e);
    }
    try{
        const fourOneOneFail4 = await work.fourOneOne();
        console.log ("fourOneOne did not error");
    }catch(e){
        console.log (e);
    }
    try{
        const fourOneOneFail5 = await work.fourOneOne("failure");
        console.log ("fourOneOne did not error");
    }catch(e){
        console.log (e);
    }

    // My test cases of whereDoTheyWork(ssn)
    try{
        const whereDoTheyWorkPass1 = await work.whereDoTheyWork('299-63-8866');
        console.log (whereDoTheyWorkPass1);
    }catch(e){
        console.log ("whereDoTheyWork failed test case");
    }
    try{
        const whereDoTheyWorkPass2 = await work.whereDoTheyWork('277-85-0056');
        console.log (whereDoTheyWorkPass2);
    }catch(e){
        console.log ("whereDoTheyWork failed test case");
    }
    try{
        const whereDoTheyWorkFail1 = await work.whereDoTheyWork("failure");
        console.log ("whereDoTheyWork did not error");
    }catch(e){
        console.log (e);
    }
    try{
        const whereDoTheyWorkFail2 = await work.whereDoTheyWork();
        console.log ("whereDoTheyWork did not error");
    }catch(e){
        console.log (e);
    }
    try{
        const whereDoTheyWorkFail3 = await work.whereDoTheyWork("123456789");
        console.log ("whereDoTheyWork did not error");
    }catch(e){
        console.log (e);
    }
    try{
        const whereDoTheyWorkFail4 = await work.whereDoTheyWork("264-67-0084");
        console.log ("whereDoTheyWork did not error");
    }catch(e){
        console.log (e);
    }
}

//call main
main();
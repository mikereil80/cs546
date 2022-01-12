// Michael Reilly, 10439198, CS-546A
// I pledge my honor that I have abided by the Stevens Honor System.

const questionOne = function questionOne(arr) {
    // Implement question 1 here
    let result=new Object()
    if(arr === undefined || arr.length == 0){
        return {}
    }
    else{
        for(let i = 0; i < arr.length; i++){
            const index = arr[i]
            const prime = isPrime(index)
            // https://stackoverflow.com/questions/1168807/how-can-i-add-a-key-value-pair-to-a-javascript-object for information on adding key-value pairs to objects
            result[index]=prime
        }
        return result
    }
}

function isPrime(number){
    // helper function to question 1 to check if the index is prime
    if(number < 2){
        return false
    }
    for(let i = 2; i <= Math.sqrt(number); i++){
        if(number % i === 0){
            return false
        }
    }
    return true
}

const questionTwo = function questionTwo(arr) { 
    // Implement question 2 here
    let sumofsquares=0
    if(arr === undefined || arr.length == 0){
        return 0
    }
    for(let i = 0; i < arr.length; i++){
        sumofsquares+=Math.pow(arr[i],2)
    }
    const quint=Math.pow(sumofsquares, 5)
    const squareroot=Math.sqrt(quint)
    return squareroot.toFixed(2)
}

const questionThree = function questionThree(text) {
    // Implement question 3 here
    let result={consonants: 0, vowels: 0, numbers: 0, spaces: 0, punctuation: 0, specialCharacters: 0}
    if(!text){
        return result
    }
    const consonantlist="qwrtypsdfghjklzxcvbnmQWRTYPSDFGHJKLZXCVBNM"
    const vowellist="aeiouAEIOU"
    const numberlist="1234567890"
    const space=" "
    const punctuationlist="':,-.!()?;"
    let countconsonants=0
    let countvowels=0
    let countnumbers=0
    let countspaces=0
    let countpunctuation=0
    let countspecials=0
    for(let i = 0; i<text.length; i++){
        if(consonantlist.indexOf(text[i]) !== -1){
            countconsonants+=1
        }
        else if(vowellist.indexOf(text[i]) !== -1){
            countvowels+=1
        }
        else if(numberlist.indexOf(text[i]) !== -1){
            countnumbers+=1
        }
        else if(space.indexOf(text[i]) !== -1){
            countspaces+=1
        }
        else if(punctuationlist.indexOf(text[i]) !== -1){
            countpunctuation+=1
        }
        else{
            countspecials+=1
        }
    }
    // https://stackoverflow.com/questions/1168807/how-can-i-add-a-key-value-pair-to-a-javascript-object for information on adding key-value pairs to objects
    result.consonants=countconsonants
    result.vowels=countvowels
    result.numbers=countnumbers
    result.spaces=countspaces
    result.punctuation=countpunctuation
    result.specialCharacters=countspecials
    return result
}

const questionFour = function questionFour(num1, num2,num3) {
    // Implement question 4 here
    // https://www.thebalance.com/loan-payment-calculations-315564 following this as a formula basis to solve the monthly loan payment
    const loanamount=num1
    const interestrate=(num2/100)/12
    const payperiods=num3*12
    const numerator=(Math.pow(1+interestrate, payperiods)-1)
    const denominator=(interestrate*Math.pow(1+interestrate, payperiods))
    const division=numerator/denominator
    const result=loanamount/division
    return result.toFixed(2)
}

module.exports = {
    firstName: "Michael", 
    lastName: "Reilly", 
    studentId: "10439198",
    questionOne,
    questionTwo,
    questionThree,
    questionFour
};
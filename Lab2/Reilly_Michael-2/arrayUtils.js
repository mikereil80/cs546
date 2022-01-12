// Michael Reilly, 10439198, CS-546A
// I pledge my honor that I have abided by the Stevens Honor System.

const mean = function mean(array){
    if(array === undefined){
        throw `No input is given to mean(array).`;
    }
    if(!Array.isArray(array)){
        throw `Input to mean(array) is not an array.`;
    }
    if(array.length == 0){
        throw `Input to mean(array) is an empty array.`;
    }
    let SumOfArray=0;
    const length=array.length;
    for(let i in array){
        if(typeof array[i] !== 'number'){
            throw `Not every value in the array in mean(array) is a number.`;
        }
        else if(isNaN(array[i])){
            throw `A value in array in mean(array) is NaN.`;
        }
        else{
            SumOfArray+=array[i];
        }
    }
    const average=SumOfArray/length;
    return average;
}

const medianSquared = function medianSquared(array){
    if(array === undefined){
        throw `No input is given to medianSquared(array).`;
    }
    if(!Array.isArray(array)){
        throw `Input to medianSquared(array) is not an array.`;
    }
    if(array.length == 0){
        throw `Input to medianSquared(array) is an empty array.`;
    }
    for(let i in array){
        if(typeof array[i] !== 'number'){
            throw `Not every value in the array in medianSquared(array) is a number.`;
        }
        else if(isNaN(array[i])){
            throw `A value in array in medianSquared(array) is NaN.`;
        }
    }
    const sortedArray = array.sort();
    const middle = Math.ceil(array.length / 2);
    if(array.length%2==0){
        const median = (sortedArray[middle]+sortedArray[middle-1])/2;
        return Math.pow(median, 2);
    }
    else{
        const median = sortedArray[middle-1];
        return Math.pow(median, 2);
    }
}

const maxElement = function maxElement(array){
    if(array === undefined){
        throw `No input is given to maxElement(array).`;
    }
    if(!Array.isArray(array)){
        throw `Input to maxElement(array) is not an array.`;
    }
    if(array.length == 0){
        throw `Input to maxElement(array) is an empty array.`;
    }
    let maxVal=0;
    let maxIndex=0;
    let result=new Object();
    for(let i=0; i<array.length; i++){
        if(typeof array[i] !== 'number'){
            throw `Not every value in the array in maxElement(array) is a number.`;
        }
        else if(isNaN(array[i])){
            throw `A value in array in maxElement(array) is NaN.`;
        }
        if(array[i]>maxVal){
            maxVal=array[i];
            maxIndex=i;
        }
    }
    result[maxVal]=maxIndex;
    return result;
}

const fill = function fill(end, value){
    if(end === undefined){
        throw `No input to end in fill(end, value).`;
    }
    if(typeof end !== 'number'){
        throw `Input end in fill(end, value) is not a number.`;
    }
    if(isNaN(end)){
        throw `Input end is NaN.`;
    }
    if(end<=0){
        throw `Input end is less than or equal to 0.`;
    }
    let array = new Array();
    if(value === undefined){
        for(let j=0; j<end; j++){
            array.push(j);
        }
        return array;
    }
    else{
        for(let i=0; i<end; i++){
            array.push(value);
        }
        return array;
    }
}

const countRepeating = function countRepeating(array){
    if(array === undefined){
        throw `No input is given to countRepeating(array).`;
    }
    if(!Array.isArray(array)){
        throw `Input to countRepeating(array) is not an array.`;
    }
    if(array.length == 0){
        return {};
    }
    for(let i in array){
        if(typeof array[i] !== 'number' && typeof array[i] !== 'string'){
            throw `Not every value in the array in countRepeating(array) is either a number or string.`;
        }
    }
    let result = new Object();
    let sortedArray = array.sort();
    let curr_val = null;
    let count = 1;
    for(let j=0; j<sortedArray.length-1; j++){
        curr_val=sortedArray[j];
        if(sortedArray[j]==sortedArray[j+1]){
            count++;
        }
        else{
            if(count>1){
                result[curr_val]=count;
            }
            count=1;
        }
    }
    return result;
}

const isEqual = function isEqual(arrayOne, arrayTwo){
    if(arrayOne === undefined){
        throw `No input is given to arrayOne in isEqual(arrayOne, arrayTwo).`;
    }
    if(!Array.isArray(arrayOne)){
        throw `Input arrayOne to isEqual(arrayOne, arrayTwo) is not an array.`;
    }
    if(arrayTwo === undefined){
        throw `No input is given to arrayTwo in isEqual(arrayOne, arrayTwo).`;
    }
    if(!Array.isArray(arrayTwo)){
        throw `Input arrayTwo to isEqual(arrayOne, arrayTwo) is not an array.`;
    }
    if(arrayOne.length != arrayTwo.length){
        return false;
    }
    else{
        let sortedArrayOne = arrayOne.sort();
        let sortedArrayTwo = arrayTwo.sort();
        for(let i=0; i<arrayOne.length; i++){
            if(Array.isArray(sortedArrayOne[i])){
                if(Array.isArray(sortedArrayTwo[i])){
                    if(!isEqual(sortedArrayOne[i], sortedArrayTwo[i])){
                        return false;
                    }
                }
                else{
                    return false;
                }
            }
            else if(sortedArrayOne[i]!=sortedArrayTwo[i]){
                return false;
            }
        }
        return true;
    }
}

module.exports = {
    mean,
    medianSquared,
    maxElement,
    fill,
    countRepeating,
    isEqual
};
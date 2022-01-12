// Michael Reilly, 10439198, CS-546A
// I pledge my honor that I have abided by the Stevens Honor System.

const makeArrays = function makeArrays(objects){
    if(!Array.isArray(objects)){
        throw `Input objects to makeArrays([objects]) is not an array.`
    }
    for(let i in objects){
        // found on https://stackoverflow.com/questions/8511281/check-if-a-value-is-an-object-in-javascript
        if(typeof objects[i] !== 'object' || objects[i] === null){
            throw `Input array objects in makeArrays([objects]) has one or more elements that are not objects.`
        }
        if(objects[i] && Object.keys(objects[i]).length === 0 && objects[i].constructor === Object){
            throw `Input array objects in makeArrays([objects]) contains an empty object.`
        }
    }
    if(objects.length < 2){
        throw `Input objects to makeArrays([objects]) length is less than 2.`
    }
    let result=[];
    let final=[];
    for(let j=0; j<objects.length; j++){
        result.push(Object.entries(objects[j]))
    }
    for(let k=0; k<result.length; k++){
        final=final.concat(result[k]);
    }
    return final;
}

const isDeepEqual = function isDeepEqual(obj1, obj2){
    if(obj1 === undefined){
        throw `No input is given for obj1 in isDeepEqual(obj1, obj2).`
    }
    if(typeof obj1 !== 'object' || obj1 === null){
        throw `Input obj1 in isDeepEqual(obj1, obj2) is not an object.`
    }
    if(obj2 === undefined){
        throw `No input is given for obj2 in isDeepEqual(obj1, obj2).`
    }
    if(typeof obj2 !== 'object' || obj2 === null){
        throw `Input obj2 in isDeepEqual(obj1, obj2) is not an object.`
    }
    let keys1=Object.keys(obj1);
    let keys2=Object.keys(obj2);
    if(keys1.length != keys2.length){
        return false;
    }
    for(let i=0; i<keys1.length; i++){
        if(!keys2.includes(keys1[i])){
            return false;
        }
    }
    let values1=Object.values(obj1);
    let sortedv1=values1.sort();
    let values2=Object.values(obj2);
    let sortedv2=values2.sort();
    for(let j=0; j<values1.length; j++){
        if(typeof sortedv1[j] === 'object' && sortedv1[j] !== null){
            if(typeof sortedv2[j] === 'object' && sortedv2[j] !== null){
                if(!isDeepEqual(sortedv1[j], sortedv2[j])){
                    return false;
                }
            }
            else{
                return false;
            }
        }
        else if(sortedv1[j]!=sortedv2[j]){
            return false;
        }
    }
    return true;
}

const computeObject = function computeObject(object, func){
    if(typeof object !== 'object' || object === null){
        throw `Input object in computeObject(object, func) is not an object.`
    }
    if(object && Object.keys(object).length === 0 && object.constructor === Object){
        throw `Input object in computeObject(object, func) does not have at least one key/value pair.`
    }
    let values = Object.values(object);
    for(let i in values){
        if(typeof values[i] !== 'number'){
            throw `Not all values in input object of computeObject(object, func) are numbers.`
        }
    }
    if(typeof func !== 'function'){
        throw `Input func in computeObject(object, func) is not a function.`
    }
    let keys = Object.keys(object);
    let result=new Object();
    for(let j=0; j<values.length; j++){
        result[keys[j]]=func(values[j]);
    }
    return result;
}

module.exports = {
    makeArrays,
    isDeepEqual,
    computeObject
}
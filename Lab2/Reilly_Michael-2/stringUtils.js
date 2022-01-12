// Michael Reilly, 10439198, CS-546A
// I pledge my honor that I have abided by the Stevens Honor System.

const camelCase = function camelCase(string){
    if(string === undefined){
        throw `No input is given to camelCase(string).`
    }
    if(string.length == 0){
        throw 'Input string in camelCase(string) length is 0.'
    }
    if(typeof string !== 'string'){
        throw 'Input string in camelCase(string) is not of type string.'
    }
    // found on https://stackoverflow.com/questions/10261986/how-to-detect-string-which-contains-only-spaces
    if(string.replace(/\s/g, '').length == 0) {
        throw 'Input string in camelCase(string) is only empty spaces.'
    }
    let str=string.split("");
    for(let i=0; i<str.length-1; i++){
        if(str[i] == " "){
            str[i+1]=str[i+1].toUpperCase();
        }
        else if(i>0 && str[i-1] == " "){
            str[i]=str[i].toUpperCase();
        }
        else{
            str[i]=str[i].toLowerCase();
        }
    }
    const length=str.length;
    if(str[length-2] != " " && length>1){
        str[length-1]=str[length-1].toLowerCase();
    }
    if(length==1){
        str[0]=str[0].toLowerCase();
    }
    let result = str.join('');
    let final=result.replace(/\s/g, '');
    return final;
}

const replaceChar = function replaceChar(string){
    if(string === undefined){
        throw `No input is given to replaceChar(string).`
    }
    if(string.length == 0){
        throw 'Input string in replaceChar(string) length is 0.'
    }
    if(typeof string !== 'string'){
        throw 'Input string in replaceChar(string) is not of type string.'
    }
    // found on https://stackoverflow.com/questions/10261986/how-to-detect-string-which-contains-only-spaces
    if(string.replace(/\s/g, '').length == 0) {
        throw 'Input string in replaceChar(string) is only empty spaces.'
    }
    let str=string.split("");
    const startChar=str[0];
    let countChange=0;
    const changeChar0='*';
    const changeChar1='$'; 
    for(let i=1; i<str.length; i++){
        if(str[i]==startChar.toLowerCase() || str[i]==startChar.toUpperCase() || str[i]==startChar){
            if(countChange==0){
                str[i]=changeChar0;
                countChange++;
            }
            else if(countChange==1){
                str[i]=changeChar1;
                countChange--;
            }
        }
    }
    let result = str.join('');
    return result;
}

const mashUp = function mashUp(string1, string2){
    if(string1 === undefined){
        throw `No input is given to string1 in mashUp(string1, string2).`
    }
    if(string1.length < 2){
        throw 'Input string1 in mashUp(string1, string2) length is less than 2.'
    }
    if(typeof string1 !== 'string'){
        throw 'Input string1 in mashUp(string1, string2) is not of type string.'
    }
    // found on https://stackoverflow.com/questions/10261986/how-to-detect-string-which-contains-only-spaces
    if(string1.replace(/\s/g, '').length == 0) {
        throw 'Input string1 in mashUp(string1, string2) is only empty spaces.'
    }
    if(string2 === undefined){
        throw `No input is given to string2 in mashUp(string1, string2).`
    }
    if(string2.length < 2){
        throw 'Input string2 in mashUp(string1, string2) length is less than 2.'
    }
    if(typeof string2 !== 'string'){
        throw 'Input string2 in mashUp(string1, string2) is not of type string.'
    }
    // found on https://stackoverflow.com/questions/10261986/how-to-detect-string-which-contains-only-spaces
    if(string2.replace(/\s/g, '').length == 0) {
        throw 'Input string2 in mashUp(string1, string2) is only empty spaces.'
    }
    let str1=string1.split("");
    const startChar1=str1[0];
    const secondChar1=str1[1];
    let str2=string2.split("");
    const startChar2=str2[0];
    const secondChar2=str2[1];
    str1.push(" ");
    str1[0]=startChar2;
    str2[0]=startChar1;
    str1[1]=secondChar2;
    str2[1]=secondChar1;
    let result=str1.concat(str2);
    let final=result.join('');
    return final
}

module.exports = {
    camelCase,
    replaceChar,
    mashUp
}
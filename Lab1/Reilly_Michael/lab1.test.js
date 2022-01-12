const lab1 = require("./lab1");

/* questionOne */

console.log(lab1.questionOne([1, 2, 3])); 
// should return and output {'1': false, '2': true, '3': true}

console.log(lab1.questionOne([5, 3, 10])); 
//returns and outputs: {'5':true, '3': true, '10': false} 

console.log(lab1.questionOne([2])); 
// returns and outputs: {'2': true} 

console.log(lab1.questionOne([5, 10, 9])); 
//returns and outputs: {'5': true, '10': false, '9': false}

console.log(lab1.questionOne([2, 7, 9, 1013])); 
// returns and outputs: {'2': true, '7': true, '9': false, '1013': true}

console.log(lab1.questionOne([])); 
// returns and outputs: {}

console.log(lab1.questionOne()); 
// returns and outputs: {}

// ******** My test cases for questionOne start here **********
console.log(lab1.questionOne([9, 18, 99]))
// returns and outputs: {'9': false, '18': false, '99': false}

console.log(lab1.questionOne([10, 1]))
// returns and outputs: {'10': false, '1': false}

console.log(lab1.questionOne([48, 46]))
// returns and outputs: {'48': false, '46': false}

console.log(lab1.questionOne([10000]))
// returns and outputs: {'10000': false}

console.log(lab1.questionOne([121, 227]))
// returns and outputs: {'121': false, '227': true}

/* questionTwo */

console.log(lab1.questionTwo([1,2,3])); 
// should return and output 733.36 

console.log(lab1.questionTwo([5, 3, 10])); 
//returns and outputs: 207855.73

console.log(lab1.questionTwo([5, 10, 9])); 
// returns and outputs: 609071.18

console.log(lab1.questionTwo([2, 7, 9])); 
//  returns and outputs: 207855.73

console.log(lab1.questionTwo([])); 
//returns and outputs: 0

// ******** My test caes for questionTwo start here *********
console.log(lab1.questionTwo([8, 6]))
// returns and outputs: 100000.00 

console.log(lab1.questionTwo([48]))
// returns and outputs: 254803968.00

console.log(lab1.questionTwo([46]))
// returns and outputs: 205962976.00

console.log(lab1.questionTwo([2, 4]))
// returns and outputs: 1788.85

console.log(lab1.questionTwo([1, 0]))
// returns and outputs: 1.00

/* questionThree */

console.log(lab1.questionThree("The quick brown fox jumps over the lazy dog.")); 
// should return and output {consonants: 24, vowels: 11, numbers: 0, spaces: 8, punctuation: 1, specialCharacters: 0}

console.log(lab1.questionThree("How now brown cow!!!"));
// returns and outputs: {consonants: 10, vowels: 4, numbers: 0, spaces: 3, punctuation: 3, specialCharacters: 0}

console.log(lab1.questionThree("One day, the kids from the neighborhood carried my mother's groceries all the way home. You know why? It was out of respect."));
//  returns and outputs: {consonants: 61, vowels: 36, numbers: 0, spaces: 22, punctuation: 5, specialCharacters: 0}

console.log(lab1.questionThree("CS 546 is going to be fun & I'm looking forward to working with you all this semester!!" )); 
// returns and outputs: {consonants: 40, vowels: 23, numbers: 3, spaces: 17, punctuation: 3, specialCharacters: 1}

console.log(lab1.questionThree("")); 
// returns and outputs: {consonants: 0, vowels: 0, numbers:0, spaces: 0, punctuation: 0, specialCharacters: 0}

// ******** my test cases for questionThree start here ********
console.log(lab1.questionThree("Hello World!"))
// returns and outputs: {consonants: 7, vowels: 3, numbers:0, spaces: 1, punctuation: 1, specialCharacters: 0}

console.log(lab1.questionThree("qwertyuioplkjhgfdsazxcvbnm"))
// returns and outputs: {consonants: 21, vowels: 5, numbers:0, spaces: 0, punctuation: 0, specialCharacters: 0}

console.log(lab1.questionThree("1234567890+-*/"))
// returns and outputs: {consonants: 0, vowels: 0, numbers:10, spaces: 0, punctuation: 1, specialCharacters: 3}

console.log(lab1.questionThree("Hi...     Bye!!!"))
// returns and outputs: {consonants: 3, vowels: 2, numbers:0, spaces: 5, punctuation: 6, specialCharacters: 0}

console.log(lab1.questionThree("You've got too much of a soggy bottom. Auf Wiedershen!"))
// returns and outputs: {consonants: 24, vowels: 18, numbers:0, spaces: 9, punctuation: 3, specialCharacters: 0}

/* questionFour */

console.log(lab1.questionFour(25000, 3.11, 5)); 
// Loan Amount: 25,000 , interest rate: 3.11% (0.0311), term: 5 years (5*12 = 60 monthly payments)
//returns and outputs: 450.44

console.log(lab1.questionFour(30000, 5, 6)); 
//returns and outputs: 483.15

console.log(lab1.questionFour(19500, 7, 3)); 
//returns and outputs: 602.10

console.log(lab1.questionFour(55000, 2, 6)); 
//returns and outputs: 811.27

console.log(lab1.questionFour(33000, 4.5, 2)); 
//returns and outputs: 1440.38

// *********** my test cases for questionFour start here *********

console.log(lab1.questionFour(60000, 5, 4))
// return and outputs: 1381.76

console.log(lab1.questionFour(150000, 6, 10))
// return and outputs: 1665.31

console.log(lab1.questionFour(100000, 5, 15))
// return and outputs: 790.79

console.log(lab1.questionFour(1000, 10, 1))
// return and outputs: 87.92

console.log(lab1.questionFour(14000, 15, 4))
// return and outputs: 389.63
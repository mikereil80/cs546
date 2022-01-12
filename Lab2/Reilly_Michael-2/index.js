const arrayUtils = require('./arrayUtils');
const stringUtils = require('./stringUtils');
const objUtils = require('./objUtils');

// Michael Reilly
// I pledge my honor that I have abided by the Stevens Honor System.

 // My mean(array) Test Cases
 try{
     // Should Pass
     const meanPass = arrayUtils.mean([11, 22, 33]);
     console.log('mean passed successfully');
 } catch(e){
     console.error('mean failed test case');
 }
 try{
     // Should Fail
     const meanFail = arrayUtils.mean(["Twelve"]);
     console.error('mean did not error');
 } catch(e){
     console.log('mean failed successfully');
 }

 // My medianSquared(array) test cases
 try{
     // Should Pass
     const medianSquaredPass = arrayUtils.medianSquared([48, 46, 1, 9, 18]);
     console.log('medianSquared passed successfully');
 } catch(e){
     console.error('medianSquared failed test case');
 }
 try{
     // Should Fail
     const medianSquaredFail = arrayUtils.medianSquared([18, "hi"]);
     console.error('medianSquared did not error');
 } catch(e){
     console.log('medianSquared failed successfully');
 }

 // My maxElement(array) test cases
 try{
     // Should Pass
     const maxElementPass = arrayUtils.maxElement([46, 48, 18, 3]);
     console.log('maxElement passed successfully');
 } catch(e){
     console.error('maxElement failed test case');
 }
 try{
     // Should Fail
     const maxElementFail = arrayUtils.maxElement(['hello', 'world']);
     console.error('maxElement did not error');
 } catch(e){
     console.log('maxElement failed successfully');
 }

 // My fill(end, value) test cases
 try{
     // Should Pass
     const fillPass = arrayUtils.fill(10);
     console.log('fill passed successfully');
 } catch(e){
     console.error('fill failed test case');
 }
 try{
     // Should Fail
     const fillFail = arrayUtils.fill(-5);
     console.error('fill did not error');
 } catch(e){
     console.log('fill failed successfully');
 }

 // My countRepeating(array) test cases
 try{
     // Should Pass
     const countRepeatingPass = arrayUtils.countRepeating([1, 1, "1", 48, 46, "1", "46"]);
     console.log('countRepeating passed successfully');
 } catch(e){
     console.error('countRepeating failed test case');
 }
 try{
     // Should Fail
     const countRepeatingFail = arrayUtils.countRepeating({"counting": 1, "message": 5});
     console.error('countRepeating did not error')
 } catch(e){
     console.log('countRepeating failed successfully')
 }

 // My isEqual(arrayOne, arrayTwo) test cases
 try{
     // Should Pass
     const isEqualPass = arrayUtils.isEqual([1, 1, 2], [2, 2, 1])
     console.log('isEqual passed successfully')
 } catch(e){
     console.error('isEqual failed test case')
 }
 try{
     // Should Fail
     const isEqualFail = arrayUtils.isEqual({'forty': 8}, {'seven': 2})
     console.error('isEqual did not error')
 } catch(e){
     console.log('isEqual failed successfully')
 }

 // My camelCase(string) test cases
 try{
     // Should Pass
     const camelCasePass = stringUtils.camelCase('this works')
     console.log('camelCase passed successfully')
 } catch(e){
     console.error('camelCase failed test case')
 }
 try{
     // Should Fail
     const camelCaseFail = stringUtils.camelCase([1111])
     console.error('camelCase did not error')
 } catch(e){
     console.log('camelCase failed successfully')
 }

 // My replaceChar(string) test cases
 try{
     // Should Pass
     const replaceCharPass = stringUtils.replaceChar("Onomatopoeia");
     console.log('replaceChar passed successfully')
 } catch(e){
     console.error('replaceChar failed test case')
 }
 try{
     // Should Fail
     const replaceCharFail = stringUtils.replaceChar(["hello world"]);
     console.error('replaceChar did not error')
 } catch(e){
     console.log('replaceChar failed successfully')
 }

 // My mashUp(string1, string2) test cases
 try{
     // Should Pass
     const mashUpPass = stringUtils.mashUp("Michael", "Reilly");
     console.log('mashUp passed successfully')
 } catch(e){
     console.error('mashUp failed test case')
 }
 try{
     // Should Fail
     const mashUpFail = stringUtils.mashUp("Hi", 48);
     console.error('mashUp did not error')
 } catch(e){
     console.log('mashUp failed successfully')
 }

 // My makeArrays(objects) test cases
 try{
     // Should Pass
     const makeArraysPass = objUtils.makeArrays([{a: 1, b: 2}, {c: 3, d: 4}])
     console.log('makeArrays passed successfully')
 } catch(e){
     console.error('makeArrays failed test case')
 }
 try{
     // Should Fai;
     const makeArraysFail = objUtils.makeArrays(["hello", "world"])
     console.error('makeArrays did not error')
 } catch(e){
     console.log('makeArrays failed successfully')
 }

 // My isDeepEqual(obj1, obj2) test cases
 try{
     // Should Pass
     const isDeepEqualPass = objUtils.isDeepEqual({z:26, y:25}, {a:1, b:2})
     console.log('isDeepEqual passed successfully')
 } catch(e){
     console.error('isDeepEqual failed test case')
 }
 try{
     // Should Fail
     const isDeepEqualFail = objUtils.isDeepEqual(123, 456)
     console.error('isDeepEqual did not error')
 } catch(e){
     console.log('isDeepEqual failed successfully')
 }

 // My computeObject(object, func) test cases
 try{
     // Should Pass
     const computeObjectPass = objUtils.computeObject({z: 26, y: 25}, n=>n+1-3)
     console.log('computeObject passed successfully')
 } catch(e){
     console.error('computeObject failed test case')
 }
 try{
     // Should Fail
     const computeObjectFail = objUtils.computeObject(123, n=>n**4)
     console.error('computeObject did not error')
 } catch(e){
     console.log('computeObject failed successfully')
 }
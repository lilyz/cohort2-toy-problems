/**
 * Write a function `commonCharacters(str1, str2)` which takes two strings as arguments and returns a
 * string containing the characters found in both strings (without duplication), in the
 * order that they appeared in `str1`. Remember to skip spaces and characters you
 * have already encountered!
 *
 * Example: commonCharacters('acexivou', 'aegihobu')
 * Returns: 'aeiou'
 *
 * Extra credit: Extend your function to handle more than two input strings.
 */

//Works for any number of input strings:
var commonCharacters = function(string1, string2) {
  var str1 = string1.split('');
  var str2 = string2.split('');
  var arr  = [];
  		//first case -two strings
  str1.forEach(function(element){
    str2.forEach(function(element2){
      if (element===element2) {
        arr.push(element)
      }
    })
  })
  return  arr.join('');

  	//sec case more than two strings


 // var args = Array.prototype.slice.call(arguments);
 //   	 // args.sort();

 // if (arguments.length>2) {
 //      args.forEach(function(str){
 //        str.split('').forEach(function(element){
 //          arr.join('').forEach(function(element2){
 //              if (element===element2) {
 //                 arr2.push(element)
 //               }
 //          })
 //        })
 //      })
    
  
};

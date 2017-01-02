/**
 * Given a single input string, write a function that outputs an array of strings with every possible
 * combination of letters.
 *
 * At first, don't worry about repeated (duplicate) strings.
 *
 * What time complexity is your solution?
 *
 * Extra credit: De-duplicate your return array without using uniq().
 */

/**
  * example usage:
  * var anagrams = allAnagrams('abc');
  * console.log(anagrams); // [ 'abc', 'acb', 'bac', 'bca', 'cab', 'cba' ]
  */

var allAnagrams = function(string) {
if (string.length < 2) {
   return [string];
 } else {
     var result = [];
     for (var i = 0; i < string.length; i++) {
       var letter = string[i];
       var shorterWord = string.substr(0, i) + string.substr(i + 1, string.length - 1);
       var shortwordArray = allAnagrams(shorterWord);
       for (var j = 0; j < shortwordArray.length; j++) {
         result.push(letter + shortwordArray[j]);
       }
     }
     return result;
 }
};
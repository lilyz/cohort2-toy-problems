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
  var word='';
  var str=string.split('');
  var arr=[],arr2[];
  var len=(str.length*str.length-1)+1;
  for (var i = 0; i <len; i++) {
     for (var i = 0; i < str.length; i++) {
         var r=str[Math.floor(Math.random()*str.length)]
         //word+=r      }
     arr.push(word);
  
  }
  return arr;

}

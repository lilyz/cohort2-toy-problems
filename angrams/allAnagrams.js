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
<<<<<<< HEAD
var allAnagrams = function(string) {

  var arr=string.split("")
  var newarr=[]
  var newstr=""
  for(var i=0;i<=Math.pow(arr.length,arr.length);i++){
     
     newarr.push(arr[Math.floor(Math.random()* arr.length)])
      
  }
  return newarr
 

};
=======

var allAnagrams = function(string) {
	

};
>>>>>>> 1f1731d548cef0fd354cd489d717a0c664b36245

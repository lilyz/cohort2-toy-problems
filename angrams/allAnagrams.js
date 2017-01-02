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
var arr =[];
var x = string.split("").reverse().join("");
for(var s=0;s<2;s++){
for (var k = 0; k < string.length; k++) {
	var str =string[k]; 	
	for (var i = 0; i < string.length; i++) {
		if(str.indexOf(string[i])===-1){
			str+=string[i]
		}
		for (var j = 0; j < string.length; j++) {
			if(str.indexOf(string[j])===-1){
			str+=string[j]
			}
		}
	}
arr.push(str)
}
string = string.split("").reverse().join("");
}
return arr;
};
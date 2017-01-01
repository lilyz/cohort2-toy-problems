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
	string=string.split('');
	var obj={};
	var result=[];
	for (var i = 0; i < string.length; i++) {
		obj[string[i]]=i;
	}
	for (var i in obj) {
		for (var j in obj) {
			for (var k in obj) {
				result.push([i,j,k]);
			}
		}
	}
	return result;
};
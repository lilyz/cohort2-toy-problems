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
	var str = string.split("");
	
	var arr = [];
	for (var i = 0; i < str.length-1; i++) {
		var result = [];
		for (var j = i+1; j < str.length-1; j++) {
			for (var k = j+1; k < str.length-1; k++) {
				
				result.push(str[i],str[j],str[k]);
				result.join("");
				arr.push(result);
			}
		}
	}

	return arr;
};
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

var allAnagrams = function(str) {
	var arr = str.split("");
	var acc= [];
	var idx;
	for (var i = 0; i < str.length; i++) {
		acc.push(str.substr(i++, 2));
		idx = acc.split();
	}
	// arr.sort().reverse().split("").join("");
	return idx;
};


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
	var newArray = [];
	var str = "";
	if(string.length) {
		for (var i = 0; i < string.length; i++) {
			str += string[i];
			newArray.push(str);
		}
		newArray.push(string)
	}
	if(newArray.length) {
		str = "";
		for (var j = 0; j < string.length; j++) {
			str += string[j];
			newArray.push(str);
		}
		newArray.push(string)
	}

	return newArray;
};
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
<<<<<<< HEAD
	var arr = []
	var str = string.split ("")
	var index = Math.floor(Math.random() * str.length -1)

	for(var i = 0; i < str.length; i++){
		str[i] = str[index]
		
	}
	return str.join()

};
=======
	

};
>>>>>>> 1f1731d548cef0fd354cd489d717a0c664b36245

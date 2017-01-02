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

	var result=[];
function allAnagrams(string,subStr) {
	subStr=subStr||[]
    if (typeof (string) === 'string'){
    	string = string.split("");
    }
    if (string.length === 0){
    	result.push(subStr.join(''));
    }
    for (var i = 0; i < string.length; i++) {
        var x = string.splice(i, 1);
        subStr.push(x);
        allAnagrams(string, subStr);
        subStr.pop();
        string.splice(i, 0, x);
    }
    return result;
}
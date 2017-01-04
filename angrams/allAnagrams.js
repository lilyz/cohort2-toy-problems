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
  * console.log(anagrams); // ['abc', 'acb', 'bac', 'bca', 'cab', 'cba' ]
  */

var allAnagrams = function(string) {
var array = string.split("");
return heapsPermute(array);
};

var swap = function (array, pos1, pos2) {
  var temp = array[pos1];
  array[pos1] = array[pos2];
  array[pos2] = temp;
};

var heapsPermute = function (array,result,n) {
	result = result || [];
  n = n || array.length; 
  if (n === 1) {
  	if(result.indexOf(array.join(""))===-1){
  		result.push(array.join(""));
  	}
  } else {
    for (var i = 1; i <= n; i += 1) {
      heapsPermute(array,result, n - 1);
      var j = (n % 2) ? 1 : i;
      swap(array, j - 1, n - 1); 
    }
  }
  return result;
};



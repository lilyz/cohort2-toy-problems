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
	var arr=[];
	var x=string.split("");
	function anagrams (str){

	if(string.length<=1){
		arr.push(string);
	}
	else{
		for (var i = 0; i < string.length; i++) {
			for (var j = 0; j < x.length; j++) {
				arr.push([].concat(string[i],x[j],x[i]));
			}

				
			}
			string=(string.slice(i+1,string.length));
			i--;
		}
		return JSON.stringify(arr);
	}
	return anagrams(string);
=======
	
>>>>>>> 1f1731d548cef0fd354cd489d717a0c664b36245

};
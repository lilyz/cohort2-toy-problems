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
var str=string;

for (var i=0;i<string.length;i++){
	for (var x=0;x<str.length;x++){
		string=string.split("");
		string[i]=str[x];
		string=string.join("")
		
		arr.push(string);
	}

}
return arr;	

};
=======
	

};
>>>>>>> 1f1731d548cef0fd354cd489d717a0c664b36245

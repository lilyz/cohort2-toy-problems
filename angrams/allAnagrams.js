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
	var str=""
	var x=string.split("")
	var ar=[]
	for(var i =0 ; i<x.length*2;i++){
		for ( var j=0;j<=x.length;j++){
		str += string.charAt(Math.floor(Math.random() *string.length));
		ar.push(str)
		if(x[i]===x[j]){
		ar.pop()	
	}
	
	}
	}
	return ar
};
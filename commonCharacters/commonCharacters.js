/**
 * Write a function `commonCharacters(str1, str2)` which takes two strings as arguments and returns a
 * string containing the characters found in both strings (without duplication), in the
 * order that they appeared in `str1`. Remember to skip spaces and characters you
 * have already encountered!
 *
 * Example: commonCharacters('acexivou', 'aegihobu')
 * Returns: 'aeiou'
 *
 * Extra credit: Extend your function to handle more than two input strings.
 */

//Works for any number of input strings:
var commonCharacters = function(string1, string2) {
	var res = [];
	for (var i = 0; i < string1.length; i++) {
	  	if(string2.indexOf(string1[i]) > -1 ){
	  		res.push(string1[i]);
	  	}
	}
	return res.join("");  
};



//try for extra credit 
var commonCharacters = function(string1, string2) {
	
	var arg = Array.from(arguments);
	
	var res = "";
	if(i>=arg.length){
		return res;
	}
	for (var i = 0; i < arg[0].length; i++) {
	  	if(arg[1].indexOf(arg[0][i]) > -1 ){
	  		return res + arg[0][i] + commonCharacters(arg[0],arg[i+1]);	
	  	}
	}
	
};

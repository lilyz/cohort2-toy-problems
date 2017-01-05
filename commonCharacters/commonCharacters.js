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
	var str = "";
	console.log(arguments)

	for (var i = 0; i < string1.length; i++) {
		if(string2.indexOf(string1[i]) > -1) { 
			if(string1[i] === ' '){
				continue ;
			}
			str+=string1[i]}
	}
	return str;
  
};


var commonCharacters2 = function(string1, string2) {
	var str = "";

	for (var i = 0; i < arguments.length; i++) {
		if(arguments[i].indexOf(string1[i]) > -1) { 
			if(string1[i] === ' '){
				continue ;
			}
			str+=string1[i]}
	}
	return str;
  
};



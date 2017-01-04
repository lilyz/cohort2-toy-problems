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
	
	var arr= Array.from(arguments);
	var temp='';
	arr.join("").replace(" ","").split("").map(function(elem){
		if( arr.join("").replace(" ","").match(new RegExp(elem,'g')).length === arr.length && !temp.includes(elem))
		   temp+=elem;
	})
	return temp;
};


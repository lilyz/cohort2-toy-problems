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
	var arr = Array.from(arguments)
	var str = ''
	var str2 = ''
	for (var i = 0; i < arr.length; i++) {
		str+=arr[i].replace(/(.)(?=.*\1)/g, "")
	}
	for (var i = 0; i < str.length; i++) {
		if((str.match(new RegExp(str[i],"g")).length) === arr.length && str2.indexOf(str[i]) <0 && str[i] !== " "){
			str2+= str[i];
		}
	}
return str2 ;
  
};

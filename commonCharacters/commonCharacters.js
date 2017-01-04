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
  

var final=[];
var strings=arguments

for(var i=0; i<strings.length; i++){
	for(var j=1; j<strings.length; j++){
			var test = new RegExp("["+strings[j]+"]", 'g');
			if(final.includes(strings[i].match(test).join("")) === false){
		   final.push(strings[i].match(test).join(""))
		}
	}
}

return final;
}




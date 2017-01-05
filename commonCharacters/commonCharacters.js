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
<<<<<<< HEAD
	var str = ""
	
  for (var i = 0; i < string1.length; i++) {
  	if(string2.includes(string1[i])){
  		if(!/[^a-zA-Z0-9]/.test(string1[i])){
  			if(!str.includes(string1[i]))
  			str += string1[i]
  		}
  	}
  }
  return str;
=======
  
>>>>>>> 00c43a230299a537e8e7577424ea7e35cfe1b7a2
};


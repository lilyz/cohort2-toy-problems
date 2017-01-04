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

//recursion 
var commonCharacters = function(string1, string2) {
	var result="";
	if(string1 === string2){
		return result=string1;
	}
	if(string1 !== string2 && string1.length===1 && string2.length===1){
		return "";
	}
	for(let i in string1){
		for(let j in string1){	
			result+=commonCharacters(string1[i],string2[j]);
		}
	}
	return result;
};

//fixed big-O(n*n)
var commonCharacters1 = function(string1, string2) {
	var result="";
	for(let i in string1){
		for(let j in string2){
			if(result.indexOf(string1[i])<0 && string1[i]===string2[j]){
				result+=string1[i];
			}
		}
	}
	return result;
};
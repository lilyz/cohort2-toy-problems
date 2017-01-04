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
var commonCharacters = function(string1, string2) {;
	var result="";
	for(var i=0;i<string1.length;i++){
		if(string1.includes(string1[i])&&string2.includes(string1[i])){
		if(!result.includes(string1[i])){
			result+=string1[i]
		}
		}
	}
	result = result.replace(/\s/g, '');
	return result
  
};
var commonCharacters2=function(string){
	var str=""
	var com=true
	var array=Array.from(arguments)
	var x=array.length
	for(var j=0;j<string.length;j++){
	for(var i=0;i<x;i++){
		com=(array[j].includes(string[i])&&com)
		console.log(array[j],string[i])		
	}
	if((!str.includes(string[i]))&&com){
		str+=string[i]
		}
}
		str = str.replace(/\s/g, '');
			return str
	}




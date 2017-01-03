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



var commonCharacters = function(str1, str2) {
	var arr=[];
	for (var i=0 ; i<str1.length ; i++){
		if (str2.indexOf(str1[i])>-1 && arr.indexOf(str1[i])===-1){
			arr.push(str1[i])
		}
	}
	return arr.join("");
}



var commonCharacters = function() {
	var array,firstArg=arguments[0]; 
	for (var i=0; i<arguments.length ; i++){
		if (arguments[i].length > firstArg.length ){
			firstArg=arguments[i];			
		}
		for (var i=0; i<firstArg.length; i++){
			if (arguments[i].indexOf(firstArg[i])>-1 && array.indexOf(firstArg[i]) === -1){
				array.push(firstArg[i])
			}
		}
	}
	return array.join(""); 
}
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
var commonCharacters = function() {
	var arrOfArgs = Array.prototype.slice.call(arguments);
	var lengthOfArgs = arguments.length;
	var validator = function(n,result){
		n = n || 0;
		result = result || "";
		if(lengthOfArgs-1 === n){
			return result;
		}
		var tempArrOfArgs = arrOfArgs.slice();
		tempArrOfArgs.splice(n,1);
		var validateStr = arrOfArgs[n];
		for (var i = 0; i < validateStr.length; i++) {
			var flage = true;
			for (var j = 0; j < tempArrOfArgs.length; j++) {
				if(tempArrOfArgs[j].indexOf(validateStr[i]) === -1){
					flage = false;
					break;

				}else{
					continue;
				}
			}
			if(flage){
				if(result.indexOf(validateStr[i])===-1){
					result+=validateStr[i];
				}
			}
		}
		return validator(n+1,result);
	}
	return validator();
};


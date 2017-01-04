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
	var common=[];
	for(var i=0;i<string1.length;i++){
		if(string1[i]=== " " || string2[i]===" "){
			i++;
		}
		if(string2.indexOf(string1[i])>-1 && common.indexOf(string1[i])===-1){
			common.push(string1[i])
		}
	}
  	return common.join("");
};

var commonCharacters2 =function(){
	var common=[];
	var first=arguments[0];
	for(var c=1;c<arguments.length;c++){
		if(arguments[c].length<first.length){
			first=arguments[c];
		}
	}
	for(var i=0;i<arguments.length;i++){
		for(var j=0;j<first.length;j++){
			if(arguments[i].indexOf(first[j])>-1 && common.indexOf(first[j])===-1){
				common.push(first[j])
			}
		}
	}
	return common.join("");
}	
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
 var str =[];
 var str2 ="";
 var bool=true;
for (var i = 0; i < arguments.length; i++){
	  str[i] = arguments[i];
} 
str.sort(function(a,b){return a.length-b.length;})
for (var k = 0; k < str[0].length; k++) {
  bool=true; 
	  for (var i = 0; i < str.length; i++) {
	  	if(str[i].indexOf(str[0][k])===-1){
	  	   bool=false;
	  	}
	  }
		if(bool===true){
			str2+=str[0][k]
		}
}
   return str2.split("").sort().join("").replace(/([.*+?^$|(){}\[\]])/g,"")
};


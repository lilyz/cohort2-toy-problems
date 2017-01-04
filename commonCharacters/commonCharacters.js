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
	var arr=string1.split("");
	return arr.reduce(function(acc,val){
		if(val!==" "){
		if(string2.indexOf(val)!==-1){
			acc+=val;
		}
	}
	return acc;
	},"")
  
};
//extra......................................
var commonCharactersExtra = function(string1, string2) {
	var arg=Array.from(arguments);
	var arr=arg[0].split("");
	var f=true;
	return arr.reduce(function(acc,val){
		   f=true;
		if(val!==" "){
			for(var i=1;i<arg.length;i++){
		       if(arg[i].indexOf(val)===-1){
			      f=false;
		         }
	          }
	      if(f){acc+=val;}
          }
	return acc;
	},"")
  
};
//_______________________________________


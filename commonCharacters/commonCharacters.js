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
  var arr=[];
  for (i=0;i<string1.length;i++){
  	if (string2.indexOf(string1[i])!==-1){
  		arr.push(string1[i])
  	}
  }
  arr=arr.join("")
  return arr;
};

var commonCharacters1 = function(string1, string2) {
  var str="";
  var ar=[];
  var args=Array.from(arguments);
for(i=0;i<args.length;i++){
	args[i]=unique(args[i])
}
  for (i=0;i<args.length;i++){
  	str+=args[i];
  }
  for (x=0;x<str.length;x++){
  	if(str.split(str[x]).length-1>=args.length){
  		if(ar.indexOf(str[x])===-1)
  		ar.push(str[x]);
  	}
  }
  return ar.join("");
};
function unique(str) {
  var result = '';
  for(var i = 0; i < str.length; i++) {
    if(result.indexOf(str[i]) < 0) {
      result += str[i];
    }
  }
  return result;
}
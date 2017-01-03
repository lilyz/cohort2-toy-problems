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
	for (var a = 0; a < arguments.length; a++) {
		str1= arguments[a];
		if (arguments[a+1]!==undefined){
			str2=arguments[a+1];
		}else{
			str2=str1;
		}
		a++;
	var arr1=uniqe(str1.split(""));
	var arr2=uniqe(str2.split(""));
	var arr3=[];
  	for (var i = 0; i < arr1.length; i++) {
  		for (var x=0; x<arr2.length;x++){
  			if (arr1[i]===arr2[x] && !arr3.includes(arr1[i])) {
  				arr3.push(arr1[i]);
  			}
  		}
  	}
  }
  	return arr3.join("");
};

function uniqe(arr){
	var n = []; 
	for(var i = 0; i < arr.length; i++) 
	{
		if (n.indexOf(arr[i]) == -1) n.push(arr[i]);
	}
	return n;
}



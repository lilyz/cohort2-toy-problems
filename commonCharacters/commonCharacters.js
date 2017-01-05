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
var arr=string1.split('');
var arr2=string2.split('');
var array =[];
var length = Math.max(arr.length,arr2.length)
var lengthm = Math.min(arr.length,arr2.length)
for (var i = 0; i < length; i++) {
	for (var j = 0; j < lengthm; j++) {
		if (arr[j]=== arr2[i] && array.indexOf(arr[j])=== -1){
			array.push(arr[j])
		}
	}
}
return array.join('');
};
// in case multiple parameter as string 
//I used arguments as parameter and compare first parameter with second one 
// then comare the result with new parameter and etc..
// function common (arguments){
// 	for (var i = 0; i < arguments.length; i++) {
// 		var arr=arguments[i].split('');
// 		var arr2=arguments[i+1].split('');
// 		var array =[];
// var length = Math.max(arr.length,arr2.length)
// var lengthm = Math.min(arr.length,arr2.length)
// for (var i = 0; i < length; i++) {
// 	for (var j = 0; j < lengthm; j++) {
// 		if (arr[j]=== arr2[i] && array.indexOf(arr[j])=== -1){
// 			array.push(arr[j])
// 		}
// 	}
// }

// 	}
// return array; 
// }
function common (x,y){
var args = Array.from(arguments);
var array=[];
var newArray=[];
var count =0;
for (var i = 0; i < arguments.length; i++) {
	array +=arguments[i].split(',');
	console.log(array);
}
for (var i = 0; i < array.length; i++) {
	for (var j = 0; j < array.length; j++) {
	  	array[j] === array [i];
	  	//console.log(array[i])
	  	count ++;
	  }
	  if (count > ) {
	  	newArray.push(array[i]);
	  }  
}
return newArray.join('');
}
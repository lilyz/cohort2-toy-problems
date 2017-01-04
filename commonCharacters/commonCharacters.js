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
	var result=''
  var args = Array.from(arguments)
  // we save the arguments in array
  var fristString = args.splice(0,1)
  // saved the frist string in array and i'll compere it with all the string 
  for (var i = 0; i < fristString[0].length; i++) {
  	// for loop for length of frist string
  	var char = fristString[0][i]
  	// here every time i got chenged the char will change and i save him to check if he in the next string
  	for (var j = 0; j < args.length; j++) {
  		// for looping to the rest of the string
  	var str = args[j].split("")
  	// every string inside the arguments i save him im array to use indexof to check if there is any matchs
  		// console.log(args[j])
  		if(str.indexOf(char)>= 0){ 
  			// checking for the matchs char and we add it to the final result
  			result += char
  		}
  	}
  }

  return result
  // return the final result
};
// function  lolo(n) {
// var result=''
//   var args = Array.from(arguments)
//   var fristString = args.splice(0,1)
//   for (var i = 0; i < fristString[0].length; i++) {
//   	var char = fristString[0][i]
//   	for (var j = 0; j < args.length; j++) {
//   	var str = args[j].split("")
//   		console.log(args[j])
//   		if(str.indexOf(char)>= 0){ 
//   			result += char
//   		}
//   	}
//   }
//   return result
// }



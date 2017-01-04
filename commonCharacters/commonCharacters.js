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
// var commonCharacters = function(string1, string2) {
// 	var arr=(string1+string2).split("")
// 	var array=[]
// 	arr=arr.sort(function(a,b){return b-a})
// 	for(var i=0;i<arr.length;i++){
// 		if(array.includes(arr[i])) {
// 			array.push(arr[i])    
// 		}

// 	}
// 	return array.join("")
// }
function commonCharacters(str,str1){
	str=str.split("")
	str1=str1.split("")
	var arr=[]
	for(var i=0;i<str.length;i++){
		for(var j=0;j<str.length;j++){
			if(str[i]===str1[j]){
				arr.push(str[i])
			}
		}
	}
	return arr.join("")
}

function commonCharacters(arguments){
	var str=arguments[0]
	arguments=arguments.replace(/\s/g, '');
	var arr=[]
	for (var i=0;i<str.length;i++){
		for (var j=0;j<arguments.length;j++){
			if(arguments[j]===str[i]){
				arr.puh(str[i])
			}
		}
	}
		return arr.join("")

	}
// 	return str.join("")
// 	// var arr=[];

// 	// //	if(arr.indexOf(arguments[i])){
//  //      arr
// 	// return arr.join("")
// }


// function commonCharacters(arguments){
// 	arguments=arguments.replace(/\s/g, '').split("")
// 	var arr=0
// 	for(var i=0;i<arguments.length;i++){
// 		if(arguments[i]===arr[i]){
// 			return arr
// 		}else{
// 			return arr.push(arguments[i])
// 		}
// 	}
// }
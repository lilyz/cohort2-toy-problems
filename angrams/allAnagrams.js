/**
 * Given a single input string, write a function that outputs an array of strings with every possible
 * combination of letters.
 *
 * At first, don't worry about repeated (duplicate) strings.
 *
 * What time complexity is your solution?
 *
 * Extra credit: De-duplicate your return array without using uniq().
 */

/**
  * example usage:
  * var anagrams = allAnagrams('abc');
  * console.log(anagrams); // [ 'abc', 'acb', 'bac', 'bca', 'cab', 'cba' ]
  */

// var allAnagrams = function(string) {
// 	var arrCombinations, stringSliced, stringElement;
// 	arrCombinations = []; stringSliced = shuffle(string);
// 	if (arrCombinations.length === 0){
// 		arrCombinations.push(string);
// 	};
// 	for (var i = 0; i < string.length; i++){
// 		if (stringSliced.length === 0){
// 			arrCombinations.push(stringElement + allAnagrams(string));
// 		} else if(stringSliced.length === 1){
// 				arrCombinations.forEach (function (strElement,i){
// 					if (stringSliced[0] === strElement[strElement.length - 1]){
// 						stringSliced = shuffle(string);
// 						return allAnagrams(string);
// 					}
// 				})
// 		} else {
// 			stringElement += stringSliced[0];
// 			stringSliced = stringSliced.slice(1);
// 		}
// 	return arrCombinations;
// 	}
// };
var f = [];
function factorial (n) {
  if (n == 0 || n == 1)
    return 1;
  if (f[n] > 0)
    return f[n];
  return f[n] = factorial(n-1) * n;
};

function shuffle(str) {
      return str.split("").sort(function () {return Math.random()-0.5}).join("");
};

function unique(array){
    return array.filter(function(element, index, arr) {
        return index === arr.indexOf(element);
    });
}
var allAnagrams = function(string) {
	var arrCombinations, stringNew;
	arrCombinations = [];
	for (var j = 0; j < factorial(string.length); j++){
		if (arrCombinations.length === 0){
			arrCombinations.push(string);
		}
		else {
			stringNew = shuffle(string);
			for (var i = 0; i < arrCombinations.length; i++){
				if (stringNew !== arrCombinations[i]){
					arrCombinations.push(stringNew);
				}
			}
		}
	}
	return unique(arrCombinations);
};






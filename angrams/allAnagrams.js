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
// function shuffle(arr) {
//   var currI = arr.length, Value, randI;

//   while (0 !== currI) {

//     randI = Math.floor(Math.random() * currI);
//     currI -= 1;

//     Value = arr[currI];
//     arr[currI] = arr[randI];
//     arr[randI] = Value;
//   }

//   return arr;
// }


var lastArr = []
var allAnagrams = function(string) {
<<<<<<< HEAD
	if(lastArr.length === 0){
		lastArr.push(string)
	}
	var arr = string.split("")
	var x = shuffle(arr)
	for (var i = 0; i < string.length; i++) {
		if(lastArr.indexOf(x)>=0){
			x=shuffle(arr)
		}else{
			allAnagrams(string)
		}
	}
	return lastArr
=======
  var arr=string.split('');
  var array=[];
  var bigArray=[];
  var l =arr.length;
  for (var i = 0; ; i++) {
    for (var j = 0; j < arr.length; j++) {
      var x = Math.floor(Math.random() * arr.length)
      array.push(arr[x]);
    }
    var x=array.join("");
    if (bigArray.indexOf(x) === -1 ) {
      bigArray.push(x)
      array=[];
    }
    if(bigArray.length === Math.pow(l,l)){
      return bigArray;
    }
    array=[];
}
>>>>>>> cba0403161af1b52cd68471d7804b98f26a4bf23


};

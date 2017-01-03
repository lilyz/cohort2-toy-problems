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
function fact(num){
	var temp=1;
	while(num>=1){
		temp = temp * num;
		num--;
	}
	return temp;
}

var allAnagrams = function(string) {
<<<<<<< HEAD
	var temp=string.split("");
	var tempArr=[];
	while( fact(string.length) > tempArr.length   ){
		var x = _.shuffle(temp).join("");
		if( !_.contains(tempArr, x))
			tempArr.push(x);
	}
	return tempArr;
};
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


};
>>>>>>> 6568bbd23274e6102779dd33ae75e4ed66b62768

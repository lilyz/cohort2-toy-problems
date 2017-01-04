/**
 * Given a single input string, write a function that outputs an array of strings with every possible combination of letters.
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

var allAnagrams = function(string) {
<<<<<<< HEAD
	var newArray = [], afteradd,withadd; 
	var anagrams = function(str1,str2){
		if (str1.length === string.length){
			newArray.push(str1)
		}
		for (var i = 0; i < str2.length; i++) {
			withadd= str1+str2[i]; 
			afteradd=str2.slice(0,i)+ str2.slice(i+1);
			anagrams(withadd, afteradd) 
		}
	};
	anagrams ("", string)
	return newArray ; 
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

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

var allAnagrams = function(string) {
	var arr=string.split("");
	var arr2=[];
	var str=""; 
	var rval=1;
    for (var i = 2; i <= arr.length; i++){
        rval = rval * i;
    }
	while(arr2.length!==rval){
		for (var i=0 ; i<arr.length;i++){
			var rand = arr[Math.floor(Math.random() * arr.length)];
			str+=rand;
		}
		var strarr=str.split("");
		for (var y = 0; y < strarr.length; y++) {
			for (var x=0; x < strarr.length; x++){
				if (strarr[x]===strarr[y] && y!==x){
					str="";
				}
			}
		}

		if (!arr2.includes(str) && str!==""){
			arr2.push(str);
		}
		str="";
	}
	return arr2;
};
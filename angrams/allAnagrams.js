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


var allAnagrams1 = function(string) {
  var y =[]
  var x= string.length
  for(var i=0 ; i<x ;i++){
  	for(var j=0 ;j<x;j++){
  		for(var z=0; z<x ;z++){
  			y.push(string[i]+string[j]+string[z]).slice(x,-1)
  		}
  	}

  }	
/*for(var p=0; p<y.length;p++){
	if(y[0]==)
}*/
return y 
};

/*var allAnagrams = function(string) {
  var y =[]
  var x= string.length*string.length


};*/
=======
var allAnagrams = function(string) {
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


};


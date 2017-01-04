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
<<<<<<< HEAD
  string = string.split("");
  //temp = temp || string.slice(0);
  var copy= string.slice(0);
  var result=[];
  for(var i=0; i<string.length; i++){
    var temp=copy.splice(i, 1);
    for(var j=0; j<copy.length; j++){
      if(copy.length < 3) {
        result.push((temp + copy.join("")));
        result.push((temp + copy.reverse().join("")));
        break;
      } else {
        var temp2= temp +copy.splice(j,1);
        result.push((temp2 + copy.join("")));
        result.push((temp2 + copy.reverse().join("")));
        copy= string.slice(0);
      }
    } 
  }
  return result;
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

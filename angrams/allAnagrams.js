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

<<<<<<< HEAD
  var newArr = [] ;
  var allAnagrams = function(string,cnt) {
  	if(typeof string == "string")
       string = string.split("");
    if (typeof cnt == "undefined")
        cnt = 0;
    if (cnt >= string.length)
        return newArr;
    for (var i = cnt; i < string.length; i++)
        newArr.push(swap(string, cnt, i));
    return allAnagrams(string, cnt + 1);
  } ﻿

  function swap(str, cnt, i) {
    if (cnt != i) {
        var temp = str[cnt];
        str[cnt] = str[i];
        str[i] = temp;
    }
    return str.join("");
}

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
>>>>>>> cba0403161af1b52cd68471d7804b98f26a4bf23

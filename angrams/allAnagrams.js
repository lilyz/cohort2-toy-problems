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


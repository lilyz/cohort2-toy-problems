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
  var bigarr = [];
  var str= "";
function allAnagrams(r) {

  var i, char;
  for (i = 0; i < r.length; i++) {
    char = r.substr(i, 1)[0];
    r=r.substr(i,r.length)
    str+=char
    if (r.length == 0) {
      bigarr.push(str.slice());
    }
    allAnagrams(r);
    r.substr(i, 0, char);
    str= str.slice(-1)
  }
  return bigarr
};
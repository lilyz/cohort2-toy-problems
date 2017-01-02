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

function allAnagrams(word){
    var result = [];
    for(var i = 0; i < word.length; i++){
      word = word.split("");
      var letter = word[i];
      delete word[i];
      var all = allAnagrams(word.join(""));
      for(var j = 0; j < all.length; j++){
        result.push(letter + all[j]);
      }
    }
    return result;
  }
};
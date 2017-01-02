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
    var ne=string.split("")
    var res=[];
    for(var i=0; i<ne.length; i++){
        for(var j=0; i<ne.length; j++){
            for(var s=0; s<ne.length; s++){
                if ( !ne[i]+ne[j]+ne[s].includes(res)){
                    res.push(ne[i]+ne[j]+ne[s])
                }
                
            }
        }
    }
    return res;
};
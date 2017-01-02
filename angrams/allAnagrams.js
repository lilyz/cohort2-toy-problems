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
    var x;
    var arr1=[];
    var result=[];
    var arr=string.split("");//uniq
    var num=arr.length*(arr.length-1);///var num=arr.length*(arr.length)
    for (var i = 0; i < arr.length; i++) {
        x=Math.round(Math.random() * (arr.length-1));
        if (arr1.indexOf(arr[x])<0){
            arr1.push(arr[x]);
        }
        if (arr1.length === arr.length){
            if (result.indexOf(arr1.join(""))<0){
            result.push(arr1.join(""))
            }
            arr1=[];
        }
        if (result.length===num){
            i=arr.length;
        }
        else { i=0}    
    } 
    return result;
        
   

}




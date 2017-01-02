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
  var result=[];
  var arrofchar=string.split("")

  arr=string.split("")
  var pos=Math.pow(string.length,string.length)
  for (var j =0;j<pos;j++){
    var str=""
      for (var i =0;i<arr.length;i++){
        var rand=Math.floor(Math.random() * ((arr.length) - 0) + 0)
            str+=arr[rand]
      }
      if (!result.includes(str)){
        result.push(str)
      }
      

    
  }
   return check(result,arrofchar)
  

};

 
function countOccurrences(string, character) {
   var  arr=string.split("");
   var ctr =0
      for (var i=0 ;i<arr.length;i++){
        if (arr[i]===character){
          ctr+=1
        }
      }   
        return ctr
  }


function check(arr,arrofchar){
  var result=[];
  for(var i=0;i<arr.length;i++){
    var q=arr[i]
    for(var j=0;j<arrofchar.length;j++){
      var s=arrofchar[j]
      var e=arrofchar[j+arrofchar.length-1]
      var  w=countOccurrences(q,s)
      var r=countOccurrences(q,e)
      if (w>0 && w<2){
        if (r>0 && r<2){
          if (!result.includes(q)){
        result.push(q)
          }
          
        }
        
      }
    }
  }
  return result
}



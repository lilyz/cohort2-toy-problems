/**
 * Write a function `commonCharacters(str1, str2)` which takes two strings as arguments and returns a
 * string containing the characters found in both strings (without duplication), in the
 * order that they appeared in `str1`. Remember to skip spaces and characters you
 * have already encountered!
 *
 * Example: commonCharacters('acexivou', 'aegihobu')
 * Returns: 'aeiou'
 *
 * Extra credit: Extend your function to handle more than two input strings.
 */

//Works for any number of input strings:
var commonCharacters = function(string1, string2) {
  var arg=Array.from(arguments)
  //console.log(arg)
  var arr1=arg[0].split("");
  var arr2=arg[1].split("");
  var result=[];
  for (var i =0 ;i<arr1.length;i++){
    if (arr2.indexOf(arr1[i])>-1 && result.indexOf(arr1[i])<0 && arr1[i]!==" " ){
      result.push(arr1[i])
    }

  }
  return result.join("");

};


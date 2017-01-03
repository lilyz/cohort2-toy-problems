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
  var arr=string1 + string2
  var array=arr.split("")
  var newstr=""
  for(var i=0;i<array.length;i++){
    if((newstr.split(array[i]).length -1 ) ===0){
       newstr+=array[i]
          }
  }
  return newstr
};
/////////////////////////*
var commonCharacters1 = function() {
var args = Array.prototype.slice.call(arguments)
args=args.join("")
  var array=args.split("")
  var newarr=""
   for(var i=0;i<array.length;i++){
    if((newarr.split(array[i]).length -1 )===0){
      newarr+=array[i]
    }
  }
  return newarr
};

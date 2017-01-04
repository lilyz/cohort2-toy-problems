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
    string1 = string1.replace(/[^\w\s]/gi, '').split("");
    string2 = string2.replace(/[^\w\s]/gi, '').split("");

    return string1.map(function(elem){

      if(string2.includes(elem)){
        return elem
      }
    }).join("")
};


var commonCharactersExtra = function(string1, string2) {
    string1 = string1.replace(/[^\w\s]/gi, '').split("");
    //string2 = string2.replace(/[^\w\s]/gi, '').split("");
    var args = Array.from(arguments);
    // b=args.sort((a,b)=>a-b)
    // console.log(b)
    return string1.map(function(elem){
      for (var i = 1; i < args.length; i++) {
      if(args[i].replace(/[^\w\s]/gi, '').split("").includes(elem)){
        return elem
      }
      }
    }).join("")
};


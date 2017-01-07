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
<<<<<<< HEAD
  string1=string1.split("");
  string2=string2.split("");
  var arr=[];
  var str="";
  //var newArr=[];
  for (var i = 0; i < string1.length; i++) {
    for (var j = 0; j < string2.length; j++) {
      if(string1[i]===string2[j]) {
        arr.push(string1[i])
      }
    }
  }
  var str=arr.join("")
  /*arr.reduce(function(res,ele){
    if(res!==ele){
     return ele
    }
  },arr[0])*/
  var res="";
  for(var i=0; i<str.length; i++){
        if(res.indexOf(str[i])===-1){
            res = res + str[i];
        }
    }
  return res.split(" ").join("");
  
};


// Extend the function

var commonCharacters = function(string1) {
  string1=string1.split("");
  string2=arguments.split("");
  var arr=[];
  var str="";
  //var newArr=[];
  for (var i = 0; i < string1.length; i++) {
    for (var j = 0; j < string2.length; j++) {
      if(string1[i]===string2[j]) {
        arr.push(string1[i])
      }
    }
  }
  var str=arr.join("")
  /*arr.reduce(function(res,ele){
    if(res!==ele){
     return ele
    }
  },arr[0])*/
  var res="";
  for(var i=0; i<str.length; i++){
        if(res.indexOf(str[i])===-1){
            res = res + str[i];
        }
    }
  return res.split(" ").join("");
  
};
=======
  
};

>>>>>>> 00c43a230299a537e8e7577424ea7e35cfe1b7a2

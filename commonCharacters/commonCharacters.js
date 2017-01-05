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
  var x=string1.split("")
  var y=string2.split("")
  var z=[]
  each(x,function(ele,i){
    if(y.includes(ele)){
      z.push(ele)
    }
  })
  return z.join('')
  
};


// extra
var commonCharacters = function(arguments) {
  if (arguments.length>2){}
  var z=[]
  each(arguments,function(ele,i){
    if(arguments[i].includes(ele)){
      z.push(ele)
    }
  })
  return z.join('')
  }
};


////// here
var commonCharacters = function(string1, string2) {
  var x=string1.split("")
  var y=string2.split("")
  var z=[]
  each(x,function(ele,i){
    if(y.includes(ele)){
      z.push(ele)
    }
  })
  return _.uniq(z).join("")
  
};
=======
  
};

>>>>>>> 00c43a230299a537e8e7577424ea7e35cfe1b7a2

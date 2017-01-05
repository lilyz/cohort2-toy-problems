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
var args = Array.from(arguments)
  if (args.length===2){
    var arr1 = args[0].split("");
    var arr2 = args[1].split("");
    var str1="";
  for (var i=0 ; i<arr1.length;i++){
    for (var j=0;j<arr2.length;j++){
      if (arr1[i]===arr2[j]){
          str1+=arr1[i]
      }
    }
  }
    return str1
  }

  else if (args.length>2){
    for (var w=0;w<args.length;w++){
    var arrs = args[w].split("");
    var arre = args[w+1].split("");
    var str2="";
      for (var e=0 ; e<arrs.length;e++){
        for (var r=0;r<arre.length;r++){
          if (arrs[e]!==" "){
            if (arrs[e]===arre[r]){
              if(!str2.includes(arre[r]))
                str2+=arrs[e]
           }
          }
        }
      }
      args.shift()
      args.shift()
      var klam=args.join()
      //commonCharacters(str2,klam)
      break
  }
      return  commonCharacters(str2,klam)
    
  }
=======
  
>>>>>>> 00c43a230299a537e8e7577424ea7e35cfe1b7a2
};


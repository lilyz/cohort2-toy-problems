/*
 * write a function that takes a string of text and returns true if
 * the parentheses are balanced and false otherwise.
 *
 * Example:
 *   balancedParens('(');  // false
 *   balancedParens('()'); // true
 *   balancedParens(')(');  // false
 *   balancedParens('(())');  // true
 *
 * Step 2:
 *   make your solution work for all types of brackets
 *
 * Example:
 *  balancedParens('[](){}'); // true
 *  balancedParens('[({})]');   // true
 *  balancedParens('[(]{)}'); // false
 *
 * Step 3:
 * ignore non-bracket characters
 * balancedParens(' var wow  = { yo: thisIsAwesome() }'); // true
 * balancedParens(' var hubble = function() { telescopes.awesome();'); // false
 *
 *	"())"
 */

<<<<<<< HEAD
  var balancedParens = function (input) {
    input=input.split("");
      var arr=[];
      var openParanth=["(","[","{"];
      var closeParanth=[")","]","}"];
      for(var i =0; i<input.length; i++){
        if(openParanth.includes(input[i])){
          arr.push(input[i]);
        } else if(closeParanth.includes(input[i])){
            if(arr.length <1 || openParanth.indexOf(arr.pop()) !== closeParanth.indexOf(input[i])){
              return false;
            }
        }
      }
      if(arr.length > 0)
        return false;
      return true;
  };
=======

//  First function to q1 +q2 only;
 var balancedParens = function (input) {
  var c=input.length/2;
  for (var i = 0; i < c; i++) {
    input=input.replace("()",'');
    input=input.replace("[]",'');
    input=input.replace("{}",'');

  }
  console.log(input)
  return input =='' ;

 };
 //second function for all cases
 function balancedParens(input) {
  var parentheses = "[]{}()",
  array = [];
  var character; 
  var bracePosition;

  for(var i = 0; character = input[i]; i++) {
    bracePosition = parentheses.indexOf(character);

    if(bracePosition === -1) {
      continue;
    }

    if(bracePosition % 2 === 0) {
      array.push(bracePosition + 1); 
    } else {
      if(array.length === 0 || array.pop() !== bracePosition) {
        return false;
      }
    }
  }

  return array.length === 0;
}
>>>>>>> 6568bbd23274e6102779dd33ae75e4ed66b62768
